export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const MAX_DIMENSION = 5000;
export const MIN_DIMENSION = 320;

const SUPPORTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  return `${(bytes / Math.pow(1024, index)).toFixed(
    index === 0 ? 0 : 2
  )} ${units[index]}`;
}

export function reductionPercent(original, compressed) {
  if (!original || !compressed) return 0;

  return Math.max(
    0,
    ((original - compressed) / original) * 100
  );
}

export function validateImageFile(file) {
  if (!file) {
    throw new Error("No image selected.");
  }

  if (!(file instanceof File)) {
    throw new Error("Invalid file.");
  }

  if (file.size <= 0) {
    throw new Error("The selected file is empty.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `Maximum supported file size is ${formatBytes(
        MAX_FILE_SIZE
      )}.`
    );
  }

  if (!SUPPORTED_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported image format. Use JPG, PNG or WebP."
    );
  }
}

export function loadImage(file) {
  return new Promise((resolve, reject) => {
    try {
      validateImageFile(file);
    } catch (error) {
      reject(error);
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);

      if (
        !image.naturalWidth ||
        !image.naturalHeight
      ) {
        reject(
          new Error(
            "Invalid image dimensions."
          )
        );
        return;
      }

      resolve({
        image,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);

      reject(
        new Error(
          "This image is corrupted or unsupported."
        )
      );
    };

    image.src = url;
  });
}

function checkCancelled(signal) {
  if (signal?.aborted) {
    throw new DOMException(
      "Compression cancelled.",
      "AbortError"
    );
  }
}

function safeDimensions(width, height) {
  const largest = Math.max(width, height);

  if (largest <= MAX_DIMENSION) {
    return {
      width,
      height,
    };
  }

  const scale =
    MAX_DIMENSION / largest;

  return {
    width: Math.max(
      MIN_DIMENSION,
      Math.round(width * scale)
    ),
    height: Math.max(
      MIN_DIMENSION,
      Math.round(height * scale)
    ),
  };
}

function createCanvas(width, height) {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 1 ||
    height < 1
  ) {
    throw new Error(
      "Invalid image dimensions."
    );
  }

  if (width * height > 40_000_000) {
    throw new Error(
      "This image is too large to process safely."
    );
  }

  const canvas =
    document.createElement("canvas");

  canvas.width = Math.round(width);
  canvas.height = Math.round(height);

  return canvas;
}

function drawImage(
  image,
  width,
  height,
  outputType
) {
  const canvas = createCanvas(
    width,
    height
  );

  const ctx = canvas.getContext(
    "2d",
    {
      alpha:
        outputType !== "image/jpeg",
    }
  );

  if (!ctx) {
    throw new Error(
      "Your browser cannot process this image."
    );
  }

  if (outputType === "image/jpeg") {
    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    0,
    0,
    width,
    height
  );

  return canvas;
}

function canvasToBlob(
  canvas,
  type,
  quality
) {
  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Could not generate image."
              )
            );

            return;
          }

          resolve(blob);
        },
        type,
        quality
      );
    }
  );
}

/* =========================================
   IMAGE CONVERSION
========================================= */

export async function convertImage(
  file,
  outputType = "image/webp",
  quality = 0.85
) {
  validateImageFile(file);

  const allowedOutputTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    !allowedOutputTypes.includes(
      outputType
    )
  ) {
    throw new Error(
      "Unsupported output format."
    );
  }

  const {
    image,
    width: originalWidth,
    height: originalHeight,
  } = await loadImage(file);

  const dimensions =
    safeDimensions(
      originalWidth,
      originalHeight
    );

  const canvas = drawImage(
    image,
    dimensions.width,
    dimensions.height,
    outputType
  );

  const blob =
    await canvasToBlob(
      canvas,
      outputType,
      quality
    );

  // Release canvas memory.
  canvas.width = 1;
  canvas.height = 1;

  return {
    blob,
    width: dimensions.width,
    height: dimensions.height,
    originalWidth,
    originalHeight,
  };
}

/* =========================================
   TARGET SIZE COMPRESSION
========================================= */

export async function compressToTarget(
  file,
  targetBytes,
  outputType = "image/webp",
  options = {}
) {
  validateImageFile(file);

  const {
    signal,
    onProgress,
  } = options;

  checkCancelled(signal);

  if (
    !Number.isFinite(targetBytes) ||
    targetBytes <= 0
  ) {
    throw new Error(
      "Invalid target size."
    );
  }

  const {
    image,
    width: originalWidth,
    height: originalHeight,
  } = await loadImage(file);

  checkCancelled(signal);

  let dimensions =
    safeDimensions(
      originalWidth,
      originalHeight
    );

  let bestResult = null;

  const totalDimensionAttempts = 10;

  for (
    let dimensionAttempt = 0;
    dimensionAttempt <
    totalDimensionAttempts;
    dimensionAttempt++
  ) {
    checkCancelled(signal);

    const dimensionProgress =
      (dimensionAttempt /
        totalDimensionAttempts) *
      20;

    onProgress?.(
      Math.round(
        dimensionProgress
      )
    );

    const canvas = drawImage(
      image,
      dimensions.width,
      dimensions.height,
      outputType
    );

    let resultBlob = null;

    /*
     * PNG is lossless, therefore
     * quality search isn't useful.
     */
    if (
      outputType === "image/png"
    ) {
      onProgress?.(
        Math.min(
          90,
          Math.round(
            dimensionProgress + 30
          )
        )
      );

      resultBlob =
        await canvasToBlob(
          canvas,
          outputType
        );
    } else {
      let low = 0.05;
      let high = 0.95;

      let closestBlob = null;
      let closestDifference =
        Infinity;

      const qualityAttempts = 10;

      for (
        let qualityAttempt = 0;
        qualityAttempt <
        qualityAttempts;
        qualityAttempt++
      ) {
        checkCancelled(signal);

        const quality =
          (low + high) / 2;

        const blob =
          await canvasToBlob(
            canvas,
            outputType,
            quality
          );

        const difference =
          Math.abs(
            blob.size -
              targetBytes
          );

        if (
          difference <
          closestDifference
        ) {
          closestDifference =
            difference;

          closestBlob = blob;
        }

        if (
          blob.size <=
          targetBytes
        ) {
          low = quality;
        } else {
          high = quality;
        }

        const progress =
          20 +
          (dimensionAttempt /
            totalDimensionAttempts) *
            70 +
          ((qualityAttempt + 1) /
            qualityAttempts) *
            10;

        onProgress?.(
          Math.min(
            95,
            Math.round(
              progress
            )
          )
        );
      }

      resultBlob =
        closestBlob;
    }

    if (!resultBlob) {
      canvas.width = 1;
      canvas.height = 1;

      throw new Error(
        "Unable to generate compressed image."
      );
    }

    const currentResult = {
      blob: resultBlob,

      width:
        dimensions.width,

      height:
        dimensions.height,

      achieved:
        resultBlob.size <=
        targetBytes,

      difference:
        Math.abs(
          resultBlob.size -
            targetBytes
        ),
    };

    if (
      !bestResult ||
      currentResult.difference <
        bestResult.difference
    ) {
      bestResult =
        currentResult;
    }

    canvas.width = 1;
    canvas.height = 1;

    if (
      resultBlob.size <=
      targetBytes
    ) {
      onProgress?.(100);

      return {
        ...currentResult,
        achieved: true,
        originalWidth,
        originalHeight,
      };
    }

    dimensions = {
      width: Math.max(
        MIN_DIMENSION,
        Math.round(
          dimensions.width *
            0.85
        )
      ),

      height: Math.max(
        MIN_DIMENSION,
        Math.round(
          dimensions.height *
            0.85
        )
      ),
    };
  }

  if (!bestResult) {
    throw new Error(
      "Could not compress this image."
    );
  }

  onProgress?.(100);

  return {
    blob: bestResult.blob,

    width:
      bestResult.width,

    height:
      bestResult.height,

    achieved: false,

    originalWidth,
    originalHeight,
  };
}

/* =========================================
   OUTPUT FILE
========================================= */

export function extensionForType(
  type
) {
  switch (type) {
    case "image/jpeg":
      return "jpg";

    case "image/png":
      return "png";

    case "image/webp":
      return "webp";

    default:
      return "jpg";
  }
}

export function createOutputFile(
  blob,
  originalName,
  type,
  suffix = "compressed"
) {
  if (!blob) {
    throw new Error(
      "Output image was not generated."
    );
  }

  const extension =
    extensionForType(type);

  const baseName =
    originalName.replace(
      /\.[^/.]+$/,
      ""
    );

  return new File(
    [blob],
    `${baseName}-${suffix}.${extension}`,
    {
      type,
      lastModified:
        Date.now(),
    }
  );
}