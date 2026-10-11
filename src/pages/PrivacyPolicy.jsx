``
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const policySections = [
  {
    number: "01",
    id: "information",
    title: "Information We Collect",
    text: "Pixnora is designed to process images directly in your browser where supported by the selected tool. We do not require you to create an account to use our basic image tools. Information handled by your browser may depend on the features you use and your device environment.",
  },
  {
    number: "02",
    id: "processing",
    title: "How Our Tools Work",
    text: "When you select an image, our tools process it according to the implementation of that feature. Browser-based tools can process images on your device without uploading them to our server. Please note that processing behavior may vary by tool, and you should avoid sharing sensitive images unless you are comfortable with how the selected feature works.",
  },
  {
    number: "03",
    id: "analytics",
    title: "Analytics and Website Usage",
    text: "We may introduce analytics services to understand website traffic, page performance, and general visitor behavior. If analytics services are enabled, this policy should be updated to identify the services used and explain what information they collect.",
  },
  {
    number: "04",
    id: "advertising",
    title: "Advertising and Cookies",
    text: "Pixnora may display advertisements from third-party advertising providers. These providers may use cookies or similar technologies to display ads, measure performance, or personalize advertising, subject to their own policies and applicable settings. This policy should be updated to reflect the advertising services actually enabled on the website.",
  },
  {
    number: "05",
    id: "third-party",
    title: "Third-Party Services",
    text: "Our website may contain links to third-party websites or services. These services operate independently, and we do not control their content or privacy practices. Review their privacy policies before sharing information with them.",
  },
  {
    number: "06",
    id: "security",
    title: "Data Security and Retention",
    text: "We aim to keep Pixnora simple and privacy-conscious. Images processed locally are handled by your browser and device environment. Information handled by hosting, analytics, advertising, or other third-party services may be subject to their respective settings, policies, and retention practices.",
  },
  {
    number: "07",
    id: "changes",
    title: "Changes to This Policy",
    text: "We may update this Privacy Policy as Pixnora evolves or our services change. Updates will be published on this page with a revised date. Please review this page periodically for the latest information.",
  },
  {
    number: "08",
    id: "contact",
    title: "Contact Us",
    text: "If you have questions or concerns about this Privacy Policy or how Pixnora handles information, please visit our Contact page to get in touch.",
  },
];

const tools = [
  {
    title: "JPG Compressor",
    description: "Reduce JPG image file size",
    path: "/jpg-compressor",
    icon: "J",
  },
  {
    title: "PNG Compressor",
    description: "Optimize PNG images",
    path: "/png-compressor",
    icon: "P",
  },
  {
    title: "WebP Compressor",
    description: "Compress WebP images",
    path: "/webp-compressor",
    icon: "W",
  },
  {
    title: "Image Resizer",
    description: "Resize images to your needs",
    path: "/image-resizer",
    icon: "R",
  },
  {
    title: "JPG to WebP",
    description: "Convert images to WebP",
    path: "/jpg-to-webp",
    icon: "↗",
  },
  {
    title: "Compress to KB",
    description: "Target a specific file size",
    path: "/compress-to-kb",
    icon: "KB",
  },
];

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
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

