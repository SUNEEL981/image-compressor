
import { Link } from "react-router-dom";
import Header from "../components/Header";

const tools = [
  {
    to: "/jpg-compressor",
    label: "JPG",
    title: "JPG Image Compressor",
    description: "Reduce JPG and JPEG file sizes while maintaining visual quality.",
    color: "from-orange-400 to-rose-500",
    icon: "▧",
  },
  {
    to: "/png-compressor",
    label: "PNG",
    title: "PNG Image Compressor",
    description: "Optimize PNG images for websites, documents and sharing.",
    color: "from-sky-400 to-blue-600",
    icon: "◈",
  },
  {
    to: "/webp-compressor",
    label: "WEBP",
    title: "WebP Image Compressor",
    description: "Make your WebP images lighter and easier to share.",
    color: "from-emerald-400 to-teal-600",
    icon: "◉",
  },
  {
    to: "/jpg-to-webp",
    label: "JPG →",
    title: "JPG to WebP Converter",
    description: "Convert JPG images to the modern WebP format.",
    color: "from-violet-400 to-purple-600",
    icon: "⇄",
  },
  {
    to: "/png-to-webp",
    label: "PNG →",
    title: "PNG to WebP Converter",
    description: "Convert PNG files to WebP for web-friendly images.",
    color: "from-fuchsia-400 to-pink-600",
    icon: "⇆",
  },
  {
    to: "/image-resizer",
    label: "RESIZE",
    title: "Image Resizer",
    description: "Resize images to the dimensions you actually need.",
    color: "from-amber-400 to-orange-600",
    icon: "⤢",
  },
  {
    to: "/compress-to-kb",
    label: "KB",
    title: "Compress Image to KB",
    description: "Target sizes such as 50KB, 100KB or 200KB.",
    color: "from-indigo-400 to-blue-600",
    icon: "↓",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-white text-slate-900">
        {/* HERO */}
        <section className="relative isolate overflow-hidden border-b border-violet-100 bg-gradient-to-b from-violet-50 via-white to-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-48 -z-10 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm">
                <SparkleIcon />
                Free Online Image Tools
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Make Images Smaller.
                <span className="mt-2 block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Keep Them Beautiful.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Compress, convert and resize your images with easy online
                tools. Get smaller image files in just a few clicks.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/compress-to-kb"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
                >
                  Start Compressing
                  <ArrowIcon />
                </Link>

                <a
                  href="#image-tools"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 no-underline transition hover:border-violet-200 hover:bg-violet-50"
                >
                  Explore All Tools
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Free to use
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> JPG, PNG & WebP
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Browser-based tools
                </span>
              </div>
            </div>

            {/* VISUAL TOOL PREVIEW */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-200/60 to-blue-100/60 blur-2xl" />

              <div className="relative rounded-3xl border border-white bg-white/90 p-4 shadow-2xl shadow-violet-900/10 backdrop-blur sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Your image toolkit
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Choose a tool to get started
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <SparkleIcon />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 p-6 text-center sm:p-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-8 w-8"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle
                        cx="8.5"
                        cy="8.5"
                        r="1.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="m21 15-5-5L5 21"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-slate-900">
                    Ready to optimize?
                  </h2>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Select a tool below to compress, resize or convert your
                    images.
                  </p>

                  <Link
                    to="/compress-to-kb"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:bg-violet-700"
                  >
                    Open Image Compressor <ArrowIcon />
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { name: "Compress", to: "/jpg-compressor", icon: "↓" },
                    { name: "Resize", to: "/image-resizer", icon: "⤢" },
                    { name: "Convert", to: "/jpg-to-webp", icon: "⇄" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="rounded-xl border border-slate-100 bg-white p-3 text-center no-underline transition hover:border-violet-200 hover:bg-violet-50"
                    >
                      <span className="block text-xl font-bold text-violet-600">
                        {item.icon}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-slate-700">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                  JPG · PNG · WebP · Image resizing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section id="image-tools" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Explore Pixnora
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Everything you need for images
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Simple tools for everyday image tasks, all in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 no-underline shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-900/5"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} text-lg font-extrabold text-white shadow-md`}
                    >
                      {tool.icon}
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-violet-600 group-hover:text-white">
                      <ArrowIcon />
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-900">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {tool.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-600">
                    Open tool
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVACY */}
        <section className="px-5 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                  Simple by design
                </span>
                <h2 className="mt-3 max-w-xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Your image workflow, without the hassle
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Pixnora brings image compression, format conversion and
                  resizing together in one easy-to-use experience. Choose the
                  tool you need and get started in a few clicks.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Easy to use", "Straightforward image tools"],
                  ["02", "Multiple formats", "JPG, PNG and WebP tools"],
                  ["03", "Flexible sizing", "Resize or target file size"],
                  ["04", "Browser-based", "Process images in your browser"],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm"
                  >
                    <span className="text-xs font-extrabold text-violet-600">
                      {number}
                    </span>
                    <h3 className="mt-2 text-sm font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* POPULAR LINKS */}
        <section className="px-5 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              Popular image tools
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Jump directly to the tool you need.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                ["JPG Compressor", "/jpg-compressor"],
                ["PNG Compressor", "/png-compressor"],
                ["WebP Compressor", "/webp-compressor"],
                ["JPG to WebP", "/jpg-to-webp"],
                ["PNG to WebP", "/png-to-webp"],
                ["Image Resizer", "/image-resizer"],
                ["Compress to KB", "/compress-to-kb"],
              ].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 no-underline transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
