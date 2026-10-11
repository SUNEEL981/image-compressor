
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const features = [
  {
    number: "01",
    title: "Our Mission",
    description:
      "To make image compression, conversion, and resizing accessible through simple tools that are easy to understand and use.",
    icon: "target",
  },
  {
    number: "02",
    title: "Privacy Conscious",
    description:
      "Our tools support browser-based image processing wherever implemented, helping reduce the need to upload images to a server.",
    icon: "shield",
  },
  {
    number: "03",
    title: "Built for Everyone",
    description:
      "Whether you are a student, creator, developer, or website owner, Pixnora aims to make everyday image tasks more convenient.",
    icon: "users",
  },
];

const tools = [
  {
    title: "JPG Compressor",
    description: "Reduce JPG image file size",
    path: "/jpg-compressor",
    tag: "COMPRESS",
  },
  {
    title: "PNG Compressor",
    description: "Optimize PNG images",
    path: "/png-compressor",
    tag: "COMPRESS",
  },
  {
    title: "WebP Compressor",
    description: "Compress WebP images",
    path: "/webp-compressor",
    tag: "COMPRESS",
  },
  {
    title: "Image Resizer",
    description: "Adjust image dimensions",
    path: "/image-resizer",
    tag: "RESIZE",
  },
  {
    title: "JPG to WebP",
    description: "Convert JPG images to WebP",
    path: "/jpg-to-webp",
    tag: "CONVERT",
  },
  {
    title: "Compress to KB",
    description: "Target a specific file size",
    path: "/compress-to-kb",
    tag: "CUSTOM SIZE",
  },
];

