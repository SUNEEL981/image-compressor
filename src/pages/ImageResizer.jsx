
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
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50";

function SectionHeading({ eyebrow, children, description }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">
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

export default function ImageResizer() {
  const inputRef = useRef(null);
  const previewRef = useRef("");
  const resultRef = useRef("");

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
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
      if (resultRef.current) {
        URL.revokeObjectURL(resultRef.current);
      }
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

      <main className="relative min-h-screen w-full overflow-x-clip bg-gradient-to-b from-violet-50/70 via-white to-blue-50/50 text-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(90%,900px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-200/40 via-blue-100/40 to-purple-200/40 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-4xl pb-10 pt-12 text-center sm:pb-14 sm:pt-16 lg:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
              Free Image Resizer
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Resize Images Online
              <span className="mt-1 block text-violet-700">
                to Any Dimension
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Resize JPG, PNG and WebP images to custom width and height.
              Keep the original aspect ratio or set each dimension yourself.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["JPG", "PNG", "WebP", "Custom Dimensions"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-violet-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section
            id="image-resizer"
            className="mx-auto mb-16 w-full max-w-5xl scroll-mt-24 rounded-[28px] border border-violet-100 bg-white p-2 shadow-[0_24px_80px_rgba(91,33,182,0.10)] sm:p-4 lg:p-6"
          >
            {!file ? (
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  selectFile(e.dataTransfer.files?.[0]);
                }}
                className="group flex min-h-[340px] cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-blue-50/80 px-5 py-10 text-center transition hover:border-violet-400 sm:min-h-[390px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-3xl font-bold text-white shadow-lg shadow-violet-200 transition-transform group-hover:-translate-y-1">
                  ↑
                </div>

                <h2 className="mt-6 text-2xl font-extrabold text-slate-950">
                  Upload an image
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                  Choose or drag a JPG, PNG or WebP image to resize it.
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  className={`${primaryButton} mt-6`}
                >
                  Choose Image
                </button>

                <p className="mt-4 text-xs text-slate-500">
                  Your image is processed in your browser.
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
              <div className="p-3 sm:p-5">
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50/70 to-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-all text-sm font-bold text-slate-800">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Original size: {formatBytes(file.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetImage}
                    className="shrink-0 rounded-lg border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                  >
                    Remove Image
                  </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="mb-4 text-sm font-bold text-slate-700">
                      Original Image
                    </p>
                    <img
                      src={preview}
                      alt="Original image preview"
                      className="max-h-[340px] max-w-full rounded-xl object-contain"
                    />
                    <p className="mt-4 text-xs text-slate-500">
                      {file.name}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-white p-5">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      Resize Settings
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Enter the dimensions you want for your image.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-slate-700">
                          Width (px)
                        </span>
                        <input
                          type="number"
                          min="1"
                          max="12000"
                          value={width}
                          onChange={(e) => changeWidth(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-slate-700">
                          Height (px)
                        </span>
                        <input
                          type="number"
                          min="1"
                          max="12000"
                          value={height}
                          onChange={(e) => changeHeight(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                      </label>
                    </div>

                    <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                      <input
                        type="checkbox"
                        checked={lock}
                        onChange={(e) => {
                          setLock(e.target.checked);
                          clearResult();
                        }}
                        className="h-4 w-4 accent-violet-600"
                      />
                      <span>
                        <span className="block text-sm font-bold text-slate-800">
                          Lock aspect ratio
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          Automatically adjust the other dimension.
                        </span>
                      </span>
                    </label>

                    <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
                      Maximum dimensions: 12,000 × 12,000 px, up to 40
                      megapixels.
                    </p>

                    <button
                      type="button"
                      onClick={resize}
                      disabled={busy}
                      className={`${primaryButton} mt-5 w-full`}
                    >
                      {busy ? "Resizing Image..." : "Resize Image"}
                    </button>

                    {error && (
                      <p
                        role="alert"
                        className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                {result && (
                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-extrabold text-emerald-900">
                          Image resized successfully!
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {result.width} × {result.height} px ·{" "}
                          {formatBytes(result.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={download}
                        className={primaryButton}
                      >
                        Download Resized Image
                      </button>
                    </div>

                    <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-xl border border-emerald-100 bg-white p-4">
                      <img
                        src={result.url}
                        alt="Resized image preview"
                        className="max-h-[360px] max-w-full rounded-lg object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="mx-auto max-w-5xl pb-14">
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
                  description: "Choose a JPG, PNG or WebP image from your device.",
                },
                {
                  number: "02",
                  title: "Set Dimensions",
                  description: "Enter the required width and height in pixels.",
                },
                {
                  number: "03",
                  title: "Download Result",
                  description: "Resize your image and save the JPEG result.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/70"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 font-extrabold text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-5xl pb-14">
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
                  className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/70"
                >
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 px-3 text-sm font-extrabold text-white">
                    {tool.label}
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900 transition group-hover:text-violet-700">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-bold text-violet-700">
                    Try tool →
                  </span>
                </Link>
              ))}
            </div>
          </section>

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
                  className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none pr-6 font-bold text-slate-800 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.q}
                      <span className="text-xl text-violet-600 transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
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
