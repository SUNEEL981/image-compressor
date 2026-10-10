
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const policySections = [
  {
    number: "01",
    title: "Information We Collect",
    text: "Pixnora is designed to process images directly in your browser. For normal image compression, conversion, and resizing, your selected images do not need to be uploaded to our server. We do not ask you to create an account to use our basic image tools.",
  },
  {
    number: "02",
    title: "How Our Tools Work",
    text: "When you select an image, our browser-based tools process it on your device wherever the selected tool supports local processing. Your image remains on your device during this process. Please avoid claiming that every operation is entirely local unless you have verified the implementation of each tool.",
  },
  {
    number: "03",
    title: "Analytics and Website Usage",
    text: "We may use analytics tools in the future to understand website traffic, page performance, and general visitor behavior. If analytics are introduced, this policy should be updated to identify the services used and explain what information they collect.",
  },
  {
    number: "04",
    title: "Advertising and Cookies",
    text: "Pixnora may display advertisements from third-party advertising providers. These providers may use cookies or similar technologies to deliver advertisements, measure performance, or personalize ads according to their own policies and applicable settings. This policy should be updated if specific advertising services are enabled.",
  },
  {
    number: "05",
    title: "Third-Party Services",
    text: "Our website may contain links to third-party websites or services. We do not control their privacy practices or content. Please review the relevant privacy policies before sharing information with those services.",
  },
  {
    number: "06",
    title: "Data Security and Retention",
    text: "We aim to keep Pixnora simple and privacy-conscious. Images processed locally are handled by your browser, subject to your browser and device environment. Any information collected by future analytics, advertising, hosting, or other services will be handled according to the relevant service settings and applicable requirements.",
  },
  {
    number: "07",
    title: "Changes to This Policy",
    text: "We may update this Privacy Policy as Pixnora develops or our services change. Updates will be published on this page with a revised date. Please check this page periodically for the latest information.",
  },
  {
    number: "08",
    title: "Contact Us",
    text: "If you have questions or concerns about this Privacy Policy or how Pixnora handles information, please contact us through our Contact page.",
  },
];

const tools = [
  {
    title: "JPG Image Compressor",
    description: "Reduce JPG image file size",
    path: "/jpg-compressor",
  },
  {
    title: "PNG Image Compressor",
    description: "Optimize PNG images",
    path: "/png-compressor",
  },
  {
    title: "WebP Image Compressor",
    description: "Compress WebP images",
    path: "/webp-compressor",
  },
  {
    title: "Image Resizer",
    description: "Resize images to your needs",
    path: "/image-resizer",
  },
  {
    title: "JPG to WebP Converter",
    description: "Convert JPG into WebP",
    path: "/jpg-to-webp",
  },
  {
    title: "Compress Image to KB",
    description: "Target a specific file size",
    path: "/compress-to-kb",
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Pixnora";

    const description =
      "Read the Pixnora Privacy Policy to understand how our online image compression, conversion, and resizing tools handle your information.";

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
      "https://pixnora.devs.surf/privacy-policy"
    );

    return () => {
      // The next page can set its own title and metadata.
    };
  }, []);

  const updatedDate = "October 2026";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Header />

      <main className="relative isolate w-full overflow-hidden pb-12 sm:pb-16">
        {/* Decorative background */}
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
              PRIVACY &amp; TRANSPARENCY
            </div>

            <h1 className="mt-6 text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
              Privacy{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-5 w-full max-w-2xl text-center text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Your privacy matters. Learn how Pixnora handles information
              when you use our online image compression, conversion, and
              resizing tools.
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

          {/* Privacy summary */}
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
                    d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                  Privacy-first image tools
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Pixnora is designed to make image compression and
                  conversion simple. Our tools support browser-based
                  processing where implemented, helping reduce the need
                  to send images to a server.
                </p>
              </div>
            </div>
          </section>

          {/* Policy sections */}
          <article className="mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.05)] sm:mt-8 sm:rounded-3xl">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6">
              <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                Our Privacy Policy
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Please read the following sections to understand our
                approach to privacy and website usage.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {policySections.map((section) => (
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

                      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {section.text}
                      </p>

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

          {/* Tools */}
          <section className="mx-auto mt-12 w-full max-w-4xl sm:mt-16">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-600">
                Explore Pixnora
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Our Image Tools
              </h2>

              <p className="mx-auto mt-3 w-full max-w-xl text-center text-sm leading-7 text-slate-600 sm:text-base">
                Discover tools to compress, convert, and resize your
                images with ease.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tools.map((tool) => (
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

          {/* Bottom note */}
          <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-blue-100 bg-gradient-to-r from-violet-50 to-blue-50 p-5 sm:mt-10 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-extrabold text-violet-700 shadow-sm">
                i
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Have a privacy question?
                </h2>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  If you need clarification about this policy, please
                  visit our{" "}
                  <Link
                    to="/contact"
                    className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-blue-700"
                  >
                    Contact page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Copyright */}
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
