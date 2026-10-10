
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { loadImage, formatBytes } from "../utils/imageTools";

const RELATED_TOOLS = [
  { path: "/jpg-compressor", label: "JPG", title: "JPG Compressor", description: "Compress JPG images online." },
  { path: "/png-compressor", label: "PNG", title: "PNG Compressor", description: "Reduce PNG image file size." },
  { path: "/webp-compressor", label: "WEBP", title: "WebP Compressor", description: "Optimize WebP images." },
  { path: "/compress-to-kb", label: "KB", title: "Compress to Specific KB", description: "Choose a target image file size." },
];

const FAQS = [
  { q: "Which image formats are supported?", a: "You can upload JPG, PNG and WebP images. The resized result is downloaded as a JPEG image." },
  { q: "Can I keep the original aspect ratio?", a: "Yes. The aspect-ratio lock is enabled by default. Turn it off to set width and height independently." },
  { q: "Are dimensions measured in pixels?", a: "Yes. Enter your desired width and height in pixels (px)." },
  { q: "Are my images uploaded to a server?", a: "The resizing operation uses your browser's canvas. The image does not need to be uploaded to a Pixnora server." },
  { q: "How do I download my resized image?", a: "After resizing, click the Download Resized Image button to save the result to your device." },
];

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

const primaryButton =
  "!inline-flex !items-center !justify-center !gap-2 !rounded-xl !border-0 !bg-gradient-to-r !from-violet-600 !to-blue-600 !px-6 !py-3 !text-sm !font-extrabold !text-white !opacity-100 [ -webkit-text-fill-color:white ] shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg";

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

    document.title = "Resize Images Online – JPG, PNG & WebP Image Resizer | Pixnora";

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
    canonical.setAttribute("href", "https://pixnora.devs.surf/image-resizer");

    return () => {
      document.title = previousTitle;

      if (createdMeta) meta.remove();
      else if (previousDescription !== null) meta.setAttribute("content", previousDescription);

      if (createdCanonical) canonical.remove();
      else if (previousCanonical !== null) canonical.setAttribute("href", previousCanonical);
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

    try {
      setError("");
      const data = await loadImage(selected);

      if (!data?.width || !data?.height) {
        throw new Error("Could not read image dimensions.");
      }

      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
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
      setError("Use dimensions from 1 to 12,000 px, with no more than 40 megapixels.");
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

      setResult({ blob, url, size: blob.size, width: w, height: h });
    } catch (err) {
      setError(err?.message || "Something went wrong while resizing the image.");
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
              <span className="mt-1 block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                to Any Dimension
              </span>
            </h1>

           

<div className="w-full text-center" style={{ textAlign: "center" }}>
  <p
    className="mx-auto mt-6 w-full max-w-2xl text-center text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
    style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
  >
    Resize JPG, PNG and WebP images to custom width and height.
    Keep the original aspect ratio or set each dimension yourself.
  </p>
</div>


            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["JPG", "PNG", "WebP", "Custom Dimensions"].map((item) => (
                <span key={item} className="rounded-full border border-violet-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-3xl font-bold !text-white shadow-lg shadow-violet-200 transition-transform group-hover:-translate-y-1">
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
                  className="mt-6 inline-flex items-center justify-center rounded-xl border-0 bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-extrabold !text-white opacity-100 shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ WebkitTextFillColor: "#ffffff" }}
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
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-xs font-extrabold !text-white">
                      IMG
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">{file.name}</p>
                      <p className="mt-1 text-xs text-slate-500">Original size: {formatBytes(file.size)}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-xs font-bold !text-violet-700 transition hover:bg-violet-50"
                    style={{ WebkitTextFillColor: "#5b21b6" }}
                  >
                    Change Image
                  </button>

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

                <div className="rounded-[22px] border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-blue-50/70 p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-extrabold !text-white shadow-md shadow-violet-200">1</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Resize Settings</p>
                      <h2 className="mt-1 text-xl font-extrabold text-slate-950 sm:text-2xl">Set image dimensions</h2>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Enter the desired width and height in pixels.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                    <div>
                      <label htmlFor="resize-width" className="mb-2 block text-sm font-bold text-slate-700">Width</label>
                      <div className="flex h-12 overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10">
                        <input
                          id="resize-width"
                          type="number"
                          min="1"
                          max="12000"
                          value={width}
                          onChange={(e) => changeWidth(e.target.value)}
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none"
                        />
                        <span className="flex items-center border-l border-slate-100 px-4 text-xs font-bold text-slate-500">px</span>
                      </div>
                    </div>

                    <div className="hidden h-12 items-center justify-center text-xl text-violet-300 sm:flex">×</div>

                    <div>
                      <label htmlFor="resize-height" className="mb-2 block text-sm font-bold text-slate-700">Height</label>
                      <div className="flex h-12 overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10">
                        <input
                          id="resize-height"
                          type="number"
                          min="1"
                          max="12000"
                          value={height}
                          onChange={(e) => changeHeight(e.target.value)}
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none"
                        />
                        <span className="flex items-center border-l border-slate-100 px-4 text-xs font-bold text-slate-500">px</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 rounded-xl border border-violet-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg text-violet-700">
                        {lock ? "🔒" : "↔"}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Keep aspect ratio</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {lock ? "Width and height stay proportional." : "Width and height can change independently."}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-pressed={lock}
                      onClick={() => setLock((previous) => !previous)}
                      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs font-extrabold opacity-100 transition ${
                        lock
                          ? "border-0 bg-gradient-to-r from-violet-600 to-blue-600 !text-white shadow-md shadow-violet-200"
                          : "border border-slate-200 bg-white !text-slate-700 hover:border-violet-300"
                      }`}
                      style={{ WebkitTextFillColor: lock ? "#ffffff" : "#334155" }}
                    >
                      {lock ? "Ratio Locked" : "Ratio Unlocked"}
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-violet-100 bg-white px-4 py-4">
                    <span className="text-sm font-medium text-slate-600">New dimensions</span>
                    <strong className="text-sm font-extrabold text-violet-700 sm:text-base">
                      {width || 0} × {height || 0} px
                    </strong>
                  </div>

                  {error && (
                    <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={resize}
                    disabled={busy || !width || !height}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border-0 bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 text-sm font-extrabold !text-white opacity-100 shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ WebkitTextFillColor: "#ffffff" }}
                  >
                    {busy ? "Resizing Image..." : "Resize Image"}
                    {!busy && <span aria-hidden="true">→</span>}
                  </button>

                  <button
                    type="button"
                    onClick={resetImage}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold !text-violet-700 transition hover:bg-violet-50"
                    style={{ WebkitTextFillColor: "#5b21b6" }}
                  >
                    Remove Image
                  </button>
                </div>

                {result && (
                  <div className="mt-8">
                    <div className="mb-5">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">Your result</p>
                      <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Image resized successfully</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-800">Original</span>
                          <span className="text-xs text-slate-500">{formatBytes(file.size)}</span>
                        </div>
                        <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3">
                          <img src={preview} alt={`Original ${file.name}`} className="max-h-[260px] max-w-full object-contain" />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/70 to-blue-50/70 p-4">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-violet-800">Resized</span>
                          <span className="text-xs text-slate-600">{formatBytes(result.size)}</span>
                        </div>
                        <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-violet-100 bg-white p-3">
                          <img src={result.url} alt={`Resized ${file.name}`} className="max-h-[260px] max-w-full object-contain" />
                        </div>
                        <p className="mt-3 text-center text-xs text-slate-500">{result.width} × {result.height} pixels</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={download}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-xl border-0 bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 text-sm font-extrabold !text-white opacity-100 shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                      style={{ WebkitTextFillColor: "#ffffff" }}
                    >
                      Download Resized Image ↓
                    </button>
                  </div>
                )}
              </div>
            )}

            {error && !file && (
              <div role="alert" className="mx-3 mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 sm:mx-5">
                {error}
              </div>
            )}
          </section>

          <section className="mx-auto mb-16 w-full max-w-5xl">
            <SectionHeading
              eyebrow="Online image resizer"
              description="Set the dimensions you need and create a resized image in your browser."
            >
              Resize JPG, PNG and WebP Images Online
            </SectionHeading>

            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
                <p>
                  Resize images online by entering your preferred width and height in pixels. Pixnora supports JPG, PNG and WebP images and lets you preserve the original aspect ratio when changing dimensions.
                </p>
                <p>
                  An image resizer can be useful when preparing images for websites, online forms, documents, social media profiles and other platforms that require particular image dimensions.
                </p>
                <p>
                  Upload an image, enter the dimensions and select Resize Image. Preview the result and download it directly to your device.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto mb-16 w-full max-w-5xl">
            <SectionHeading eyebrow="Simple process">How to resize an image</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { number: "01", title: "Upload image", text: "Choose a JPG, PNG or WebP image from your device." },
                { number: "02", title: "Set dimensions", text: "Enter your preferred width and height in pixels." },
                { number: "03", title: "Download", text: "Preview your resized image and save the result." },
              ].map((step) => (
                <article key={step.number} className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/60">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-extrabold !text-white shadow-md shadow-violet-200">{step.number}</span>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto mb-16 w-full max-w-5xl">
            <SectionHeading eyebrow="Common uses">What can you use an image resizer for?</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Website Images", text: "Resize images to suitable dimensions for websites and landing pages." },
                { title: "Online Forms", text: "Prepare images when a form requires specific dimensions." },
                { title: "Social Media", text: "Create images with custom dimensions for social platforms." },
                { title: "Documents", text: "Resize images before adding them to documents and applications." },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-violet-100 bg-white p-5 transition hover:border-violet-200 hover:shadow-md">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto mb-16 w-full max-w-5xl">
            <SectionHeading eyebrow="FAQ">Frequently Asked Questions</SectionHeading>
            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
              {FAQS.map((item) => (
                <details key={item.q} className="group border-b border-slate-100 px-5 py-5 last:border-b-0 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                    {item.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-100 bg-violet-50 text-lg text-violet-700 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mx-auto mb-20 w-full max-w-5xl">
            <SectionHeading eyebrow="Explore more" description="Discover more useful image tools from Pixnora.">
              More Image Tools
            </SectionHeading>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RELATED_TOOLS.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group rounded-2xl border border-violet-100 bg-white p-5 no-underline transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/60">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 px-2 text-[10px] font-extrabold text-violet-700">{tool.label}</span>
                    <span className="text-xl text-violet-400 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-900 group-hover:text-violet-700">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 p-6 text-white shadow-lg shadow-violet-200 sm:p-8">
              <h2 className="text-xl font-extrabold sm:text-2xl">Resize your next image with Pixnora</h2>
              <p className="mt-2 text-sm leading-6 text-violet-100">
                Set custom dimensions, preview the result and download your resized image.
              </p>
              <a
                href="#image-resizer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-white px-5 py-3 text-sm font-extrabold !text-violet-700 no-underline transition hover:bg-violet-50"
                style={{ WebkitTextFillColor: "#5b21b6" }}
              >
                Start Resizing <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
