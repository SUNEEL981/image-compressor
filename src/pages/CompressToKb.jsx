import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MultiImageCompressor from "../components/MultiImageCompressor";

const TARGET_OPTIONS = [50, 100, 200, 500];

export default function CompressToKb() {
  const [targetSize, setTargetSize] = useState(100);
  const [customSize, setCustomSize] = useState("");

  const selectedTarget = customSize
    ? Math.min(Math.max(Number(customSize) || 100, 10), 10240)
    : targetSize;

  const handlePreset = (size) => {
    setTargetSize(size);
    setCustomSize("");
  };

  const handleCustom = (event) => {
    const value = event.target.value;

    if (value === "") {
      setCustomSize("");
      return;
    }

    const numericValue = Number(value);

    if (numericValue >= 10 && numericValue <= 10240) {
      setCustomSize(value);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">

          {/* ================= HERO ================= */}
          <section className="mx-auto max-w-3xl pb-8 pt-12 text-center sm:pb-10 sm:pt-16 lg:pt-20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Target Size Compressor
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-1.8px] text-gray-950 sm:text-5xl lg:text-[58px]">
              Compress Images
              <br />
              <span className="text-gray-500">to a Specific KB</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Reduce JPG, PNG and WebP images to your desired file size.
              Choose a preset target or enter a custom size.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-gray-400 sm:text-xs">
              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                JPG
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                PNG
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                WebP
              </span>
              <span className="rounded-full border border-gray-200 px-3 py-1.5">
                Multiple Images
              </span>
            </div>
          </section>

          {/* ================= MAIN TOOL ================= */}
          <section className="mx-auto mb-14 w-full max-w-4xl rounded-[26px] border border-gray-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-4 lg:p-5">

            {/* Target Size Panel */}
            <div className="rounded-[20px] border border-gray-200 bg-gray-50/70 p-5 sm:p-6 lg:p-7">

              {/* Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
                      1
                    </span>

                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                      Compression Target
                    </span>
                  </div>

                  <h2 className="text-xl font-bold tracking-[-0.5px] text-gray-950 sm:text-2xl">
                    Choose target size
                  </h2>

                  <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
                    Set the maximum size for your compressed image.
                  </p>
                </div>

                <div className="hidden rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-500 sm:block">
                  10 KB – 10 MB
                </div>
              </div>

              {/* Presets */}
              <div className="mt-6">
                <p className="mb-2.5 text-xs font-semibold text-gray-500">
                  Popular sizes
                </p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TARGET_OPTIONS.map((size) => {
                    const isActive =
                      !customSize && targetSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handlePreset(size)}
                        className={`
                          group relative h-12 rounded-xl border
                          px-4 text-sm font-bold
                          transition-all duration-200
                          active:scale-[0.98]
                          ${
                            isActive
                              ? "border-gray-950 bg-gray-950 text-white shadow-[0_8px_20px_rgba(17,24,39,0.16)]"
                              : "border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-sm"
                          }
                        `}
                      >
                        {size} KB

                        {isActive && (
                          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Size */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <label
                      htmlFor="custom-target"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Custom target size
                    </label>

                    <p className="mt-1 text-xs text-gray-400">
                      Enter any value between 10 KB and 10 MB.
                    </p>
                  </div>

                  <div className="flex h-12 w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5 sm:w-[220px]">
                    <input
                      id="custom-target"
                      type="number"
                      min="10"
                      max="10240"
                      placeholder="Enter size"
                      value={customSize}
                      onChange={handleCustom}
                      aria-label="Custom target size in KB"
                      className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                    />

                    <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold text-gray-400">
                      KB
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Target */}
              <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:flex-row">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-900" />

                  <span className="text-xs font-medium text-gray-500">
                    Current target
                  </span>
                </div>

                <strong className="text-base font-extrabold text-gray-950">
                  {selectedTarget} KB
                </strong>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3 px-2 sm:px-4">
              <div className="h-px flex-1 bg-gray-100" />

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-bold text-gray-400">
                2
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                Upload
              </span>

              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* Existing Compressor */}
            <MultiImageCompressor
              accepted="image/jpeg,image/png,image/webp"
              targetSize={selectedTarget}
              outputType="image/webp"
              title="Upload Multiple Images"
            />
          </section>

          {/* ================= INFO ================= */}
          <section className="mx-auto mb-10 w-full max-w-4xl rounded-2xl border border-gray-200 bg-gray-50/60 p-5 sm:p-7">

            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-gray-900 shadow-sm">
                ✓
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-[-0.3px] text-gray-950 sm:text-xl">
                  Compress Images to 50KB, 100KB, 200KB or 500KB
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Quickly prepare images for websites, forms and online
                  applications.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm leading-7 text-gray-500">
              <p>
                Use Compressly when you need an image below a specific
                file-size limit. Choose a preset target or enter a custom
                size between 10 KB and 10 MB.
              </p>

              <p>
                You can process multiple JPG, PNG and WebP images in one
                session and download the compressed results.
              </p>
            </div>
          </section>

          {/* ================= RELATED TOOLS ================= */}
          <section className="mx-auto mb-16 w-full max-w-4xl">

            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
                More tools
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.5px] text-gray-950 sm:text-2xl">
                Other Image Tools
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <Link
                to="/jpg-compressor"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xs font-extrabold text-gray-700">
                    JPG
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  JPG Image Compressor
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Compress JPG and JPEG images online.
                </p>
              </Link>

              <Link
                to="/png-compressor"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xs font-extrabold text-gray-700">
                    PNG
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  PNG Image Compressor
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Reduce PNG image file size while keeping quality.
                </p>
              </Link>

              <Link
                to="/webp-compressor"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xs font-extrabold text-gray-700">
                    WEBP
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  WebP Image Compressor
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Compress WebP images for faster websites.
                </p>
              </Link>

              <Link
                to="/image-resizer"
                className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xs font-extrabold text-gray-700">
                    RESIZE
                  </div>

                  <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-gray-950">
                  Image Resizer
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Resize images to custom dimensions quickly.
                </p>
              </Link>

            </div>
          </section>
        </div>
      </main>
    </>
  );
}