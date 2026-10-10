import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import {
  loadImage,
  formatBytes,
} from "../utils/imageTools";

export default function ImageResizer() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [result, setResult] = useState(null);

  /* ================= SEO ================= */

  useEffect(() => {
    const title =
      "Resize Images Online – JPG, PNG & WebP Image Resizer | Pixnora";

    const description =
      "Resize JPG, PNG and WebP images online for free. Set custom width and height while keeping the original aspect ratio.";

    document.title = title;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      "https://pixnora.devs.surf/image-resizer"
    );
  }, []);

  /* ================= FILE SELECT ================= */

  async function selectFile(selected) {
    if (!selected) return;

    const data = await loadImage(selected);

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    setWidth(data.width);
    setHeight(data.height);
    setRatio(data.width / data.height);

    setResult(null);
  }

  /* ================= WIDTH ================= */

  function changeWidth(value) {
    setWidth(value);

    if (lock && value) {
      setHeight(Math.round(Number(value) / ratio));
    }
  }

  /* ================= HEIGHT ================= */

  function changeHeight(value) {
    setHeight(value);

    if (lock && value) {
      setWidth(Math.round(Number(value) * ratio));
    }
  }

  /* ================= RESIZE ================= */

  async function resize() {
    if (!file || !width || !height) return;

    const image = await loadImage(file);

    const canvas = document.createElement("canvas");

    canvas.width = Number(width);
    canvas.height = Number(height);

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image.image,
      0,
      0,
      Number(width),
      Number(height)
    );

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9)
    );

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    setResult({
      blob,
      url,
      size: blob.size,
    });
  }

  /* ================= DOWNLOAD ================= */

  function download() {
    if (!result) return;

    const a = document.createElement("a");

    a.href = result.url;
    a.download = "resized-image.jpg";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ================= RESET ================= */

  function resetImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setFile(null);
    setPreview("");
    setWidth("");
    setHeight("");
    setRatio(1);
    setResult(null);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-gray-950">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* ================= HERO ================= */}

          <section className="mx-auto max-w-4xl pb-10 pt-12 text-center sm:pb-12 sm:pt-16 lg:pt-20">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-950" />
              Free Image Resizer
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-2px] text-gray-950 sm:text-5xl lg:text-6xl">
              Resize Images Online
              <span className="block text-gray-400">
                to Any Dimension
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Resize JPG, PNG and WebP images to custom width and
              height while keeping the original aspect ratio.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {[
                "JPG",
                "PNG",
                "WebP",
                "Custom Dimensions",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-gray-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* ================= MAIN TOOL ================= */}

          <section className="mx-auto mb-14 w-full max-w-4xl rounded-[28px] border border-gray-200 bg-white p-2 shadow-[0_20px_70px_rgba(15,23,42,0.07)] sm:p-4 lg:p-5">

            {!file ? (

              /* ================= UPLOAD ================= */

              <div
                className="group flex min-h-[380px] cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-gray-200 bg-gray-50/50 px-5 text-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                onClick={() => inputRef.current?.click()}
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white text-2xl font-light text-gray-700 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
                  ↑
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-[-0.5px] text-gray-950">
                  Upload an image
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Choose a JPG, PNG or WebP image to resize
                  to your preferred dimensions.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98]"
                >
                  Choose Image
                </button>

                <p className="mt-4 text-[11px] text-gray-400">
                  Your image is processed directly in your browser.
                </p>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) =>
                    selectFile(e.target.files?.[0])
                  }
                />
              </div>

            ) : (

              /* ================= IMAGE SELECTED ================= */

              <>
                {/* FILE HEADER */}

                <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-gray-700 shadow-sm">
                      IMG
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Original size: {formatBytes(file.size)}
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={resetImage}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-900"
                  >
                    Change Image
                  </button>
                </div>

                {/* SETTINGS */}

                <div className="rounded-[22px] border border-gray-200 bg-gray-50/70 p-5 sm:p-7 lg:p-8">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-950 text-xs font-bold text-white">
                          1
                        </span>

                        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
                          Resize Settings
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold tracking-[-0.7px] text-gray-950">
                        Set image dimensions
                      </h2>

                      <p className="mt-1.5 text-sm leading-6 text-gray-500">
                        Enter your desired width and height in pixels.
                      </p>

                    </div>

                    <div className="w-fit rounded-full border border-gray-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-gray-500">
                      Pixels (px)
                    </div>

                  </div>

                  {/* DIMENSIONS */}

                  <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">

                    <div>
                      <label
                        htmlFor="resize-width"
                        className="mb-2 block text-xs font-semibold text-gray-600"
                      >
                        Width
                      </label>

                      <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5">

                        <input
                          id="resize-width"
                          type="number"
                          min="1"
                          placeholder="Width"
                          value={width}
                          onChange={(e) =>
                            changeWidth(e.target.value)
                          }
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                        />

                        <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold text-gray-400">
                          px
                        </span>

                      </div>
                    </div>

                    <div className="hidden h-12 items-center justify-center text-lg font-medium text-gray-300 sm:flex">
                      ×
                    </div>

                    <div>
                      <label
                        htmlFor="resize-height"
                        className="mb-2 block text-xs font-semibold text-gray-600"
                      >
                        Height
                      </label>

                      <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5">

                        <input
                          id="resize-height"
                          type="number"
                          min="1"
                          placeholder="Height"
                          value={height}
                          onChange={(e) =>
                            changeHeight(e.target.value)
                          }
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                        />

                        <span className="flex items-center border-l border-gray-100 px-4 text-xs font-bold text-gray-400">
                          px
                        </span>

                      </div>
                    </div>

                  </div>

                  {/* ASPECT RATIO */}

                  <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                        {lock ? "ON" : "OFF"}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-800">
                          Keep aspect ratio
                        </p>

                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {lock
                            ? "Width and height stay proportional."
                            : "Width and height can change independently."}
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() => setLock(!lock)}
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                        lock
                          ? "bg-gray-950 text-white"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {lock ? "Locked" : "Unlocked"}
                    </button>

                  </div>

                  {/* CURRENT DIMENSIONS */}

                  <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5">

                    <span className="text-xs font-medium text-gray-500">
                      New dimensions
                    </span>

                    <strong className="text-sm font-extrabold text-gray-950">
                      {width} × {height} px
                    </strong>

                  </div>

                  {/* RESIZE BUTTON */}

                  <button
                    type="button"
                    onClick={resize}
                    disabled={!width || !height}
                    className="mt-5 w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Resize Image
                  </button>

                </div>

                {/* RESULT */}

                {result && (
                  <div className="mt-6">

                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-100" />

                      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                        Result
                      </span>

                      <div className="h-px flex-1 bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* ORIGINAL */}

                      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">

                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700">
                            Original
                          </span>

                          <span className="text-[11px] font-medium text-gray-400">
                            {formatBytes(file.size)}
                          </span>
                        </div>

                        <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3">

                          <img
                            src={preview}
                            alt={`Original ${file.name}`}
                            className="max-h-[220px] max-w-full object-contain"
                          />

                        </div>
                      </div>

                      {/* RESIZED */}

                      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">

                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700">
                            Resized
                          </span>

                          <span className="text-[11px] font-medium text-gray-400">
                            {formatBytes(result.size)}
                          </span>
                        </div>

                        <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3">

                          <img
                            src={result.url}
                            alt={`Resized ${file.name}`}
                            className="max-h-[220px] max-w-full object-contain"
                          />

                        </div>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={download}
                      className="mt-5 w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.99]"
                    >
                      Download Resized Image
                    </button>

                  </div>
                )}

              </>
            )}
          </section>

          {/* ================= SEO CONTENT ================= */}

          <section className="mx-auto mb-12 w-full max-w-4xl rounded-[24px] border border-gray-200 bg-gray-50/60 p-6 sm:p-8">

            <div className="mb-6">

              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Online image resizer
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.7px] text-gray-950 sm:text-3xl">
                Resize JPG, PNG and WebP Images Online
              </h2>

            </div>

            <div className="space-y-5 text-sm leading-7 text-gray-500">

              <p>
                Resize images online by entering your preferred width
                and height in pixels. Pixnora supports JPG, PNG and
                WebP images and lets you keep the original aspect ratio
                when changing dimensions.
              </p>

              <p>
                An image resizer can be useful when preparing images
                for websites, online forms, documents, social media
                profiles and other platforms that require specific
                image dimensions.
              </p>

              <p>
                Upload an image, enter the desired dimensions and click
                Resize Image. The resized image can then be downloaded
                directly to your device.
              </p>

            </div>

          </section>

          {/* ================= HOW TO ================= */}

          <section className="mx-auto mb-12 w-full max-w-4xl">

            <div className="mb-6">

              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Simple process
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.6px] text-gray-950 sm:text-3xl">
                How to resize an image
              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              {[
                {
                  number: "01",
                  title: "Upload image",
                  text: "Choose a JPG, PNG or WebP image from your device.",
                },
                {
                  number: "02",
                  title: "Set dimensions",
                  text: "Enter your preferred width and height in pixels.",
                },
                {
                  number: "03",
                  title: "Download",
                  text: "Resize the image and download the result instantly.",
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

          {/* ================= USE CASES ================= */}

          <section className="mx-auto mb-12 w-full max-w-4xl">

            <div className="mb-6">

              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Common uses
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.6px] text-gray-950 sm:text-3xl">
                What can you use an image resizer for?
              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {[
                {
                  title: "Website Images",
                  text: "Resize images to suitable dimensions for websites and landing pages.",
                },
                {
                  title: "Online Forms",
                  text: "Prepare images when a form requires specific dimensions.",
                },
                {
                  title: "Social Media",
                  text: "Create images with custom dimensions for social platforms.",
                },
                {
                  title: "Documents",
                  text: "Resize images before adding them to documents and applications.",
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

          {/* ================= FAQ ================= */}

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
                  q: "Can I resize JPG, PNG and WebP images?",
                  a: "Yes. This image resizer accepts JPG, PNG and WebP images.",
                },
                {
                  q: "Can I keep the original aspect ratio?",
                  a: "Yes. The aspect-ratio lock is enabled by default. You can unlock it if you want to set width and height independently.",
                },
                {
                  q: "What units are used for image dimensions?",
                  a: "Image dimensions are entered in pixels (px).",
                },
                {
                  q: "Is the image processed in my browser?",
                  a: "Yes. The page processes the selected image directly in your browser.",
                },
                {
                  q: "Can I download the resized image?",
                  a: "Yes. After resizing, use the Download Resized Image button to save the result.",
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

          {/* ================= RELATED TOOLS ================= */}

          <section className="mx-auto mb-20 w-full max-w-4xl">

            <div className="mb-6">

              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Explore more
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.6px] text-gray-950 sm:text-3xl">
                More Image Tools
              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {[
                {
                  path: "/jpg-compressor",
                  label: "JPG",
                  title: "JPG Image Compressor",
                  description:
                    "Reduce JPG and JPEG image file size online.",
                },
                {
                  path: "/png-compressor",
                  label: "PNG",
                  title: "PNG Image Compressor",
                  description:
                    "Compress PNG images while keeping useful quality.",
                },
                {
                  path: "/webp-compressor",
                  label: "WEBP",
                  title: "WebP Image Compressor",
                  description:
                    "Reduce WebP image file size for faster websites.",
                },
                {
                  path: "/compress-to-kb",
                  label: "KB",
                  title: "Compress Image to Specific KB",
                  description:
                    "Target a specific image file size such as 50KB or 100KB.",
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