export default function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title;

    const descriptionText =
      "Read the Pixnora Privacy Policy to understand how our online image compression, conversion, and resizing tools handle information.";

    const descriptionMeta = document.querySelector(
      'meta[name="description"]'
    );
    const canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    );

    const previousDescription = descriptionMeta?.getAttribute("content");
    const previousCanonical = canonicalLink?.getAttribute("href");

    let createdDescription = false;
    let createdCanonical = false;
    let descriptionElement = descriptionMeta;
    let canonicalElement = canonicalLink;

    if (!descriptionElement) {
      descriptionElement = document.createElement("meta");
      descriptionElement.setAttribute("name", "description");
      document.head.appendChild(descriptionElement);
      createdDescription = true;
    }

    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
      createdCanonical = true;
    }

    document.title = "Privacy Policy | Pixnora";
    descriptionElement.setAttribute("content", descriptionText);
    canonicalElement.setAttribute(
      "href",
      "https://pixnora.devs.surf/privacy-policy"
    );

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        descriptionElement?.remove();
      } else if (previousDescription !== null) {
        descriptionElement?.setAttribute("content", previousDescription);
      }

      if (createdCanonical) {
        canonicalElement?.remove();
      } else if (previousCanonical !== null) {
        canonicalElement?.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  const updatedDate = "October 2026";

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#f8f9ff]">
      <Header />

      <main className="relative isolate w-full overflow-hidden pb-14 sm:pb-20">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] bg-gradient-to-br from-violet-100 via-white to-blue-100"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-40 -z-10 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl"
        />

        <div className="mx-auto w-full max-w-7xl px-4 pt-9 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
          {/* Hero */}
          <header className="mx-auto max-w-4xl text-center">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-violet-700 shadow-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-violet-600" />
              Privacy & Transparency
            </div>

            <h1 className="mt-5 break-words text-3xl font-extrabold leading-tight tracking-tight !text-slate-950 sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
              Your Privacy,
              <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 !text-slate-600 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              Understand how Pixnora approaches privacy while you compress,
              convert, and resize images online.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium !text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="text-violet-600">
                  <ShieldIcon />
                </span>
                Privacy information
              </span>
              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"
              />
              <span>Last updated: {updatedDate}</span>
            </div>
          </header>

          {/* Privacy summary */}
          <section className="mx-auto mt-9 max-w-5xl overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_14px_50px_rgba(76,29,149,0.07)] sm:mt-12 sm:rounded-3xl">
            <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-6 lg:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200/70 sm:h-16 sm:w-16">
                <ShieldIcon />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-extrabold !text-slate-950 sm:text-xl lg:text-2xl">
                    A privacy-conscious experience
                  </h2>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 sm:text-xs">
                    Your privacy matters
                  </span>
                </div>

                <p className="mt-2 text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                  Our goal is to make image tools simple and accessible.
                  Browser-based processing is supported where implemented,
                  helping reduce the need to upload images to a server.
                </p>
              </div>
            </div>
          </section>

          {/* Main layout */}
          <div className="mx-auto mt-7 grid max-w-5xl grid-cols-1 items-start gap-6 lg:mt-9 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
            {/* Table of contents */}
            <aside className="min-w-0 lg:sticky lg:top-6">
              <nav
                aria-label="Privacy policy sections"
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5"
              >
                <div className="mb-4 px-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-600 sm:text-xs">
                    On this page
                  </p>
                  <h2 className="mt-1.5 text-lg font-extrabold !text-slate-950">
                    Quick Navigation
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                  {policySections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-left no-underline transition-colors duration-200 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-300"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-extrabold text-slate-600 transition-colors group-hover:bg-violet-100 group-hover:text-violet-700">
                        {section.number}
                      </span>

                      <span className="min-w-0 flex-1 text-sm font-semibold leading-5 !text-slate-700 group-hover:!text-violet-700">
                        {section.title}
                      </span>

                      <span className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-600">
                        <ArrowIcon />
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                    <ShieldIcon />
                  </div>
                  <p className="mt-3 text-sm font-bold !text-slate-900">
                    Need more help?
                  </p>
                  <p className="mt-1 text-xs leading-6 !text-slate-600">
                    Have a question about privacy or how our tools work?
                  </p>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-700 no-underline hover:text-blue-700"
                  >
                    Contact us <ArrowIcon />
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Policy content */}
            <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.045)] sm:rounded-3xl">
              <div className="border-b border-slate-100 bg-gradient-to-r from-white via-violet-50/50 to-blue-50/50 px-5 py-6 sm:px-7 sm:py-7 lg:px-9">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-600 sm:text-xs">
                  The details
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight !text-slate-950 sm:text-3xl">
                  Privacy Policy
                </h2>
                <p className="mt-3 text-sm leading-7 !text-slate-600 sm:text-base">
                  Please review the sections below to learn about our approach
                  to information, image processing, and website usage.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {policySections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 px-5 py-6 sm:px-7 sm:py-8 lg:px-9"
                  >
                    <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-xs font-extrabold text-violet-700 sm:h-11 sm:w-11 sm:text-sm">
                        {section.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-lg font-extrabold leading-snug !text-slate-950 sm:text-xl">
                          {section.title}
                        </h3>

                        <p className="mt-3 break-words text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                          {section.text}
                        </p>

                        {section.id === "contact" && (
                          <Link
                            to="/contact"
                            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-bold text-white no-underline shadow-md shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-200"
                          >
                            Visit Contact Page
                            <ArrowIcon />
                          </Link>
                        )}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>

          {/* Explore tools */}
          <section className="mx-auto mt-14 max-w-5xl sm:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-600 sm:text-xs">
                Explore Pixnora
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight !text-slate-950 sm:text-3xl lg:text-4xl">
                Image tools for everyday needs
              </h2>

              <p className="mt-3 text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
                Discover simple tools to compress, convert, and resize your
                images in one place.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-sm font-extrabold text-violet-700 transition-colors duration-200 group-hover:from-violet-600 group-hover:to-blue-600 group-hover:text-white">
                    {tool.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-extrabold !text-slate-950 sm:text-base">
                      {tool.title}
                    </h3>
                    <p className="mt-1 break-words text-xs leading-5 !text-slate-500 sm:text-sm">
                      {tool.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-violet-600">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom contact banner */}
          <section className="mx-auto mt-10 max-w-5xl sm:mt-14">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 p-6 shadow-xl shadow-violet-200/60 sm:rounded-3xl sm:p-8 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border-[28px] border-white/10 sm:h-64 sm:w-64"
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="min-w-0 max-w-2xl">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-200 sm:text-xs">
                    We are here to help
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                    Have a privacy-related question?
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-violet-100 sm:text-base sm:leading-8">
                    Visit our Contact page if you need clarification about
                    this policy or our website.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-violet-700 no-underline shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-violet-50 focus:outline-none focus:ring-4 focus:ring-white/40 sm:self-center"
                >
                  Contact Pixnora
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <footer className="pt-9 text-center sm:pt-12">
            <p className="text-xs leading-6 !text-slate-500 sm:text-sm">
              © {new Date().getFullYear()} Pixnora. All rights reserved.
            </p>
            <p className="mt-1 text-xs !text-slate-400">
              Privacy · Transparency · Simplicity
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
