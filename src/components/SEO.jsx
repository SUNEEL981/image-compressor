import { useEffect } from "react";

const SITE_NAME = "Pixnora";

export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
}) {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const canonicalUrl = `${siteUrl}${path}`;
    const fullTitle = `${title} | ${SITE_NAME}`;
    const logoUrl = `${siteUrl}/favicon.svg`;
    const ogImageUrl = `${siteUrl}/og-image.png`;

    document.title = fullTitle;

    /* =====================================================
       META HELPERS
       ===================================================== */

    const setMeta = (name, content) => {
      let element = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setProperty = (property, content) => {
      let element = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    /* =====================================================
       BASIC SEO
       ===================================================== */

    setMeta("description", description);

    setMeta(
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    /* =====================================================
       OPEN GRAPH
       ===================================================== */

    setProperty("og:title", fullTitle);
    setProperty("og:description", description);
    setProperty("og:type", type);
    setProperty("og:url", canonicalUrl);
    setProperty("og:site_name", SITE_NAME);

    setProperty("og:image", ogImageUrl);
    setProperty("og:image:width", "1200");
    setProperty("og:image:height", "630");

    setProperty(
      "og:image:alt",
      "Pixnora - Free Online Image Compressor"
    );

    /* =====================================================
       TWITTER / X
       ===================================================== */

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImageUrl);

    /* =====================================================
       CANONICAL
       ===================================================== */

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    /* =====================================================
       ORGANIZATION STRUCTURED DATA
       ===================================================== */

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
      logo: logoUrl,
    };

    /* =====================================================
       WEBSITE STRUCTURED DATA
       ===================================================== */

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: siteUrl,
      description:
        "Free online image compression, conversion and resizing tools.",
    };

    /* =====================================================
       JSON-LD HELPER
       ===================================================== */

    const addJsonLd = (id, schema) => {
      let script = document.getElementById(id);

      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema);
    };

    addJsonLd(
      "Pixnora-organization-schema",
      organizationSchema
    );

    addJsonLd(
      "Pixnora-website-schema",
      websiteSchema
    );

    /* =====================================================
       CLEANUP
       ===================================================== */

    return () => {
      document
        .getElementById("Pixnora-organization-schema")
        ?.remove();

      document
        .getElementById("Pixnora-website-schema")
        ?.remove();
    };
  }, [title, description, path, type]);

  return null;
}