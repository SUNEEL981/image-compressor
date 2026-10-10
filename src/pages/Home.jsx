import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const tools = [
    {
      to: "/jpg-compressor",
      label: "JPG",
      title: "JPG Image Compressor",
      description:
        "Compress JPG and JPEG images online and reduce their file size.",
    },
    {
      to: "/png-compressor",
      label: "PNG",
      title: "PNG Image Compressor",
      description:
        "Compress PNG images online and reduce file size for web and sharing.",
    },
    {
      to: "/webp-compressor",
      label: "WEBP",
      title: "WebP Image Compressor",
      description:
        "Compress WebP images while maintaining good visual quality.",
    },
    {
      to: "/jpg-to-webp",
      label: "JPG →",
      title: "JPG to WebP Converter",
      description:
        "Convert JPG and JPEG images to the modern WebP format.",
    },
    {
      to: "/png-to-webp",
      label: "PNG →",
      title: "PNG to WebP Converter",
      description:
        "Convert PNG images to smaller WebP files for faster websites.",
    },
    {
      to: "/image-resizer",
      label: "RESIZE",
      title: "Image Resizer",
      description:
        "Resize images to custom dimensions quickly and easily.",
    },
    {
      to: "/compress-to-kb",
      label: "KB",
      title: "Compress Image to Specific KB",
      description:
        "Reduce an image to a target file size such as 50KB, 100KB or 200KB.",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">

          {/* ================= HERO ================= */}
          <section className="mx-auto max-w-4xl pb-12 pt-12 text-center sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Free Online Image Tools
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-[-2px] text-gray-950 sm:text-5xl lg:text-[64px]">
              Compress Images
              <span className="block text-gray-400">
                Online
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
              Compress JPG, PNG and WebP images online for free.
              Reduce image file size quickly while keeping good image quality.
            </p>

            {/* ================= START BUTTON ================= */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/compress-to-kb"
                className="!inline-flex !min-w-[180px] !items-center !justify-center !rounded-xl !bg-gray-950 !px-6 !py-3.5 !text-sm !font-bold !text-white !no-underline shadow-[0_10px_25px_rgba(17,24,39,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:!bg-gray-800 active:scale-[0.98]"
              >
                <span className="!text-white">
                  Start Compressing
                </span>

                <span className="ml-2 !text-white">
                  →
                </span>
              </Link>
            </div>

            {/* ================= FORMAT BADGES ================= */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-gray-400 sm:text-xs">
              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5">
                JPG
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5">
                PNG
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5">
                WebP
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5">
                Up to 20 MB
              </span>

              <span className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5">
                Browser Based
              </span>
            </div>
          </section>

          {/* ================= TOOLS ================= */}
          <section className="mx-auto max-w-5xl pb-16">

            <div className="mb-6 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Image Tools
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.8px] text-gray-950 sm:text-3xl">
                Everything you need for images
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Compress, convert and resize your images with simple
                browser-based tools.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group !no-underline rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_16px_35px_rgba(0,0,0,0.07)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[9px] font-extrabold tracking-tight text-gray-700">
                      {tool.label}
                    </div>

                    <span className="text-lg text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gray-600">
                      →
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold tracking-[-0.2px] text-gray-950">
                    {tool.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    {tool.description}
                  </p>

                  <div className="mt-5 h-px w-0 bg-gray-900 transition-all duration-300 group-hover:w-10" />
                </Link>
              ))}
            </div>
          </section>

          {/* ================= PRIVACY ================= */}
          <section className="mx-auto mb-10 max-w-5xl rounded-[24px] border border-gray-200 bg-gray-50/70 p-6 sm:p-8">

            <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:items-start">

              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-bold text-gray-900 shadow-sm">
                  ✓
                </div>

                <h2 className="mt-4 text-lg font-bold tracking-[-0.4px] text-gray-950">
                  Free and Privacy-Friendly Image Compression
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-gray-500">
                <p>
                  Pixnora provides free online tools for compressing,
                  converting and resizing images. Image processing happens
                  directly in your browser, so your images do not need to be
                  uploaded to a server.
                </p>

                <p>
                  Choose a tool above to compress JPG, PNG or WebP images,
                  convert JPG or PNG to WebP, resize an image, or compress an
                  image to a specific file size.
                </p>
              </div>

            </div>
          </section>

          {/* ================= POPULAR TOOLS ================= */}
          <section className="mx-auto mb-16 max-w-5xl rounded-[24px] border border-gray-200 bg-white p-6 sm:p-8">

            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Popular Tools
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-[-0.5px] text-gray-950 sm:text-2xl">
                Popular Image Tools
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Quickly access our most useful image compression and
                conversion tools.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {/* JPG */}
              <Link
                to="/jpg-compressor"
                className="group !no-underline rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-xs font-bold text-gray-900">
                  JPG Compressor
                </span>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Need a smaller JPG? Try our{" "}
                  <span className="font-semibold text-gray-800">
                    JPG Image Compressor
                  </span>
                  .
                </p>

                <span className="mt-3 inline-block text-sm font-semibold text-gray-400 transition-transform group-hover:translate-x-1">
                  Open tool →
                </span>
              </Link>

              {/* PNG */}
              <Link
                to="/png-compressor"
                className="group !no-underline rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-xs font-bold text-gray-900">
                  PNG Compressor
                </span>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Working with PNG files? Use the{" "}
                  <span className="font-semibold text-gray-800">
                    PNG Image Compressor
                  </span>
                  .
                </p>

                <span className="mt-3 inline-block text-sm font-semibold text-gray-400 transition-transform group-hover:translate-x-1">
                  Open tool →
                </span>
              </Link>

              {/* WEBP */}
              <Link
                to="/webp-compressor"
                className="group !no-underline rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-xs font-bold text-gray-900">
                  WebP Compressor
                </span>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  For modern web images, try the{" "}
                  <span className="font-semibold text-gray-800">
                    WebP Image Compressor
                  </span>
                  .
                </p>

                <span className="mt-3 inline-block text-sm font-semibold text-gray-400 transition-transform group-hover:translate-x-1">
                  Open tool →
                </span>
              </Link>

              {/* KB */}
              <Link
                to="/compress-to-kb"
                className="group !no-underline rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm"
              >
                <span className="text-xs font-bold text-gray-900">
                  Compress to KB
                </span>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Compress an image to a specific KB size such as 50KB,
                  100KB or 200KB.
                </p>

                <span className="mt-3 inline-block text-sm font-semibold text-gray-400 transition-transform group-hover:translate-x-1">
                  Open tool →
                </span>
              </Link>

            </div>

            <div className="mt-6 border-t border-gray-100 pt-5 text-sm leading-7 text-gray-500">
              You can also{" "}
              <Link
                to="/jpg-to-webp"
                className="font-semibold text-gray-800 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
              >
                convert JPG to WebP
              </Link>
              ,{" "}
              <Link
                to="/png-to-webp"
                className="font-semibold text-gray-800 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
              >
                convert PNG to WebP
              </Link>
              , or{" "}
              <Link
                to="/image-resizer"
                className="font-semibold text-gray-800 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
              >
                resize images
              </Link>
              .
            </div>

          </section>

        </div>
      </main>
    </>
  );
}