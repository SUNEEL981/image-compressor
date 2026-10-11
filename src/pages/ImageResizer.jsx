
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { loadImage, formatBytes } from "../utils/imageTools";

const RELATED_TOOLS = [
  {
    path: "/jpg-compressor",
    label: "JPG",
    title: "JPG Compressor",
    description: "Compress JPG images online.",
  },
  {
    path: "/png-compressor",
    label: "PNG",
    title: "PNG Compressor",
    description: "Reduce PNG image file size.",
  },
  {
    path: "/webp-compressor",
    label: "WEBP",
    title: "WebP Compressor",
    description: "Optimize WebP images.",
  },
  {
    path: "/compress-to-kb",
    label: "KB",
    title: "Compress to Specific KB",
    description: "Choose a target image file size.",
  },
];

const FAQS = [
  {
    q: "Which image formats are supported?",
    a: "You can upload JPG, PNG and WebP images. The resized result is downloaded as a JPEG image.",
  },
  {
    q: "Can I keep the original aspect ratio?",
    a: "Yes. The aspect-ratio lock is enabled by default. Turn it off to set width and height independently.",
  },
  {
    q: "Are dimensions measured in pixels?",
    a: "Yes. Enter your desired width and height in pixels (px).",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "Resizing happens in your browser using the canvas API. Your image is not uploaded to a Pixnora server.",
  },
  {
    q: "How do I download my resized image?",
    a: "After resizing, click Download Resized Image to save the result to your device.",
  },
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    resize: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 8h3V5M8 8l4-4M16 16h-3v3m3-3-4 4" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return <svg {...common}>{paths[name] || paths.image}</svg>;
}

