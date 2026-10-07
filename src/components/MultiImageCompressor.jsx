import { useRef, useState } from "react";

import {
  MAX_FILE_SIZE,
  formatBytes,
  reductionPercent,
  compressToTarget,
  createOutputFile,
} from "../utils/imageTools";

function createItem(file) {
  return {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
    file,
    status: "waiting",
    progress: 0,
    result: null,
    error: "",
  };
}

export default function MultiImageCompressor({
  accepted = "image/jpeg,image/png,image/webp",
  targetSize = 100,
  outputType = "image/webp",
  title = "Upload Multiple Images",
}) {
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const [items, setItems] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  const updateItem = (id, updates) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);

    if (!files.length) return;

    setError("");

    const validItems = [];
    const errors = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        errors.push(`${file.name}: Invalid image`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(
          `${file.name}: Maximum ${formatBytes(MAX_FILE_SIZE)}`
        );
        return;
      }

      validItems.push(createItem(file));
    });

    if (errors.length) {
      setError(errors.join(" • "));
    }

    setItems((previous) => [...previous, ...validItems]);
  };

  const handleInput = (event) => {
    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragging(false);

    addFiles(event.dataTransfer.files);
  };

  const removeItem = (id) => {
    if (isCompressing) return;

    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const clearAll = () => {
    if (isCompressing) return;

    setItems([]);
    setError("");
  };

  const compressOne = async (item, controller) => {
    /*
      If the original image is already smaller than the target,
      don't make it unnecessarily larger.
    */
    if (item.file.size <= targetSize * 1024) {
      const previewUrl = URL.createObjectURL(item.file);

      updateItem(item.id, {
        status: "completed",
        progress: 100,
        result: {
          blob: item.file,
          file: item.file,
          url: previewUrl,
          width: null,
          height: null,
        },
        error: "",
      });

      return true;
    }

    updateItem(item.id, {
      status: "compressing",
      progress: 0,
      error: "",
    });

    try {
      const result = await compressToTarget(
        item.file,
        targetSize * 1024,
        outputType,
        {
          signal: controller.signal,

          onProgress: (progress) => {
            updateItem(item.id, {
              progress,
            });
          },
        }
      );

      const outputFile = createOutputFile(
        result.blob,
        item.file.name,
        outputType
      );

      const previewUrl = URL.createObjectURL(result.blob);

      updateItem(item.id, {
        status: "completed",
        progress: 100,

        result: {
          ...result,
          file: outputFile,
          url: previewUrl,
        },

        error: "",
      });

      return true;
    } catch (err) {
      if (err.name === "AbortError") {
        updateItem(item.id, {
          status: "waiting",
          progress: 0,
          error: "",
        });

        return false;
      }

      updateItem(item.id, {
        status: "error",
        progress: 0,
        error: err.message || "Compression failed.",
      });

      return false;
    }
  };

  const compressAll = async () => {
    if (!items.length || isCompressing) return;

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsCompressing(true);
    setError("");

    try {
      for (const item of items) {
        if (controller.signal.aborted) break;

        if (item.status === "completed") continue;

        await compressOne(item, controller);
      }
    } finally {
      abortControllerRef.current = null;
      setIsCompressing(false);
    }
  };

  const cancelCompression = () => {
    abortControllerRef.current?.abort();
    setIsCompressing(false);
  };

  const retryItem = async (item) => {
    if (isCompressing) return;

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsCompressing(true);

    await compressOne(item, controller);

    abortControllerRef.current = null;

    setIsCompressing(false);
  };

  const downloadFile = (item) => {
    if (!item.result?.file) return;

    const url = URL.createObjectURL(item.result.file);

    const link = document.createElement("a");

    link.href = url;
    link.download = item.result.file.name;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const downloadAll = async () => {
    const completed = items.filter(
      (item) => item.result?.file
    );

    for (const item of completed) {
      downloadFile(item);

      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );
    }
  };

  const completedCount = items.filter(
    (item) => item.status === "completed"
  ).length;

  const failedCount = items.filter(
    (item) => item.status === "error"
  ).length;

  const remainingCount = items.filter(
    (item) =>
      item.status === "waiting" ||
      item.status === "compressing"
  ).length;

  return (
    <section className="multi-compressor">
      <div
        className={`multi-upload ${
          dragging ? "dragging" : ""
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-icon">↑</div>

        <h3>{title}</h3>

        <p>
          Drag & drop images here or choose files from your device.
        </p>

        <button
          type="button"
          className="upload-button"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Choose Images
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accepted}
          hidden
          onChange={handleInput}
        />

        <span className="upload-note">
          Maximum 20 MB per image
        </span>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="multi-toolbar">
            <div className="multi-summary">
              <strong>
                {items.length}{" "}
                {items.length === 1 ? "image" : "images"}
              </strong>

              <span>
                {completedCount} completed

                {remainingCount > 0 &&
                  ` • ${remainingCount} remaining`}

                {failedCount > 0 &&
                  ` • ${failedCount} failed`}
              </span>
            </div>

            <div className="multi-actions">
              {!isCompressing ? (
                <button
                  type="button"
                  className="compress-button"
                  onClick={compressAll}
                >
                  Compress All
                </button>
              ) : (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={cancelCompression}
                >
                  Cancel
                </button>
              )}

              {completedCount > 0 && (
                <button
                  type="button"
                  className="download-all-button"
                  onClick={downloadAll}
                  disabled={isCompressing}
                >
                  Download All
                </button>
              )}

              <button
                type="button"
                className="secondary-button"
                onClick={clearAll}
                disabled={isCompressing}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="multi-file-list">
            {items.map((item) => {
              const saved = item.result?.file
                ? reductionPercent(
                    item.file.size,
                    item.result.file.size
                  )
                : 0;

              return (
                <div
                  className="multi-file-card"
                  key={item.id}
                >
                  <div className="multi-file-info">
                    <strong title={item.file.name}>
                      {item.file.name}
                    </strong>

                    <span>
                      Original: {formatBytes(item.file.size)}
                    </span>
                  </div>

                  <div className="multi-file-status">
                    {item.status === "waiting" && (
                      <span className="file-status waiting">
                        Waiting
                      </span>
                    )}

                    {item.status === "compressing" && (
                      <div className="progress-wrapper">
                        <div className="progress-track">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>

                        <span>
                          {item.progress}%
                        </span>
                      </div>
                    )}

                    {item.status === "completed" && (
                      <div className="completed-info">
                        <span className="file-status success">
                          ✓ Completed
                        </span>

                        <span>
                          {formatBytes(
                            item.result.file.size
                          )}

                          {" • "}

                          {saved > 0
                            ? `${saved.toFixed(0)}% saved`
                            : "Already under target"}
                        </span>
                      </div>
                    )}

                    {item.status === "error" && (
                      <div className="completed-info">
                        <span className="file-status error">
                          Failed
                        </span>

                        <span>
                          {item.error}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="multi-file-buttons">
                    {item.status === "completed" && (
                      <button
                        type="button"
                        className="download-button small"
                        onClick={() =>
                          downloadFile(item)
                        }
                        disabled={isCompressing}
                      >
                        Download
                      </button>
                    )}

                    {item.status === "error" && (
                      <button
                        type="button"
                        className="retry-button"
                        onClick={() =>
                          retryItem(item)
                        }
                        disabled={isCompressing}
                      >
                        Retry
                      </button>
                    )}

                    {item.status !== "compressing" && (
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() =>
                          removeItem(item.id)
                        }
                        disabled={isCompressing}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}