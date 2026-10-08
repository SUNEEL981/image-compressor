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

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);

  const [target, setTarget] = useState(100);
  const [customTarget, setCustomTarget] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const targetKB = customTarget
    ? Number(customTarget)
    : target;

  /* =====================================================
     SEO
  ===================================================== */

  useEffect(() => {
    const finalTitle =
      seoTitle ||
      `${title} Online – Compress ${inputLabel} Images | Compressly`;

    const finalDescription =
      seoDescription ||
      description;

    document.title = finalTitle;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      finalDescription
    );

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    const canonicalUrl =
      canonicalPath
        ? `https://image-compressor-drab-pi.vercel.app${canonicalPath}`
        : window.location.href.split("#")[0].split("?")[0];

    canonical.setAttribute(
      "href",
      canonicalUrl
    );

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [
    title,
    description,
    inputLabel,
    seoTitle,
    seoDescription,
    canonicalPath,
  ]);

  /* =====================================================
     FILE SELECT
  ===================================================== */

  function selectFile(selected) {
    if (!selected) return;

    setError("");
    setResult(null);

    if (selected.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 20 MB.");
      return;
    }

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(selected);

    setFile(selected);
    setPreview(url);
  }

  /* =====================================================
     COMPRESS
  ===================================================== */

  async function compress() {
    if (!file) {
      setError(
        `Please select a ${inputLabel} image.`
      );
      return;
    }

    if (
      !targetKB ||
      targetKB < 10 ||
      targetKB > 10240
    ) {
      setError(
        "Target size must be between 10 KB and 10240 KB."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }

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

      const resultUrl =
        URL.createObjectURL(data.blob);

      setResult({
        ...data,
        file: outputFile,
        url: resultUrl,
      });
    } catch (err) {
      setError(
        err?.message ||
          "Compression failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     DOWNLOAD
  ===================================================== */

  function download() {
    if (!result?.file) return;

    const url = URL.createObjectURL(
      result.file
    );

    const a = document.createElement("a");

    a.href = url;
    a.download = result.file.name;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
  }

  /* =====================================================
     RESET
  ===================================================== */

  function reset() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
    setCustomTarget("");
    setTarget(100);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const saved = result
    ? reductionPercent(
        file.size,
        result.file.size
      )
    : 0;

  return (
    <>
      <Header />

      <main className="min-h-screen w-full overflow-x-hidden bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="mx-auto max-w-4xl pb-10 pt-10 text-center sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-18">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] !text-gray-500 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />

              <span className="!text-gray-500">
                Free Online Image Tool
              </span>
            </div>

            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.05] tracking-[-1.5px] !text-gray-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 !text-gray-500 sm:text-base sm:leading-8">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold !text-gray-500 sm:text-[11px]">
                {inputLabel}
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold !text-gray-500 sm:text-[11px]">
                Up to 20 MB
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold !text-gray-500 sm:text-[11px]">
                Browser Based
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold !text-gray-500 sm:text-[11px]">
                Free
              </span>

            </div>
          </section>

          {/* =================================================
              MAIN TOOL
          ================================================= */}

          <section className="mx-auto mb-12 w-full max-w-4xl rounded-[24px] border border-gray-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-4 lg:p-5">

            {!file ? (

              /* =================================================
                 UPLOAD
              ================================================= */

              <div
                className="group flex min-h-[350px] cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-gray-200 bg-gray-50/50 px-5 py-10 text-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 sm:min-h-[390px]"
                onClick={() =>
                  inputRef.current?.click()
                }
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-2xl !text-gray-700 shadow-sm transition-transform duration-200 group-hover:-translate-y-1 sm:h-16 sm:w-16">
                  ↑
                </div>

                <h2 className="mt-5 text-xl font-bold tracking-[-0.4px] !text-gray-950 sm:mt-6">
                  Upload {inputLabel} image
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 !text-gray-500">
                  Choose an image and compress it to
                  your preferred target file size.
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  className="mt-6 rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold !text-white shadow-[0_8px_20px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98]"
                >
                  <span className="!text-white">
                    Choose Image
                  </span>
                </button>

                <p className="mt-4 text-[11px] !text-gray-400">
                  Maximum file size: 20 MB
                </p>

                <input
                  ref={inputRef}
                  type="file"
                  accept={accepted}
                  hidden
                  onChange={(e) =>
                    selectFile(
                      e.target.files?.[0]
                    )
                  }
                />

              </div>

            ) : (

              <>
                {/* =================================================
                    SELECTED FILE
                ================================================= */}

                <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[10px] font-extrabold !text-gray-700 shadow-sm">
                      {inputLabel
                        .slice(0, 3)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold !text-gray-900">
                        {file.name}
                      </p>

                      <p className="mt-0.5 text-xs !text-gray-400">
                        {formatBytes(file.size)}
                      </p>

                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold !text-gray-600 transition hover:border-gray-300 hover:!text-gray-900 sm:w-auto"
                  >
                    Remove
                  </button>

                </div>

                {/* =================================================
                    SETTINGS
                ================================================= */}

                <div className="rounded-[20px] border border-gray-200 bg-gray-50/70 p-5 sm:p-6 lg:p-7">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <div className="mb-2 flex items-center gap-2">

                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-950 text-xs font-bold !text-white">
                          1
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] !text-gray-400 sm:text-[11px]">
                          Compression Settings
                        </span>

                      </div>

                      <h2 className="text-xl font-bold tracking-[-0.5px] !text-gray-950 sm:text-2xl">
                        Choose target file size
                      </h2>

                      <p className="mt-1 text-xs leading-6 !text-gray-500 sm:text-sm">
                        Select the maximum size for your
                        compressed image.
                      </p>

                    </div>

                    <div className="w-fit rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-semibold !text-gray-500 sm:text-[11px]">
                      10 KB – 10 MB
                    </div>

                  </div>

                  {/* =================================================
                      PRESETS
                  ================================================= */}

                  <div className="mt-6">

                    <p className="mb-2.5 text-xs font-semibold !text-gray-500">
                      Popular sizes
                    </p>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                      {[50, 100, 200, 500].map(
                        (size) => {
                          const active =
                            !customTarget &&
                            target === size;

                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => {
                                setTarget(size);
                                setCustomTarget("");
                              }}
                              className={`relative h-12 rounded-xl border px-4 text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
                                active
                                  ? "border-gray-950 bg-gray-950 !text-white shadow-[0_8px_20px_rgba(17,24,39,0.16)]"
                                  : "border-gray-200 bg-white !text-gray-700 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-sm"
                              }`}
                            >
                              <span
                                className={
                                  active
                                    ? "!text-white"
                                    : "!text-gray-700"
                                }
                              >
                                {size} KB
                              </span>

                              {active && (
                                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </button>
                          );
                        }
                      )}

                    </div>
                  </div>

                  {/* =================================================
                      CUSTOM TARGET
                  ================================================= */}

                  <div className="mt-6 border-t border-gray-200 pt-6">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <label
                          htmlFor="custom-target"
                          className="text-sm font-semibold !text-gray-800"
                        >
                          Custom target size
                        </label>

                        <p className="mt-1 text-xs !text-gray-400">
                          Enter a value from 10 KB to
                          10 MB.
                        </p>

                      </div>

                      <div className="flex h-12 w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5 sm:w-[220px]">

                        <input
                          id="custom-target"
                          type="number"
                          min="10"
                          max="10240"
                          placeholder="Enter size"
                          value={customTarget}
                          onChange={(e) =>
                            setCustomTarget(
                              e.target.value
                            )
                          }
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold !text-gray-900 outline-none placeholder:!text-gray-400"
                        />

                        <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold !text-gray-400">
                          KB
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      CURRENT TARGET
                  ================================================= */}

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">

                    <div className="flex items-center gap-2">

                      <span className="h-2 w-2 rounded-full bg-gray-900" />

                      <span className="text-xs font-medium !text-gray-500">
                        Current target
                      </span>

                    </div>

                    <strong className="text-base font-extrabold !text-gray-950">
                      {targetKB || 100} KB
                    </strong>

                  </div>

                  {note && (
                    <p className="mt-3 text-xs leading-5 !text-gray-400">
                      {note}
                    </p>
                  )}

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium !text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* =================================================
                    COMPRESS BUTTON
                ================================================= */}

                <div className="mt-5">

                  <button
                    type="button"
                    onClick={compress}
                    disabled={loading}
                    className="w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold !text-white shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="!text-white">
                      {loading
                        ? "Compressing..."
                        : `Compress ${inputLabel}`}
                    </span>
                  </button>

                </div>

                {/* =================================================
                    RESULT
                ================================================= */}

                {result && (
                  <div className="mt-7">

                    <div className="mb-4 flex items-center gap-3">

                      <div className="h-px flex-1 bg-gray-100" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] !text-gray-400 sm:text-[11px]">
                        Result
                      </span>

                      <div className="h-px flex-1 bg-gray-100" />

                    </div>

                    {/* Preview */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* Original */}

                      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">

                        <div className="mb-3 flex items-center justify-between">

                          <span className="text-xs font-bold !text-gray-700">
                            Original
                          </span>

                          <span className="text-[11px] !text-gray-400">
                            {formatBytes(
                              file.size
                            )}
                          </span>

                        </div>

                        <div className="flex min-h-[210px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3 sm:min-h-[230px]">

                          <img
                            src={preview}
                            alt={`Original ${inputLabel} image`}
                            className="max-h-[220px] max-w-full object-contain"
                          />

                        </div>

                      </div>

                      {/* Compressed */}

                      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">

                        <div className="mb-3 flex items-center justify-between">

                          <span className="text-xs font-bold !text-gray-700">
                            Compressed
                          </span>

                          <span className="text-[11px] !text-gray-400">
                            {formatBytes(
                              result.file.size
                            )}
                          </span>

                        </div>

                        <div className="flex min-h-[210px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3 sm:min-h-[230px]">

                          <img
                            src={result.url}
                            alt={`Compressed ${inputLabel} image`}
                            className="max-h-[220px] max-w-full object-contain"
                          />

                        </div>

                      </div>

                    </div>

                    {/* Stats */}

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">

                      <div className="rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-4 text-center">

                        <strong className="block text-base font-extrabold !text-gray-950">
                          {formatBytes(
                            result.file.size
                          )}
                        </strong>

                        <span className="mt-1 block text-[11px] font-medium !text-gray-400">
                          Final size
                        </span>

                      </div>

                      <div className="rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-4 text-center">

                        <strong className="block text-base font-extrabold !text-gray-950">
                          {saved.toFixed(0)}%
                        </strong>

                        <span className="mt-1 block text-[11px] font-medium !text-gray-400">
                          Space saved
                        </span>

                      </div>

                      <div className="rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-4 text-center">

                        <strong className="block text-base font-extrabold !text-gray-950">
                          {outputName.toUpperCase()}
                        </strong>

                        <span className="mt-1 block text-[11px] font-medium !text-gray-400">
                          Output format
                        </span>

                      </div>

                    </div>

                    {/* Status */}

                    <div
                      className={`mt-4 rounded-xl border px-4 py-3 text-center text-xs font-semibold ${
                        result.achieved
                          ? "border-gray-200 bg-gray-50 !text-gray-700"
                          : "border-amber-200 bg-amber-50 !text-amber-700"
                      }`}
                    >
                      {result.achieved
                        ? "✓ Target size achieved"
                        : "Target size could not be reached exactly. Best available result was generated."}
                    </div>

                    {/* Actions */}

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

                      <button
                        type="button"
                        onClick={download}
                        className="rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold !text-white shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.99]"
                      >
                        <span className="!text-white">
                          Download
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={reset}
                        className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-bold !text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99]"
                      >
                        <span className="!text-gray-700">
                          Compress Another
                        </span>
                      </button>

                    </div>

                  </div>
                )}

              </>
            )}

          </section>

          {/* =================================================
              SEO CONTENT
          ================================================= */}

          <section className="mx-auto mb-10 w-full max-w-4xl rounded-2xl border border-gray-200 bg-gray-50/60 p-5 sm:p-7">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold !text-gray-900 shadow-sm">
                ✓
              </div>

              <div className="min-w-0">

                <h2 className="text-lg font-bold tracking-[-0.3px] !text-gray-950 sm:text-xl">
                  Compress {inputLabel} Images Online
                </h2>

                <p className="mt-1 text-xs !text-gray-400">
                  Free browser-based image compression
                </p>

              </div>

            </div>

            <div className="mt-5 space-y-4 text-sm leading-7 !text-gray-500">

              <p>
                Compressly is a free online image compression
                tool that helps reduce {inputLabel} image file
                size quickly. Choose your image, select a target
                size and download the compressed result.
              </p>

              <p>
                You can use the tool to reduce image file sizes
                for websites, online forms, documents, email,
                sharing and other situations where smaller images
                are useful.
              </p>

              <p>
                Image processing happens directly in your browser,
                so your images do not need to be uploaded to a
                server for normal compression.
              </p>

            </div>

          </section>

          {/* =================================================
              HOW TO USE
          ================================================= */}

          <section className="mx-auto mb-10 w-full max-w-4xl">

            <div className="mb-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.12em] !text-gray-400 sm:text-[11px]">
                Simple process
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.5px] !text-gray-950 sm:text-2xl">
                How to compress an image
              </h2>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-5">

                <span className="text-[11px] font-extrabold !text-gray-400">
                  01
                </span>

                <h3 className="mt-4 text-sm font-bold !text-gray-950">
                  Upload your image
                </h3>

                <p className="mt-2 text-xs leading-6 !text-gray-500">
                  Choose a {inputLabel} image from your device.
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">

                <span className="text-[11px] font-extrabold !text-gray-400">
                  02
                </span>

                <h3 className="mt-4 text-sm font-bold !text-gray-950">
                  Select target size
                </h3>

                <p className="mt-2 text-xs leading-6 !text-gray-500">
                  Choose 50KB, 100KB, 200KB, 500KB or enter a
                  custom size.
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">

                <span className="text-[11px] font-extrabold !text-gray-400">
                  03
                </span>

                <h3 className="mt-4 text-sm font-bold !text-gray-950">
                  Download
                </h3>

                <p className="mt-2 text-xs leading-6 !text-gray-500">
                  Compress the image and download the result.
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              FAQ
          ================================================= */}

          <section className="mx-auto mb-12 w-full max-w-4xl">

            <div className="mb-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.12em] !text-gray-400 sm:text-[11px]">
                FAQ
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.5px] !text-gray-950 sm:text-2xl">
                Frequently Asked Questions
              </h2>

            </div>

            <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">

              <details className="group p-5">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold !text-gray-900">
                  Can I compress {inputLabel} images online?

                  <span className="shrink-0 text-lg !text-gray-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-7 !text-gray-500">
                  Yes. Compressly lets you compress {inputLabel}
                  images directly in your browser and download the
                  compressed result.
                </p>

              </details>

              <details className="group p-5">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold !text-gray-900">
                  What target sizes are available?

                  <span className="shrink-0 text-lg !text-gray-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-7 !text-gray-500">
                  You can choose 50KB, 100KB, 200KB or 500KB.
                  You can also enter a custom target between 10KB
                  and 10240KB.
                </p>

              </details>

              <details className="group p-5">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold !text-gray-900">
                  Are my images uploaded to a server?

                  <span className="shrink-0 text-lg !text-gray-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-7 !text-gray-500">
                  Normal image processing happens directly in your
                  browser, so your image does not need to be uploaded
                  to a server.
                </p>

              </details>

              <details className="group p-5">

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold !text-gray-900">
                  Is the image compressor free?

                  <span className="shrink-0 text-lg !text-gray-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-7 !text-gray-500">
                  Yes. Compressly provides this browser-based image
                  compression tool for free.
                </p>

              </details>

            </div>

          </section>

          {/* =================================================
              RELATED TOOLS
          ================================================= */}

          <section className="mx-auto mb-16 w-full max-w-4xl">

            <div className="mb-5">

              <p className="text-[10px] font-bold uppercase tracking-[0.12em] !text-gray-400 sm:text-[11px]">
                More tools
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.5px] !text-gray-950 sm:text-2xl">
                More Image Tools
              </h2>

              <p className="mt-2 text-sm !text-gray-500">
                Explore other tools for compression, conversion
                and resizing.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {[
                {
                  to: "/jpg-compressor",
                  label: "JPG",
                  title: "JPG Image Compressor",
                  description:
                    "Compress JPG and JPEG images online.",
                },
                {
                  to: "/png-compressor",
                  label: "PNG",
                  title: "PNG Image Compressor",
                  description:
                    "Reduce PNG image file size online.",
                },
                {
                  to: "/webp-compressor",
                  label: "WEBP",
                  title: "WebP Image Compressor",
                  description:
                    "Compress WebP images while keeping good quality.",
                },
                {
                  to: "/jpg-to-webp",
                  label: "JPG →",
                  title: "JPG to WebP Converter",
                  description:
                    "Convert JPG images to WebP format.",
                },
                {
                  to: "/png-to-webp",
                  label: "PNG →",
                  title: "PNG to WebP Converter",
                  description:
                    "Convert PNG images to WebP format.",
                },
                {
                  to: "/image-resizer",
                  label: "RESIZE",
                  title: "Image Resizer",
                  description:
                    "Resize images to custom dimensions.",
                },
                {
                  to: "/compress-to-kb",
                  label: "KB",
                  title: "Compress Image to Specific KB",
                  description:
                    "Compress images to a target KB size.",
                },
              ].map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 !text-gray-900 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[9px] font-extrabold !text-gray-700">
                      {tool.label}
                    </div>

                    <span className="text-lg !text-gray-300 transition-transform group-hover:translate-x-1 group-hover:!text-gray-700">
                      →
                    </span>

                  </div>

                  <h3 className="mt-5 text-base font-bold !text-gray-950">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 !text-gray-500">
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