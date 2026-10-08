import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Compressly";

    const description =
      "Read the Compressly Privacy Policy to learn how our online image compression, conversion and resizing tools handle your information.";

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
      "https://image-compressor-drab-pi.vercel.app/privacy-policy"
    );
  }, []);

  const policySections = [
    {
      number: "01",
      title: "Information we collect",
      text:
        "Compressly is designed so that image processing can happen directly in your browser. We do not need to receive your images to perform normal compression and conversion.",
    },
    {
      number: "02",
      title: "Analytics",
      text:
        "We may use analytics services in the future to understand general website usage, traffic and performance.",
    },
    {
      number: "03",
      title: "Advertising",
      text:
        "We may display advertisements from third-party advertising providers. These providers may use cookies or similar technologies according to their own policies.",
    },
    {
      number: "04",
      title: "Contact",
      text:
        "If you have privacy questions, please contact us through the Contact page.",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen w-full overflow-x-hidden bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

          {/* ================= PAGE HEADER ================= */}

          <header className="mx-auto max-w-3xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] !text-gray-500 sm:px-4 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              <span className="!text-gray-500">
                Privacy &amp; Legal
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-1.2px] !text-gray-950 sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 !text-gray-500 sm:text-base sm:leading-7">
              Learn how Compressly handles information when you use
              our online image tools.
            </p>

            <p className="mt-3 text-[11px] font-medium !text-gray-400 sm:text-xs">
              Last updated: October 2026
            </p>

          </header>

          {/* ================= MAIN POLICY CARD ================= */}

          <article className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] sm:mt-10 sm:rounded-3xl">

            {/* Intro */}

            <div className="border-b border-gray-100 bg-gray-50/70 p-5 sm:p-7">

              <div className="flex items-start gap-3 sm:gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-xs font-bold !text-white sm:h-10 sm:w-10">
                  <span className="!text-white">✓</span>
                </div>

                <div className="min-w-0">

                  <h2 className="text-sm font-bold !text-gray-950 sm:text-base">
                    Your privacy matters
                  </h2>

                  <p className="mt-1.5 text-xs leading-6 !text-gray-500 sm:text-sm sm:leading-7">
                    Compressly is designed with browser-based image
                    processing in mind.
                  </p>

                </div>

              </div>

            </div>

            {/* Policy Sections */}

            <div className="divide-y divide-gray-100">

              {policySections.map((section) => (
                <section
                  key={section.number}
                  className="p-5 sm:p-7 lg:p-8"
                >

                  <div className="flex items-start gap-3 sm:gap-5">

                    {/* Number */}

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-extrabold !text-gray-500 sm:h-9 sm:w-9 sm:text-xs">
                      <span className="!text-gray-500">
                        {section.number}
                      </span>
                    </div>

                    {/* Text */}

                    <div className="min-w-0 flex-1">

                      <h2 className="text-lg font-bold leading-snug tracking-[-0.3px] !text-gray-950 sm:text-xl lg:text-2xl">
                        {section.title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 !text-gray-600 sm:text-[15px] sm:leading-8">
                        {section.text}
                      </p>

                      {section.title === "Contact" && (
                        <Link
                          to="/contact"
                          className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold !text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98]"
                        >
                          <span className="!text-white">
                            Contact us
                          </span>

                          <span className="!text-white">
                            →
                          </span>
                        </Link>
                      )}

                    </div>

                  </div>

                </section>
              ))}

            </div>
          </article>

          {/* ================= PRIVACY NOTE ================= */}

          <section className="mx-auto mt-5 w-full max-w-4xl rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:mt-6 sm:p-6">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold !text-gray-600 shadow-sm">
                <span className="!text-gray-600">i</span>
              </div>

              <p className="min-w-0 text-xs leading-6 !text-gray-500 sm:text-sm sm:leading-7">
                Compressly provides browser-based image tools for
                compressing, converting and resizing images. For
                normal image processing, your image does not need to
                be uploaded to a server.
              </p>

            </div>

          </section>

          {/* ================= TOOLS ================= */}

          <section className="mx-auto mt-8 w-full max-w-4xl sm:mt-10">

            <div className="text-center">

              <p className="text-[10px] font-bold uppercase tracking-[0.14em] !text-gray-400">
                Compressly Tools
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-[-0.5px] !text-gray-950 sm:text-2xl">
                Explore our image tools
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-xs leading-6 !text-gray-500 sm:text-sm">
                Compress, convert and resize images directly in your
                browser.
              </p>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">

              {/* JPG */}

              <Link
                to="/jpg-compressor"
                className="group flex min-h-[60px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
              >
                <span className="!text-gray-800 text-sm font-semibold">
                  JPG Image Compressor
                </span>

                <span className="!text-gray-400 text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:!text-gray-700">
                  →
                </span>
              </Link>

              {/* PNG */}

              <Link
                to="/png-compressor"
                className="group flex min-h-[60px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
              >
                <span className="!text-gray-800 text-sm font-semibold">
                  PNG Image Compressor
                </span>

                <span className="!text-gray-400 text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:!text-gray-700">
                  →
                </span>
              </Link>

              {/* WEBP */}

              <Link
                to="/webp-compressor"
                className="group flex min-h-[60px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
              >
                <span className="!text-gray-800 text-sm font-semibold">
                  WebP Image Compressor
                </span>

                <span className="!text-gray-400 text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:!text-gray-700">
                  →
                </span>
              </Link>

              {/* RESIZER */}

              <Link
                to="/image-resizer"
                className="group flex min-h-[60px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
              >
                <span className="!text-gray-800 text-sm font-semibold">
                  Image Resizer
                </span>

                <span className="!text-gray-400 text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:!text-gray-700">
                  →
                </span>
              </Link>

            </div>

          </section>

          {/* ================= BOTTOM ================= */}

          <footer className="pb-4 pt-8 text-center sm:pt-10">

            <p className="text-[11px] !text-gray-400 sm:text-xs">
              © 2026 Compressly. All rights reserved.
            </p>

          </footer>

        </div>
      </main>
    </>
  );
}