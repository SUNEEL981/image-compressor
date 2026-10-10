
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MultiImageCompressor from "../components/MultiImageCompressor";

const TARGET_OPTIONS = [50, 100, 200, 500];

const RELATED_TOOLS = [
  { path: "/jpg-compressor", label: "JPG", title: "JPG Image Compressor", description: "Compress JPG and JPEG images online." },
  { path: "/png-compressor", label: "PNG", title: "PNG Image Compressor", description: "Reduce PNG image file size." },
  { path: "/webp-compressor", label: "WEBP", title: "WebP Image Compressor", description: "Compress WebP images for faster websites." },
  { path: "/image-resizer", label: "RESIZE", title: "Image Resizer", description: "Resize images to custom dimensions." },
];

const FAQS = [
  { q: "Can I compress an image to exactly 50KB?", a: "The compressor uses your selected target as the desired maximum file size. The final size can vary depending on the original image and its contents." },
  { q: "Which image formats are supported?", a: "You can upload JPG, PNG and WebP images using this tool." },
  { q: "Can I compress multiple images?", a: "Yes. You can process multiple images in one session using the compressor above." },
  { q: "Can I enter my own target size?", a: "Yes. Enter a custom target between 10KB and 10MB." },
  { q: "What can I use a 50KB image for?", a: "A 50KB target can be useful for online forms, applications and websites that have strict image-size limits." },
];

