

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const termsSections = [
  {
    number: "01",
    title: "Use of the Service",
    paragraphs: [
      "Pixnora provides online image compression, conversion, and resizing tools for general use. You may use the available tools for personal or professional purposes, subject to these Terms of Use and applicable laws.",
      "You are responsible for ensuring that you have the necessary rights or permissions to use the images you process.",
    ],
  },
  {
    number: "02",
    title: "Acceptable Use",
    paragraphs: [
      "You agree not to use Pixnora for unlawful activities, abusive automated requests, unauthorized access attempts, or activities that interfere with the website, its infrastructure, or other users.",
      "You must not attempt to disrupt the service, bypass reasonable usage restrictions, or misuse the website in a way that could harm its operation or security.",
    ],
  },
  {
    number: "03",
    title: "Your Images and Content",
    paragraphs: [
      "You retain the rights you hold in the images you select and process using Pixnora. You are responsible for ensuring that your content does not violate copyright, privacy, or other applicable laws.",
      "Image processing behavior may depend on the selected tool and its implementation. Please review the information provided by the relevant tool before using it for sensitive or important files.",
    ],
  },
  {
    number: "04",
    title: "Service Availability",
    paragraphs: [
      "We aim to keep Pixnora available, useful, and reliable. However, uninterrupted access cannot be guaranteed. The website or individual tools may occasionally be unavailable because of maintenance, technical issues, updates, or circumstances beyond our control.",
      "We may modify, suspend, or discontinue features as the service develops.",
    ],
  },
  {
    number: "05",
    title: "Results and Limitations",
    paragraphs: [
      "Compression, conversion, and resizing results can vary depending on the original image, file format, browser, device, and selected settings.",
      "You are responsible for checking the resulting files before using or distributing them. Keep a separate copy of important original images.",
    ],
  },
  {
    number: "06",
    title: "Third-Party Services and Links",
    paragraphs: [
      "Pixnora may include links to third-party websites or services. These are provided for convenience, and we do not control or take responsibility for third-party content, availability, or policies.",
      "Your use of third-party services may be governed by their own terms and privacy policies.",
    ],
  },
  {
    number: "07",
    title: "Disclaimer",
    paragraphs: [
      "Pixnora is provided on an as-available basis. To the extent permitted by applicable law, we do not guarantee that the website will always be error-free, uninterrupted, or suitable for every particular purpose.",
      "Nothing in these Terms is intended to exclude any rights or protections that cannot legally be excluded under applicable law.",
    ],
  },
  {
    number: "08",
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms of Use as Pixnora develops or its features change. Updated terms will be published on this page with a revised date.",
      "Your continued use of the website after updated terms are published is subject to applicable law and the updated terms.",
    ],
  },
  {
    number: "09",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about these Terms of Use, please contact us through the Pixnora Contact page.",
    ],
  },
];

const relatedTools = [
  {
    title: "JPG Image Compressor",
    description: "Reduce JPG image file size",
    path: "/jpg-compressor",
  },
  {
    title: "PNG Image Compressor",
    description: "Compress PNG images",
    path: "/png-compressor",
  },
  {
    title: "WebP Image Compressor",
    description: "Optimize WebP images",
    path: "/webp-compressor",
  },
  {
    title: "Image Resizer",
    description: "Resize images easily",
    path: "/image-resizer",
  },
];

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Use | Pixnora";

    const description =
      "Read the Pixnora Terms of Use for information about acceptable use, service availability, image processing, and website limitations.";

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
      "https://pixnora.devs.surf/terms"
    );
  }, []);

  const updatedDate = "October 2026";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Header />

      <main className="relative isolate w-full overflow-hidden pb-12 sm:pb-16">
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] bg-gradient-to-br from-violet-100 via-white to-blue-100"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl sm:h-80 sm:w-80"
        />

        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
          {/* Hero */}
          <header className="mx-auto w-full max-w-3xl text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              TERMS &amp; CONDITIONS
            </div>

            <h1 className="mt-6 text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
              Terms of{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Use
              </span>
            </h1>

            <p className="mx-auto mt-5 w-full max-w-2xl text-center text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Please review these terms before using Pixnora's online
              image compression, conversion, and resizing tools.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-violet-600"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M12 7v5l3 2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Last updated: {updatedDate}
            </div>
          </header>

          {/* Intro card */}
          <section className="mx-auto mt-9 w-full max-w-4xl rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_10px_35px_rgba(76,29,149,0.06)] sm:mt-12 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md shadow-violet-200">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M7 3.75h7l5 5v11.5H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 4v5h5M9 13h6M9 16.5h6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                  Welcome to Pixnora
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  These Terms of Use describe the general conditions
                  for accessing and using Pixnora. By using the website,
                  you agree to comply with these terms and applicable
                  laws.
                </p>
              </div>
            </div>
          </section>

          {/* Terms sections */}
          <article className="mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.05)] sm:mt-8 sm:rounded-3xl">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6">
              <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                Terms and Conditions
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                The following sections explain the main conditions
                that apply when using our website.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {termsSections.map((section) => (
                <section
                  key={section.number}
                  className="px-5 py-6 sm:px-8 sm:py-8"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-xs font-extrabold text-violet-700 sm:h-10 sm:w-10 sm:text-sm">
                      {section.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold leading-snug text-slate-950 sm:text-xl">
                        {section.title}
                      </h3>

                      {section.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {section.title === "Contact Us" && (
                        <Link
                          to="/contact"
                          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-bold text-white no-underline shadow-md shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-200"
                        >
                          Contact us
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>

          {/* Related tools */}
          <section className="mx-auto mt-12 w-full max-w-4xl sm:mt-16">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-600">
                Explore Pixnora
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Try Our Image Tools
              </h2>

              <p className="mx-auto mt-3 w-full max-w-xl text-center text-sm leading-7 text-slate-600 sm:text-base">
                Compress and resize images with simple online tools.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group flex min-h-[84px] w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-violet-700 transition group-hover:from-violet-600 group-hover:to-blue-600 group-hover:text-white">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <rect
                        x="3.5"
                        y="3.5"
                        width="17"
                        height="17"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle
                        cx="8.5"
                        cy="8.5"
                        r="1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="m5 17 5-5 3 3 2-2 4 4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-900 sm:text-base">
                      {tool.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500 sm:text-sm">
                      {tool.description}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <footer className="pt-9 text-center sm:pt-12">
            <p className="text-xs leading-6 text-slate-500">
              © {new Date().getFullYear()} Pixnora. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
