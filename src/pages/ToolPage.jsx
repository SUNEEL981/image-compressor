
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  MAX_FILE_SIZE,
  formatBytes,
  reductionPercent,
  compressToTarget,
  createOutputFile,
} from "../utils/imageTools";

const PRESETS = [50, 100, 200, 500];

const RELATED_TOOLS = [
  { to: "/jpg-compressor", label: "JPG", title: "JPG Compressor", description: "Compress JPG images online." },
  { to: "/png-compressor", label: "PNG", title: "PNG Compressor", description: "Reduce PNG image file size." },
  { to: "/webp-compressor", label: "WEBP", title: "WebP Compressor", description: "Compress WebP images online." },
  { to: "/jpg-to-webp", label: "JPG →", title: "JPG to WebP", description: "Convert JPG images into WebP." },
  { to: "/png-to-webp", label: "PNG →", title: "PNG to WebP", description: "Convert PNG images into WebP." },
  { to: "/image-resizer", label: "SIZE", title: "Image Resizer", description: "Resize images to custom dimensions." },
  { to: "/compress-to-kb", label: "KB", title: "Compress Image to KB", description: "Compress images to a target size." },
];

export default function ToolPage({
  title,
  description,
  accepted,
  inputLabel,
  outputType,
  outputName,
  note,
  seoTitle,
  seoDescription,
  canonicalPath,
}) {
  const inputRef = useRef(null);
  const previewRef = useRef("");
  const resultUrlRef = useRef("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [target, setTarget] = useState(100);
  const [customTarget, setCustomTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const targetKB = customTarget !== "" ? Number(customTarget) : target;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = seoTitle || `${title} Online | Pixnora`;

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    const previousDescription = meta.getAttribute("content");
    meta.setAttribute("content", seoDescription || description);

    let canonical = document.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    const previousCanonical = canonical.getAttribute("href");

    canonical.href = canonicalPath
      ? `https://pixnora.devs.surf${canonicalPath}`
      : window.location.href.split("#")[0].split("?")[0];

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
  }, [title, description, seoTitle, seoDescription, canonicalPath]);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }

      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
      }
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = "";
    }

    setResult(null);
  }

  function selectFile(selected) {
    if (!selected) return;

    setError("");

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 20 MB.");
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    clearResult();

    const url = URL.createObjectURL(selected);
    previewRef.current = url;

    setFile(selected);
    setPreview(url);
  }

  async function compress() {
    if (!file) {
      setError(`Please select a ${inputLabel} image.`);
      return;
    }

    if (
      !Number.isFinite(targetKB) ||
      targetKB < 10 ||
      targetKB > 10240
    ) {
      setError("Target size must be between 10 KB and 10240 KB.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      clearResult();

      const data = await compressToTarget(
        file,
        targetKB * 1024,
        outputType
      );

      const outputFile = createOutputFile(
        data.blob,
        file.name,
        outputType
      );

      const url = URL.createObjectURL(data.blob);
      resultUrlRef.current = url;

      setResult({
        ...data,
        file: outputFile,
        url,
      });
    } catch (err) {
      setError(err?.message || "Compression failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!result?.file) return;

    const url = URL.createObjectURL(result.file);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = result.file.name;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function reset() {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = "";
    }

    clearResult();

    setFile(null);
    setPreview("");
    setError("");
    setTarget(100);
    setCustomTarget("");
    setDragging(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const saved =
    result && file
      ? reductionPercent(file.size, result.file.size)
      : 0;

  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full overflow-x-clip bg-[#faf9ff] text-gray-900">
        {/* HERO */}
        <section className="relative w-full overflow-hidden border-b border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50">
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600" />
              FREE ONLINE IMAGE TOOL
            </span>

            <h1 className="mx-auto mt-6 w-full max-w-5xl break-words bg-gradient-to-r from-violet-700 via-purple-600 to-blue-600 bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mx-auto mt-5 w-full max-w-3xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              {description}
            </p>

            <div className="mt-6 flex w-full flex-wrap justify-center gap-2">
              {[inputLabel, "Up to 20 MB", "Browser Based", "Free to Use"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CENTERED PAGE CONTAINER */}
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* COMPRESSION TOOL */}
          <section className="mx-auto mb-14 mt-10 w-full max-w-5xl sm:mt-12">
            <div className="rounded-3xl border border-violet-100 bg-white p-3 shadow-[0_20px_70px_rgba(91,33,182,0.09)] sm:p-5 lg:p-7">
              {!file ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    selectFile(e.dataTransfer.files?.[0]);
                  }}
                  onClick={() => inputRef.current?.click()}
                  className={`group flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-10 text-center transition sm:min-h-[400px] ${
                    dragging
                      ? "border-violet-500 bg-violet-50"
                      : "border-violet-200 bg-gradient-to-br from-violet-50/70 via-white to-blue-50/70 hover:border-violet-400"
                  }`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-3xl text-white shadow-lg shadow-violet-200 transition group-hover:-translate-y-1">
                    ↑
                  </div>

                  <h2 className="mt-6 text-xl font-extrabold text-gray-900 sm:text-2xl">
                    Upload {inputLabel} Image
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                    Drag and drop your image here, or choose a file from your device.
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                    className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Choose Image
                  </button>

                  <p className="mt-4 text-xs text-gray-400">
                    Maximum file size: 20 MB
                  </p>

                  <input
                    ref={inputRef}
                    type="file"
                    accept={accepted}
                    hidden
                    onChange={(e) => {
                      selectFile(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </div>
              ) : (
                <>
                  {/* SELECTED FILE */}
                  <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-violet-100 bg-violet-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-extrabold text-white">
                        IMG
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {file.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatBytes(file.size)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-xl border border-violet-100 bg-white px-4 py-2.5 text-xs font-bold text-gray-600 hover:border-violet-300 hover:text-violet-700"
                    >
                      Remove Image
                    </button>
                  </div>

                  {/* SETTINGS */}
                  <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-blue-50/70 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                            1
                          </span>
                          Compression Settings
                        </span>

                        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                          Choose target file size
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          Select your preferred maximum image size.
                        </p>
                      </div>

                      <span className="w-fit rounded-full border border-violet-100 bg-white px-3 py-2 text-xs font-bold text-violet-700">
                        10 KB – 10 MB
                      </span>
                    </div>

                    <div className="mt-6">
                      <p className="mb-3 text-sm font-bold text-gray-700">
                        Popular sizes
                      </p>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {PRESETS.map((size) => {
                          const active = !customTarget && target === size;

                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => {
                                setTarget(size);
                                setCustomTarget("");
                              }}
                              className={`rounded-xl border px-3 py-3.5 text-sm font-extrabold transition ${
                                active
                                  ? "border-transparent bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-violet-200"
                                  : "border-violet-100 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50"
                              }`}
                            >
                              {size} KB
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-violet-100 pt-6">
                      <label htmlFor="custom-target" className="text-sm font-bold text-gray-800">
                        Custom target size
                      </label>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Enter a value between 10 KB and 10240 KB.
                      </p>

                      <div className="mt-3 flex h-12 overflow-hidden rounded-xl border border-violet-100 bg-white focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                        <input
                          id="custom-target"
                          type="number"
                          min="10"
                          max="10240"
                          step="1"
                          placeholder="Enter target size"
                          value={customTarget}
                          onChange={(e) => setCustomTarget(e.target.value)}
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                        />

                        <span className="flex items-center border-l border-violet-100 px-4 text-xs font-bold text-violet-600">
                          KB
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-xl border border-violet-100 bg-white px-4 py-3.5">
                      <span className="text-sm font-medium text-gray-600">
                        Current target
                      </span>
                      <strong className="text-base font-extrabold text-violet-700">
                        {targetKB || 0} KB
                      </strong>
                    </div>

                    {note && (
                      <p className="mt-3 text-xs leading-6 text-gray-500">
                        {note}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={compress}
                    disabled={loading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Compressing Image...
                      </>
                    ) : (
                      `Compress ${inputLabel}`
                    )}
                  </button>

                  {/* RESULTS */}
                  {result && (
                    <div className="mt-8 border-t border-violet-100 pt-7">
                      <div className="mb-5 text-center">
                        <span className="inline-flex rounded-full bg-gradient-to-r from-violet-100 to-blue-100 px-4 py-2 text-xs font-bold text-violet-700">
                          ✓ Compression Complete
                        </span>

                        <h2 className="mt-3 text-xl font-extrabold text-gray-900 sm:text-2xl">
                          Your image is ready
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-gray-700">
                              Original
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatBytes(file.size)}
                            </span>
                          </div>

                          <div className="flex min-h-[210px] items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-3">
                            <img
                              src={preview}
                              alt={`Original ${inputLabel} image`}
                              className="max-h-[240px] max-w-full object-contain"
                            />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-violet-700">
                              Compressed
                            </span>
                            <span className="text-xs text-violet-600">
                              {formatBytes(result.file.size)}
                            </span>
                          </div>

                          <div className="flex min-h-[210px] items-center justify-center overflow-hidden rounded-xl border border-violet-100 bg-white p-3">
                            <img
                              src={result.url}
                              alt={`Compressed ${inputLabel} image`}
                              className="max-h-[240px] max-w-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4 text-center">
                          <strong className="block text-lg font-extrabold text-gray-900">
                            {formatBytes(result.file.size)}
                          </strong>
                          <span className="mt-1 block text-xs text-gray-500">
                            Final size
                          </span>
                        </div>

                        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4 text-center">
                          <strong className="block text-lg font-extrabold text-violet-700">
                            {saved.toFixed(0)}%
                          </strong>
                          <span className="mt-1 block text-xs text-gray-500">
                            Space saved
                          </span>
                        </div>

                        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4 text-center">
                          <strong className="block text-lg font-extrabold text-gray-900">
                            {outputName.toUpperCase()}
                          </strong>
                          <span className="mt-1 block text-xs text-gray-500">
                            Output format
                          </span>
                        </div>
                      </div>

                      <div
                        className={`mt-4 rounded-xl border px-4 py-3 text-center text-xs font-semibold ${
                          result.achieved
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {result.achieved
                          ? "✓ Target size achieved"
                          : "Best available result generated. Exact target size could not be reached."}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={download}
                          className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5"
                        >
                          ↓ Download Image
                        </button>

                        <button
                          type="button"
                          onClick={reset}
                          className="rounded-xl border border-violet-200 bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                        >
                          Compress Another Image
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <p className="mt-4 text-center text-xs leading-6 text-gray-500">
              Pixnora's image compression tool uses your existing browser-side image utilities.
            </p>
          </section>

          {/* SEO CONTENT */}
          <section className="mx-auto mb-12 w-full max-w-5xl rounded-3xl border border-violet-100 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Compress {inputLabel} Images Online
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Pixnora helps you reduce image file sizes with a simple online compression tool. Choose an image, set a target size and download the result.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              Smaller images can be useful for website uploads, application forms, documents, email attachments and image sharing.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              Compression results depend on the original image, its dimensions, format and visual complexity. An exact target size cannot be guaranteed for every image.
            </p>
          </section>

          {/* HOW TO USE */}
          <section className="mx-auto mb-12 w-full max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Simple process
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
              How to Compress an Image
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["01", "Upload your image", `Select a ${inputLabel} image from your device.`],
                ["02", "Choose target size", "Select a preset size or enter a custom target."],
                ["03", "Download", "Compress the image and download your result."],
              ].map(([number, heading, text]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-violet-100 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/70"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-xs font-extrabold text-violet-700">
                    {number}
                  </span>

                  <h3 className="mt-4 text-base font-extrabold text-gray-900">
                    {heading}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto mb-12 w-full max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              FAQ
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-5 divide-y divide-violet-100 overflow-hidden rounded-2xl border border-violet-100 bg-white">
              {[
                [`Can I compress ${inputLabel} images online?`, "Yes. Upload a supported image, choose a target size and generate a compressed result."],
                ["Which target sizes are available?", "Choose 50 KB, 100 KB, 200 KB or 500 KB, or enter a custom size between 10 KB and 10240 KB."],
                ["Will every image reach the exact target size?", "Not always. The result depends on the original image and the compression options available."],
                ["Is Pixnora free to use?", "Yes. This image compression tool is free to use."],
                ["Are my images uploaded to a server?", "The tool calls your existing image compression utility. Confirm its implementation to verify the exact processing behavior."],
              ].map(([question, answer]) => (
                <details key={question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-gray-800">
                    {question}
                    <span className="shrink-0 text-xl text-violet-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* RELATED TOOLS */}
          <section className="mx-auto mb-16 w-full max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Explore Pixnora
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
              More Image Tools
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Explore more tools for compression, conversion and resizing.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED_TOOLS.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group rounded-2xl border border-violet-100 bg-white p-5 text-gray-900 no-underline transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/70"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 px-2 text-[10px] font-extrabold text-violet-700">
                      {tool.label}
                    </div>

                    <span className="text-lg text-violet-400 transition group-hover:translate-x-1 group-hover:text-violet-700">
                      →
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-gray-900">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-600">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