function SectionHeading({ eyebrow, children, description }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
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

function FeatureBadge({ children }) {
  return (
    <span className="rounded-full border border-violet-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
      {children}
    </span>
  );
}

export default function CompressToKb() {
  const [targetSize, setTargetSize] = useState(100);
  const [customSize, setCustomSize] = useState("");

  useEffect(() => {
    document.title =
      "Compress Image to 50KB, 100KB, 200KB & 500KB Online | Pixnora";

    const description =
      "Compress JPG, PNG and WebP images to 50KB, 100KB, 200KB or a custom size online for free with Pixnora.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://pixnora.devs.surf/compress-to-kb";
  }, []);

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

      <main className="pixnora-kb-tool relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50/70 via-white to-blue-50/40 text-slate-900">
        <style>{`
          .pixnora-kb-tool button {
            opacity: 1 !important;
          }

          .pixnora-kb-tool button:disabled {
            opacity: 0.65 !important;
          }

          .pixnora-kb-tool .kb-cta-title,
          .pixnora-kb-tool .kb-cta-description {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
          }

          .pixnora-kb-tool .kb-cta-link {
            color: #6d28d9 !important;
            -webkit-text-fill-color: #6d28d9 !important;
            background: #ffffff !important;
            opacity: 1 !important;
          }

          .pixnora-kb-tool .kb-preset {
            opacity: 1 !important;
            -webkit-text-fill-color: currentColor;
          }

          .pixnora-kb-tool .kb-preset-active {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
          }

          .pixnora-kb-tool .kb-preset-inactive {
            color: #334155 !important;
            -webkit-text-fill-color: #334155 !important;
          }

          .pixnora-kb-tool button:focus-visible,
          .pixnora-kb-tool a:focus-visible {
            outline: 3px solid #8b5cf6;
            outline-offset: 3px;
          }
        `}</style>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-24 mx-auto h-72 max-w-5xl rounded-full bg-gradient-to-r from-violet-200/30 via-blue-100/40 to-purple-200/30 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HERO */}
          <section className="mx-auto max-w-4xl pb-10 pt-12 text-center sm:pb-14 sm:pt-16 lg:pt-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
              Smart Image Optimization
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Compress Images
              <span className="mt-1 block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                to a Specific KB
              </span>
            </h1>

           
<div className="w-full flex justify-center">
  <p className="mx-auto mt-6 w-full max-w-2xl text-center text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
    Compress JPG, PNG and WebP images to 50KB, 100KB, 200KB,
    500KB or your own custom size. A simple image compression
    tool from Pixnora.
  </p>
</div>


            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["JPG", "PNG", "WebP", "Multiple Images", "Custom Size"].map(
                (item) => <FeatureBadge key={item}>{item}</FeatureBadge>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span>✓ Simple to use</span>
              <span>✓ Privacy-conscious processing</span>
            </div>
          </section>

          {/* MAIN TOOL */}
          <section
            id="compressor"
            className="mx-auto mb-16 w-full max-w-4xl scroll-mt-24 rounded-[28px] border border-violet-100 bg-white/90 p-2 shadow-[0_24px_80px_rgba(91,33,182,0.10)] sm:p-4 lg:p-5"
          >
            <div className="rounded-[22px] border border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-blue-50/70 p-5 sm:p-7 lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-extrabold text-white">
                      1
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-violet-700">
                      Compression Target
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                    Choose target size
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Set the desired maximum file size for your image.
                  </p>
                </div>

                <span className="w-fit rounded-full border border-violet-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600">
                  10 KB – 10 MB
                </span>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-xs font-bold text-slate-600">
                  Popular sizes
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {TARGET_OPTIONS.map((size) => {
                    const isActive = !customSize && targetSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handlePreset(size)}
                        aria-pressed={isActive}
                        className={`kb-preset ${
                          isActive
                            ? "kb-preset-active border-violet-600 bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-200"
                            : "kb-preset-inactive border-slate-200 bg-white hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50"
                        } group relative min-h-16 rounded-2xl border px-3 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98]`}
                      >
                        <span className="block text-xl font-extrabold">
                          {size}
                        </span>
                        <span
                          className={`mt-0.5 block text-xs ${
                            isActive ? "text-violet-100" : "text-slate-500"
                          }`}
                        >
                          KB target
                        </span>
                        {isActive && (
                          <span className="absolute right-2 top-2 text-xs text-white">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 border-t border-violet-100 pt-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label
                      htmlFor="custom-target"
                      className="text-sm font-bold text-slate-800"
                    >
                      Custom target size
                    </label>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Enter any value between 10 KB and 10 MB.
                    </p>
                  </div>

                  <div className="flex h-12 w-full overflow-hidden rounded-xl border border-slate-200 bg-white sm:w-[230px]">
                    <input
                      id="custom-target"
                      type="number"
                      min="10"
                      max="10240"
                      step="1"
                      placeholder="Enter size"
                      value={customSize}
                      onChange={handleCustom}
                      aria-label="Custom target size in KB"
                      className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                    />
                    <span className="flex items-center border-l border-slate-100 px-4 text-xs font-bold text-slate-500">
                      KB
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-violet-100 bg-white px-4 py-4 shadow-sm">
                <span className="text-sm font-semibold text-slate-600">
                  Current target
                </span>
                <strong className="text-lg font-extrabold text-violet-700">
                  {selectedTarget} KB
                </strong>
              </div>
            </div>

            <div className="my-6 flex items-center gap-3 px-3 sm:px-5">
              <div className="h-px flex-1 bg-violet-100" />
              <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-xs font-bold text-white">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Upload Images
                </span>
              </div>
              <div className="h-px flex-1 bg-violet-100" />
            </div>

            <div className="px-1 pb-2 sm:px-3">
              <MultiImageCompressor
                accepted="image/jpeg,image/png,image/webp"
                targetSize={selectedTarget}
                outputType="image/webp"
                title="Upload Multiple Images"
              />
            </div>
          </section>

          {/* SEO INFORMATION */}
          <section className="mx-auto mb-16 w-full max-w-4xl">
            <SectionHeading
              eyebrow="Compress images to KB"
              description="Choose a target size that fits your upload requirements."
            >
              Compress Image to 50KB, 100KB, 200KB or 500KB
            </SectionHeading>

            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
                <p>
                  Need to reduce an image below a specific file-size limit?
                  Pixnora lets you choose a target size for your image. Select
                  50KB, 100KB, 200KB or 500KB, or enter your own custom size
                  using the controls above.
                </p>
                <p>
                  This tool can be useful when an online application, website,
                  form or document requires an image below a particular
                  file-size limit. You can also process multiple images in one
                  session.
                </p>
                <p>
                  Select your target size, upload your image and let Pixnora
                  reduce the file size while attempting to preserve useful
                  image quality. Actual results depend on the source image and
                  the compression process.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Compress Image to 50KB", text: "Useful when an application or form requires a very small image file." },
                  { title: "Compress Image to 100KB", text: "Reduce image size for websites, forms and online applications." },
                  { title: "Compress Image to 200KB", text: "A practical target for many online uploads and documents." },
                  { title: "Compress Image to 500KB", text: "Reduce larger images while keeping a useful level of quality." },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-br from-violet-50/70 to-blue-50/50 p-5 hover:border-violet-200"
                  >
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* HOW TO USE */}
          <section className="mx-auto mb-16 w-full max-w-4xl">
            <SectionHeading
              eyebrow="Simple process"
              description="Three simple steps to prepare your image for an upload."
            >
              How to compress an image to a specific size
            </SectionHeading>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { number: "01", title: "Choose a size", text: "Select 50KB, 100KB, 200KB, 500KB or enter a custom target." },
                { number: "02", title: "Upload images", text: "Upload JPG, PNG or WebP images using the compressor above." },
                { number: "03", title: "Download", text: "Download your compressed images after processing is complete." },
              ].map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-extrabold text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto mb-16 w-full max-w-4xl">
            <SectionHeading
              eyebrow="FAQ"
              description="Answers to common questions about image compression."
            >
              Frequently Asked Questions
            </SectionHeading>

            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
              {FAQS.map((item) => (
                <details
                  key={item.q}
                  className="group border-b border-slate-100 px-5 py-5 last:border-b-0 sm:px-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    {item.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-100 bg-violet-50 text-lg font-medium text-violet-700 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl pr-8 text-sm leading-7 text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* RELATED TOOLS */}
          <section className="mx-auto mb-20 w-full max-w-4xl">
            <SectionHeading
              eyebrow="Explore more"
              description="Discover more image tools from Pixnora."
            >
              Other Image Tools
            </SectionHeading>

            <div className="grid gap-4 sm:grid-cols-2">
              {RELATED_TOOLS.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group rounded-2xl border border-violet-100 bg-white p-5 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 px-2 text-[10px] font-extrabold tracking-wide text-violet-700">
                      {tool.label}
                    </span>
                    <span className="text-xl text-violet-400">→</span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-900 group-hover:text-violet-700">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>

            {/* FIXED CTA */}
            <div className="mt-8 w-full overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 p-6 text-center shadow-lg shadow-violet-200 sm:p-8">
              <h2 className="kb-cta-title text-xl font-extrabold sm:text-2xl">
                Ready to optimize your images?
              </h2>

              <p className="kb-cta-description mx-auto mt-2 max-w-xl text-sm leading-6 sm:text-base">
                Choose your target file size and get started with Pixnora&apos;s
                image compression tool.
              </p>

              <a
                href="#compressor"
                className="kb-cta-link mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:bg-violet-50"
              >
                Start Compressing <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