function FeatureIcon({ type }) {
  const common = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6",
  };

  if (type === "target") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
        <path d="m16.5 7.5 4-4m-3 0h3v3" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 15a5 5 0 0 1 3.5 4.8" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function About() {
  useEffect(() => {
    const previousTitle = document.title;

    const descriptionText =
      "Learn about Pixnora, an online platform for image compression, conversion, and resizing tools designed to make image optimization simple.";

    let descriptionMeta = document.querySelector(
      'meta[name="description"]'
    );
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    );

    const previousDescription = descriptionMeta?.getAttribute("content");
    const previousCanonical = canonicalLink?.getAttribute("href");

    let createdDescription = false;
    let createdCanonical = false;

    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
      createdDescription = true;
    }

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
      createdCanonical = true;
    }

    document.title = "About Us | Pixnora";

    descriptionMeta.setAttribute("content", descriptionText);
    canonicalLink.setAttribute(
      "href",
      "https://pixnora.devs.surf/about"
    );

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        descriptionMeta?.remove();
      } else if (previousDescription !== null) {
        descriptionMeta?.setAttribute("content", previousDescription);
      }

      if (createdCanonical) {
        canonicalLink?.remove();
      } else if (previousCanonical !== null) {
        canonicalLink?.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#f8f9ff]">
      <Header />

      <main className="relative isolate w-full overflow-hidden pb-14 sm:pb-20">
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br from-violet-100 via-white to-blue-100"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-44 -z-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl"
        />

        <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-[0_20px_70px_rgba(76,29,149,0.08)] backdrop-blur-sm sm:rounded-[2rem]">
            <div className="grid min-w-0 items-center gap-8 p-5 sm:p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-14">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-extrabold tracking-wide text-violet-700 sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
                  ABOUT PIXNORA
                </span>

                <h1 className="mt-5 break-words text-3xl font-extrabold leading-tight tracking-tight !text-slate-950 sm:mt-6 sm:text-5xl lg:text-6xl">
                  Image tools,
                  <span className="mt-1 block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    simplified.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                  Pixnora is an online image optimization platform designed
                  to make compression, conversion, and resizing simpler.
                  Whether you are preparing images for a website, a project,
                  or everyday use, we aim to make the process straightforward.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/jpg-compressor"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-violet-200/70 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-200"
                  >
                    Explore Image Tools
                    <ArrowIcon />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 no-underline transition duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-slate-500 sm:text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Simple workflow
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Multiple image tools
                  </span>
                </div>
              </div>

              {/* Visual card */}
              <div className="relative mx-auto w-full max-w-md min-w-0 lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-200/70 to-blue-200/70 blur-2xl"
                />

                <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-violet-700 via-purple-700 to-blue-700 p-5 text-white shadow-2xl shadow-violet-200/60 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-violet-200">
                        WELCOME TO
                      </p>
                      <p className="mt-1 text-xl font-extrabold sm:text-2xl">
                        Pixnora
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                      <ImageIcon />
                    </div>
                  </div>

                  <div className="my-7 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700">
                        <ImageIcon />
                      </div>
                      <div className="min-w-0">
                        <p className="break-words text-sm font-bold text-white sm:text-base">
                          Image optimization
                        </p>
                        <p className="mt-1 text-xs leading-5 text-violet-100 sm:text-sm">
                          Compress · Convert · Resize
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {["JPG", "PNG", "WebP"].map((format) => (
                        <div
                          key={format}
                          className="rounded-xl border border-white/15 bg-white/10 px-2 py-3 text-center"
                        >
                          <span className="text-xs font-extrabold text-white sm:text-sm">
                            {format}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-violet-100">
                    Useful image tools, brought together in one convenient
                    place.
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-white/15 pt-4 text-xs font-semibold text-white/90">
                    <ShieldIcon />
                    Designed with simplicity in mind
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission and values */}
          <section className="mt-14 sm:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-600 sm:text-xs">
                What matters to us
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight !text-slate-950 sm:text-3xl lg:text-4xl">
                Built around your needs
              </h2>

              <p className="mt-3 text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                We focus on keeping everyday image tasks clear, practical,
                and convenient.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 sm:rounded-3xl sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md shadow-violet-200 transition duration-300 group-hover:scale-105">
                      <FeatureIcon type={feature.icon} />
                    </div>

                    <span className="text-xs font-extrabold tracking-widest text-slate-300">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-5 break-words text-lg font-extrabold !text-slate-950 sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Why Pixnora */}
          <section className="mt-8 overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 sm:mt-10 sm:rounded-[2rem]">
            <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10 lg:p-10">
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-600 sm:text-xs">
                  Why Pixnora?
                </span>

                <h2 className="mt-3 text-2xl font-extrabold tracking-tight !text-slate-950 sm:text-3xl">
                  Less complexity. More convenience.
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                  We believe useful image tools should be easy to understand.
                  Pixnora brings essential image optimization features together
                  so you can choose a tool that fits your task without an
                  unnecessarily complicated workflow.
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200 sm:h-20 sm:w-20">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
                </svg>
              </div>
            </div>
          </section>

          {/* Explore tools */}
          <section className="mt-14 sm:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-600 sm:text-xs">
                Explore our platform
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight !text-slate-950 sm:text-3xl lg:text-4xl">
                Find the right image tool
              </h2>

              <p className="mt-3 text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                Choose a tool based on the image task you want to complete.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-xs font-extrabold text-violet-700 transition-colors group-hover:from-violet-600 group-hover:to-blue-600 group-hover:text-white">
                    {tool.tag === "CUSTOM SIZE" ? "KB" : <ImageIcon />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-extrabold !text-slate-950 sm:text-base">
                      {tool.title}
                    </h3>
                    <p className="mt-1 break-words text-xs leading-5 !text-slate-500 sm:text-sm">
                      {tool.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-slate-400 transition duration-200 group-hover:translate-x-1 group-hover:text-violet-600">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="mt-12 sm:mt-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 p-6 shadow-xl shadow-violet-200/60 sm:rounded-[2rem] sm:p-9 lg:p-11">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border-[26px] border-white/10 sm:h-64 sm:w-64"
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="min-w-0 max-w-2xl">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-200 sm:text-xs">
                    Let’s connect
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                    Have a question or suggestion?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-violet-100 sm:text-base sm:leading-8">
                    We welcome your feedback. Visit our Contact page to get
                    in touch with Pixnora.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-violet-700 no-underline shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-violet-50 focus:outline-none focus:ring-4 focus:ring-white/40 sm:self-center"
                >
                  Contact Us
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-9 text-center sm:pt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 sm:text-sm">
              <Link
                to="/privacy-policy"
                className="text-slate-500 no-underline transition hover:text-violet-700"
              >
                Privacy Policy
              </Link>

              <span aria-hidden="true" className="text-slate-300">
                •
              </span>

              <Link
                to="/terms"
                className="text-slate-500 no-underline transition hover:text-violet-700"
              >
                Terms of Service
              </Link>

              <span aria-hidden="true" className="text-slate-300">
                •
              </span>

              <Link
                to="/contact"
                className="text-slate-500 no-underline transition hover:text-violet-700"
              >
                Contact
              </Link>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400">
              © {new Date().getFullYear()} Pixnora. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
