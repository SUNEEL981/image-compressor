
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MultiImageCompressor from "../components/MultiImageCompressor";

const PRESETS = [
  { size: 50, label: "50 KB", description: "Forms & documents" },
  { size: 100, label: "100 KB", description: "Online applications" },
  { size: 200, label: "200 KB", description: "ID cards & photos" },
  { size: 500, label: "500 KB", description: "Better image quality" },
];

const FEATURES = [
  {
    icon: "🎯",
    title: "Target file size",
    description: "Choose a target size in KB for your images.",
  },
  {
    icon: "⚡",
    title: "Fast processing",
    description: "Compress images directly in your browser.",
  },
  {
    icon: "🔒",
    title: "Privacy first",
    description: "Image processing happens on your device.",
  },
  {
    icon: "📦",
    title: "Batch compression",
    description: "Process multiple images in one workflow.",
  },
];

export default function CompressToKb() {
  const [selectedTarget, setSelectedTarget] = useState(100);
  const [customTarget, setCustomTarget] = useState("100");
  const [useCustom, setUseCustom] = useState(false);

  const targetSize = useCustom
    ? Number(customTarget)
    : selectedTarget;

  const isValidTarget =
    Number.isFinite(targetSize) &&
    targetSize >= 10 &&
    targetSize <= 10240;

  function selectPreset(size) {
    setSelectedTarget(size);
    setCustomTarget(String(size));
    setUseCustom(false);
  }

  function handleCustomChange(event) {
    const value = event.target.value;

    if (value === "" || /^\d+$/.test(value)) {
      setCustomTarget(value);
      setUseCustom(true);
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-indigo-100 bg-white">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />
            <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-white" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pt-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Free online image tool
              </div>

              <h1 className="text-4xl font-black tracking-tight !text-slate-950 sm:text-5xl lg:text-6xl">
                Compress Image to{" "}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  Specific KB
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Reduce JPG, PNG and WebP image sizes to your target KB.
                Select a preset or enter a custom size, then download
                your compressed images.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                  <svg
                    className="h-4 w-4 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                  No signup
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                  <svg
                    className="h-4 w-4 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Browser-based processing
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                  <svg
                    className="h-4 w-4 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Free downloads
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main compressor */}
        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
                  Compression workspace
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Choose your target size
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  Select a size below before adding your images.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Ready to compress
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-indigo-950/5">
              {/* Target size controls */}
              <div className="border-b border-slate-200 bg-gradient-to-br from-white via-violet-50/50 to-sky-50/70 p-5 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="12" cy="12" r="1" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Target file size
                    </h3>
                    <p className="text-sm text-slate-500">
                      Presets are available for common requirements.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {PRESETS.map((preset) => {
                    const active =
                      !useCustom && selectedTarget === preset.size;

                    return (
                      <button
                        key={preset.size}
                        type="button"
                        onClick={() => selectPreset(preset.size)}
                        aria-pressed={active}
                        className={`group rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                          active
                            ? "border-violet-500 bg-white shadow-md shadow-violet-500/10 ring-2 ring-violet-500/15"
                            : "border-slate-200 bg-white/80 hover:border-violet-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-2xl font-black tracking-tight ${
                              active ? "text-violet-700" : "text-slate-800"
                            }`}
                          >
                            {preset.label}
                          </span>

                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              active
                                ? "border-violet-600 bg-violet-600 text-white"
                                : "border-slate-300 bg-white text-transparent"
                            }`}
                          >
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              aria-hidden="true"
                            >
                              <path d="m3 8 3 3 7-7" />
                            </svg>
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Custom size */}
                <div
                  className={`mt-4 rounded-2xl border p-4 transition sm:p-5 ${
                    useCustom
                      ? "border-violet-300 bg-white ring-2 ring-violet-500/10"
                      : "border-slate-200 bg-white/80"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            aria-hidden="true"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                          </svg>
                        </span>

                        <div>
                          <h4 className="font-bold text-slate-900">
                            Custom target size
                          </h4>
                          <p className="text-xs text-slate-500">
                            Enter any size from 10 KB to 10 MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <label
                        className="sr-only"
                        htmlFor="custom-target-size"
                      >
                        Custom target size in KB
                      </label>

                      <div className="relative w-full sm:w-44">
                        <input
                          id="custom-target-size"
                          type="number"
                          min="10"
                          max="10240"
                          step="1"
                          inputMode="numeric"
                          value={customTarget}
                          onFocus={() => setUseCustom(true)}
                          onChange={handleCustomChange}
                          aria-invalid={!isValidTarget}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 font-bold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                          placeholder="Enter KB"
                        />

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                          KB
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setUseCustom(true)}
                        disabled={!isValidTarget}
                        className="shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {!isValidTarget && (
                    <p className="mt-3 text-sm font-medium text-rose-600">
                      Please enter a target size between 10 and 10240 KB.
                    </p>
                  )}
                </div>

                {/* Selected target summary */}
                <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-slate-950 p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Selected target
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      {isValidTarget ? `${targetSize} KB` : "Invalid size"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <svg
                      className="h-5 w-5 shrink-0 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>Images are processed in your browser.</span>
                  </div>
                </div>
              </div>

              {/* Existing compression component */}
              <div className="p-4 sm:p-8">
                {isValidTarget ? (
                  <MultiImageCompressor
                    key={`target-${targetSize}`}
                    accepted="image/jpeg,image/png,image/webp"
                    targetSize={targetSize}
                    outputType="image/webp"
                    title={`Compress Images to ${targetSize} KB`}
                  />
                ) : (
                  <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50 p-8 text-center">
                    <p className="font-semibold text-rose-700">
                      Enter a valid target size to continue.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-slate-500">
              Note: The selected KB value is a target, not a guarantee.
              Some images cannot reach the exact size while preserving
              acceptable quality. PNG images may be converted to WebP
              for the output.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
                Why Pixnora
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Simple, fast and flexible
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Get your images ready for forms, websites and everyday
                sharing with a simple compression workflow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 text-2xl transition group-hover:scale-105">
                    {feature.icon}
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Explore more image tools
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose another free tool from Pixnora.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/jpg-compressor"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/50"
              >
                <span>
                  <span className="block font-bold text-slate-900">
                    JPG Compressor
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Reduce JPG image size
                  </span>
                </span>
                <span className="text-xl text-violet-600 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/png-compressor"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/50"
              >
                <span>
                  <span className="block font-bold text-slate-900">
                    PNG Compressor
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Compress PNG images
                  </span>
                </span>
                <span className="text-xl text-violet-600 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/image-resizer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/50"
              >
                <span>
                  <span className="block font-bold text-slate-900">
                    Image Resizer
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Resize image dimensions
                  </span>
                </span>
                <span className="text-xl text-violet-600 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