function SectionHeading({ eyebrow, children, description }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
        {children}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function ImageResizer() {
  const inputRef = useRef(null);
  const previewRef = useRef("");
  const resultRef = useRef("");
  const [dragging, setDragging] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionText =
      "Resize JPG, PNG and WebP images online for free. Set custom width and height while keeping the original aspect ratio.";

    document.title =
      "Resize Images Online – JPG, PNG & WebP Image Resizer | Pixnora";

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    const previousDescription = meta.getAttribute("content");
    meta.setAttribute("content", descriptionText);

    let canonical = document.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    const previousCanonical = canonical.getAttribute("href");
    canonical.setAttribute(
      "href",
      "https://pixnora.devs.surf/image-resizer"
    );

    return () => {
      document.title = previousTitle;

      if (createdMeta) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }

      if (createdCanonical) {
        canonical.remove();
      } else if (previousCanonical !== null) {
        canonical.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    };
  }, []);

  function clearResult() {
    if (resultRef.current) {
      URL.revokeObjectURL(resultRef.current);
      resultRef.current = "";
    }
    setResult(null);
  }

  async function selectFile(selected) {
    if (!selected) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      setError("Please select a JPG, PNG or WebP image.");
      return;
    }

    if (selected.size > 25 * 1024 * 1024) {
      setError("Please select an image smaller than 25 MB.");
      return;
    }

    try {
      setError("");

      const data = await loadImage(selected);

      if (!data?.width || !data?.height) {
        throw new Error("Could not read image dimensions.");
      }

      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }

      clearResult();

      const url = URL.createObjectURL(selected);
      previewRef.current = url;

      setFile(selected);
      setPreview(url);
      setWidth(String(data.width));
      setHeight(String(data.height));
      setRatio(data.width / data.height);
      setLock(true);
    } catch {
      setError("Unable to open this image. Please try another file.");
    }
  }

  function changeWidth(value) {
    setWidth(value);
    clearResult();

    const numeric = Number(value);

    if (lock && value !== "" && numeric > 0 && ratio > 0) {
      setHeight(String(Math.max(1, Math.round(numeric / ratio))));
    }
  }

  function changeHeight(value) {
    setHeight(value);
    clearResult();

    const numeric = Number(value);

    if (lock && value !== "" && numeric > 0 && ratio > 0) {
      setWidth(String(Math.max(1, Math.round(numeric * ratio))));
    }
  }

  async function resize() {
    if (!file || !width || !height) {
      setError("Please enter both width and height.");
      return;
    }

    const w = Number(width);
    const h = Number(height);

    if (
      !Number.isInteger(w) ||
      !Number.isInteger(h) ||
      w < 1 ||
      h < 1 ||
      w > 12000 ||
      h > 12000 ||
      w * h > 40000000
    ) {
      setError(
        "Use dimensions from 1 to 12,000 px, with no more than 40 megapixels."
      );
      return;
    }

    setBusy(true);
    setError("");

    try {
      const image = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not available.");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image.image, 0, 0, w, h);

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (output) => {
            if (output) resolve(output);
            else reject(new Error("Could not create the resized image."));
          },
          "image/jpeg",
          0.9
        );
      });

      clearResult();

      const url = URL.createObjectURL(blob);
      resultRef.current = url;

      setResult({
        blob,
        url,
        size: blob.size,
        width: w,
        height: h,
      });
    } catch (err) {
      setError(
        err?.message || "Something went wrong while resizing the image."
      );
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!result) return;

    const anchor = document.createElement("a");
    anchor.href = result.url;
    anchor.download = "resized-image.jpg";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  function resetImage() {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = "";
    }

    clearResult();

    setFile(null);
    setPreview("");
    setWidth("");
    setHeight("");
    setRatio(1);
    setLock(true);
    setError("");

    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full overflow-x-clip bg-slate-50 text-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[500px] bg-gradient-to-br from-violet-100/80 via-white to-sky-100/80"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="mx-auto max-w-4xl pb-10 pt-12 text-center sm:pb-14 sm:pt-16 lg:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-extrabold text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              FREE ONLINE IMAGE TOOL
            </span>

           <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight !text-slate-950 sm:text-5xl lg:text-6xl">
              Resize Images
              <span className="mt-2 block bg-gradient-to-r from-violet-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Without Losing Control
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Set the exact width and height for your JPG, PNG and WebP
              images. Keep the original aspect ratio or customize each
              dimension with Pixnora.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["JPG", "PNG", "WebP", "Custom Dimensions"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-emerald-600" />
                Browser-based processing
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-emerald-600" />
                No signup required
              </span>
            </div>
          </section>

          {/* Workspace */}
          <section
            id="image-resizer"
            className="mx-auto mb-16 w-full max-w-5xl scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-violet-950/[0.07]"
          >
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-gradient-to-r from-white via-violet-50/60 to-sky-50/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                  <Icon name="resize" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-950">
                    Image Resizer Studio
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Upload · Customize · Download
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <Icon name="lock" className="h-3.5 w-3.5" />
                Private & secure
              </span>
            </div>

            <div className="p-4 sm:p-7">
              {!file ? (
                <div
                  onDragEnter={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setDragging(false);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    selectFile(e.dataTransfer.files?.[0]);
                  }}
                  onClick={() => inputRef.current?.click()}
                  className={`group flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-10 text-center transition duration-300 sm:min-h-[380px] ${
                    dragging
                      ? "scale-[1.005] border-violet-500 bg-violet-50"
                      : "border-slate-300 bg-gradient-to-br from-slate-50 via-white to-violet-50/60 hover:border-violet-400 hover:bg-violet-50/40"
                  }`}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/25 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                    <Icon name="upload" className="h-9 w-9" />
                  </div>

                  <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    {dragging ? "Drop your image here" : "Upload your image"}
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Drag and drop an image here, or browse your device to
                    get started.
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                    className={`${primaryButton} mt-6`}
                  >
                    <Icon name="image" className="h-4 w-4" />
                    Choose Image
                  </button>

                  <p className="mt-5 text-xs text-slate-400">
                    JPG, PNG or WebP · Maximum file size 25 MB
                  </p>

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={(e) => {
                      selectFile(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </div>
              ) : (
                <div>
                  <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <Icon name="image" className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="break-all text-sm font-extrabold text-slate-900">
                          {file.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Original size: {formatBytes(file.size)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={resetImage}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <Icon name="close" className="h-4 w-4" />
                      Remove image
                    </button>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Preview */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                        <span className="text-sm font-extrabold text-slate-800">
                          Original image
                        </span>
                        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">
                          PREVIEW
                        </span>
                      </div>

                      <div className="flex min-h-[270px] items-center justify-center p-4 sm:min-h-[350px]">
                        <img
                          src={preview}
                          alt="Original image preview"
                          className="max-h-[360px] max-w-full rounded-xl object-contain shadow-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 bg-white p-4">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-semibold text-slate-500">
                            File size
                          </p>
                          <p className="mt-1 break-words text-sm font-extrabold text-slate-900">
                            {formatBytes(file.size)}
                          </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-semibold text-slate-500">
                            Output format
                          </p>
                          <p className="mt-1 text-sm font-extrabold text-slate-900">
                            JPEG
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="rounded-2xl border border-violet-100 bg-white p-5 sm:p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                          <Icon name="resize" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-slate-950">
                            Resize settings
                          </h2>
                          <p className="mt-1 text-xs text-slate-500">
                            Enter dimensions in pixels.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <label className="block">
                          <span className="mb-2 block text-sm font-bold text-slate-700">
                            Width
                          </span>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="12000"
                              value={width}
                              onChange={(e) => changeWidth(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-10 text-sm font-semibold outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                              aria-label="Width in pixels"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                              px
                            </span>
                          </div>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-bold text-slate-700">
                            Height
                          </span>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="12000"
                              value={height}
                              onChange={(e) => changeHeight(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-10 text-sm font-semibold outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                              aria-label="Height in pixels"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                              px
                            </span>
                          </div>
                        </label>
                      </div>

                      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-4 transition hover:bg-violet-50">
                        <input
                          type="checkbox"
                          checked={lock}
                          onChange={(e) => {
                            setLock(e.target.checked);
                            clearResult();
                          }}
                          className="mt-0.5 h-4 w-4 accent-violet-600"
                        />
                        <span>
                          <span className="block text-sm font-extrabold text-slate-800">
                            Lock aspect ratio
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-slate-500">
                            Automatically adjust the other dimension to
                            preserve proportions.
                          </span>
                        </span>
                      </label>

                      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-slate-500">
                            New dimensions
                          </span>
                          <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-100">
                            Pixels
                          </span>
                        </div>
                        <p className="mt-2 break-words text-lg font-black text-slate-950">
                          {width || "—"} × {height || "—"} px
                        </p>
                      </div>

                      <p className="mt-4 text-xs leading-5 text-slate-500">
                        Maximum dimension: 12,000 px per side and 40
                        megapixels per image.
                      </p>

                      <button
                        type="button"
                        onClick={resize}
                        disabled={busy}
                        className={`${primaryButton} mt-5 w-full`}
                      >
                        {busy ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Resizing image...
                          </>
                        ) : (
                          <>
                            <Icon name="resize" className="h-4 w-4" />
                            Resize Image
                            <Icon name="arrow" className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      {error && (
                        <p
                          role="alert"
                          className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-700"
                        >
                          {error}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Result */}
                  {result && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/60">
                      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Icon name="check" className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-extrabold text-emerald-950">
                              Image resized successfully!
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                              {result.width} × {result.height} px ·{" "}
                              {formatBytes(result.size)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={download}
                          className={primaryButton}
                        >
                          <Icon name="download" className="h-4 w-4" />
                          Download Image
                        </button>
                      </div>

                      <div className="border-t border-emerald-200 bg-white p-4 sm:p-6">
                        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <img
                            src={result.url}
                            alt="Resized image preview"
                            className="max-h-[360px] max-w-full rounded-lg object-contain shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-emerald-600" />
                Local browser processing
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-emerald-600" />
                No software installation
              </span>
            </div>
          </section>

          {/* How it works */}
          <section className="mx-auto max-w-5xl pb-16">
            <SectionHeading
              eyebrow="Simple process"
              description="Resize your images in a few easy steps without installing software."
            >
              How to Resize an Image
            </SectionHeading>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Upload Image",
                  description:
                    "Choose a JPG, PNG or WebP image from your device.",
                },
                {
                  number: "02",
                  title: "Set Dimensions",
                  description:
                    "Enter the required width and height in pixels.",
                },
                {
                  number: "03",
                  title: "Download Result",
                  description:
                    "Resize your image and save the JPEG result.",
                },
              ].map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 font-black text-white shadow-md shadow-violet-500/20">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="mx-auto max-w-5xl pb-16">
            <SectionHeading
              eyebrow="Explore Pixnora"
              description="Discover more free online image tools."
            >
              Related Image Tools
            </SectionHeading>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RELATED_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
                >
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 px-3 text-sm font-black text-white">
                    {tool.label}
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900 transition group-hover:text-violet-700">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-violet-700">
                    Try tool
                    <Icon
                      name="arrow"
                      className="h-4 w-4 transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mx-auto max-w-4xl pb-20">
            <SectionHeading
              eyebrow="FAQs"
              description="Common questions about resizing images online."
            >
              Frequently Asked Questions
            </SectionHeading>

            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:border-violet-200 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-800 marker:hidden">
                    {faq.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xl font-normal text-violet-700 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
