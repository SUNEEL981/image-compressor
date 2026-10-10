import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import MultiImageCompressor from "../components/MultiImageCompressor";

const TARGET_OPTIONS = [50, 100, 200, 500];

export default function CompressToKb() {
  const [targetSize, setTargetSize] = useState(100);
  const [customSize, setCustomSize] = useState("");

  useEffect(() => {
    document.title =
      "Compress Image to 50KB, 100KB, 200KB & 500KB Online | Pixnora";

    const description =
      "Compress JPG, PNG and WebP images to 50KB, 100KB, 200KB or a custom size online for free with Pixnora.";

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      "https://pixnora.devs.surf/compress-to-kb"
    );
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

      <main className="min-h-screen bg-white text-gray-950">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* HERO */}
          <section className="mx-auto max-w-4xl pb-10 pt-12 text-center sm:pb-12 sm:pt-16 lg:pt-20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Image Size Compressor
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-2px] text-gray-950 sm:text-5xl lg:text-6xl">
              Compress Images
              <span className="block text-gray-400">
                to a Specific KB
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Compress JPG, PNG and WebP images to 50KB, 100KB, 200KB,
              500KB or any custom size. Fast, simple and free.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["JPG", "PNG", "WebP", "Multiple Images"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-gray-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* MAIN TOOL */}
          <section className="mx-auto mb-14 w-full max-w-4xl rounded-[28px] border border-gray-200 bg-white p-2 shadow-[0_20px_70px_rgba(15,23,42,0.07)] sm:p-4 lg:p-5">

            <div className="rounded-[22px] border border-gray-200 bg-gray-50/70 p-5 sm:p-7 lg:p-8">

              {/* TOOL HEADER */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-950 text-xs font-bold text-white">
                      1
                    </span>

                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
                      Compression Target
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-[-0.7px] text-gray-950">
                    Choose target size
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    Set the maximum file size for your compressed image.
                  </p>
                </div>

                <div className="w-fit rounded-full border border-gray-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-gray-500">
                  10 KB – 10 MB
                </div>
              </div>

              {/* PRESET SIZES */}
              <div className="mt-7">
                <p className="mb-3 text-xs font-bold text-gray-500">
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
                        className={`h-12 rounded-xl border px-4 text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
                          isActive
                            ? "border-gray-950 bg-gray-950 text-white shadow-lg shadow-gray-900/10"
                            : "border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-sm"
                        }`}
                      >
                        {size} KB
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CUSTOM SIZE */}
              <div className="mt-7 border-t border-gray-200 pt-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label
                      htmlFor="custom-target"
                      className="text-sm font-bold text-gray-800"
                    >
                      Custom target size
                    </label>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Enter any value between 10 KB and 10 MB.
                    </p>
                  </div>

                  <div className="flex h-12 w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5 sm:w-[230px]">
                    <input
                      id="custom-target"
                      type="number"
                      min="10"
                      max="10240"
                      placeholder="Enter size"
                      value={customSize}
                      onChange={handleCustom}
                      aria-label="Custom target size in KB"
                      className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                    />

                    <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold text-gray-400">
                      KB
                    </span>
                  </div>
                </div>
              </div>

              {/* CURRENT TARGET */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-gray-950" />

                  <span className="text-xs font-semibold text-gray-500">
                    Current target
                  </span>
                </div>

                <strong className="text-base font-extrabold text-gray-950">
                  {selectedTarget} KB
                </strong>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="my-6 flex items-center gap-3 px-2 sm:px-4">
              <div className="h-px flex-1 bg-gray-100" />

              <div className="flex h-8 items-center gap-2 rounded-full border border-gray-200 bg-white px-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-950 text-[9px] font-bold text-white">
                  2
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                  Upload
                </span>
              </div>

              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* COMPRESSOR */}
            <MultiImageCompressor
              accepted="image/jpeg,image/png,image/webp"
              targetSize={selectedTarget}
              outputType="image/webp"
              title="Upload Multiple Images"
            />
          </section>

          {/* SEO INFORMATION */}
          <section className="mx-auto mb-12 w-full max-w-4xl rounded-[24px] border border-gray-200 bg-gray-50/60 p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Compress images to KB
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.7px] text-gray-950 sm:text-3xl">
                Compress Image to 50KB, 100KB, 200KB or 500KB
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-gray-500">
              <p>
                Need to reduce an image below a specific file-size limit?
                Pixnora lets you compress JPG, PNG and WebP images to a
                selected target size. Choose 50KB, 100KB, 200KB or 500KB,
                or enter your own custom size.
              </p>

              <p>
                This tool is useful when an online application, website,
                form or document requires an image below a particular
                file-size limit. You can also process multiple images in
                one session.
              </p>

              <p>
                Select your target size, upload your image and let
                Pixnora reduce the file size while attempting to
                preserve useful image quality.
              </p>
            </div>

            {/* SIZE OPTIONS */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Compress Image to 50KB",
                  text: "Useful when an application or form requires a very small image file.",
                },
                {
                  title: "Compress Image to 100KB",
                  text: "Reduce image size for websites, forms and online applications.",
                },
                {
                  title: "Compress Image to 200KB",
                  text: "A practical target for many online uploads and documents.",
                },
                {
                  title: "Compress Image to 500KB",
                  text: "Reduce larger images while keeping a useful level of quality.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <h3 className="text-sm font-bold text-gray-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW TO USE */}
          <section className="mx-auto mb-12 w-full max-w-4xl">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Simple process
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.6px] text-gray-950 sm:text-3xl">
                How to compress an image to a specific size
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Choose a size",
                  text: "Select 50KB, 100KB, 200KB, 500KB or enter a custom target.",
                },
                {
                  number: "02",
                  title: "Upload images",
                  text: "Upload JPG, PNG or WebP images using the compressor above.",
                },
                {
                  number: "03",
                  title: "Download",
                  text: "Download your compressed images after processing is complete.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <span className="text-[11px] font-extrabold tracking-wider text-gray-400">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-base font-bold text-gray-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto mb-14 w-full max-w-4xl">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                FAQ
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.6px] text-gray-950 sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              {[
                {
                  q: "Can I compress an image to exactly 50KB?",
                  a: "The compressor uses the selected target as the maximum desired file size. The final size can vary depending on the original image and its contents.",
                },
                {
                  q: "Which image formats are supported?",
                  a: "You can upload JPG, PNG and WebP images using this tool.",
                },
                {
                  q: "Can I compress multiple images?",
                  a: "Yes. The page supports multiple image processing in one session.",
                },
                {
                  q: "Can I enter my own target size?",
                  a: "Yes. You can enter a custom target between 10KB and 10MB.",
                },
                {
                  q: "What can I use a 50KB image for?",
                  a: "A 50KB target can be useful for online forms, applications and websites that have strict image-size limits.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group px-5 py-5 sm:px-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-gray-900">
                    {item.q}

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* RELATED TOOLS */}
          <section className="mx-auto mb-20 w-full max-w-4xl">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Explore more
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.6px] text-gray-950 sm:text-3xl">
                Other Image Tools
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  path: "/jpg-compressor",
                  label: "JPG",
                  title: "JPG Image Compressor",
                  description: "Compress JPG and JPEG images online.",
                },
                {
                  path: "/png-compressor",
                  label: "PNG",
                  title: "PNG Image Compressor",
                  description: "Reduce PNG image file size while keeping quality.",
                },
                {
                  path: "/webp-compressor",
                  label: "WEBP",
                  title: "WebP Image Compressor",
                  description: "Compress WebP images for faster websites.",
                },
                {
                  path: "/image-resizer",
                  label: "RESIZE",
                  title: "Image Resizer",
                  description: "Resize images to custom dimensions quickly.",
                },
              ].map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[10px] font-extrabold text-gray-700">
                      {tool.label}
                    </span>

                    <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-gray-950">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
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