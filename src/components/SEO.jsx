
import { useEffect } from "react";

const SITE_NAME = "Pixnora";
const SITE_URL = "https://pixnora.devs.surf";

export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
}) {
  useEffect(() => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : "Free Image Compressor Online – JPG, PNG & WebP | Pixnora";

    const logoUrl = `${SITE_URL}/favicon.svg`;
    const ogImageUrl = `${SITE_URL}/og-image.png`;

    document.title = fullTitle;

    const setMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content || "");
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

      element.setAttribute("content", content || "");
    };

    // Basic SEO
    setMeta("description", description);
    setMeta(
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // Open Graph
    setProperty("og:title", fullTitle);
    setProperty("og:description", description);
    setProperty("og:type", type);
    setProperty("og:url", canonicalUrl);
    setProperty("og:site_name", SITE_NAME);
    setProperty("og:image", ogImageUrl);
    setProperty("og:image:width", "1200");
    setProperty("og:image:height", "630");
    setProperty("og:image:alt", "Pixnora - Free Online Image Compressor");

    // Twitter / X
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImageUrl);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    // Organization structured data
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: logoUrl,
    };

    // Website structured data
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Free online image compression, conversion and resizing tools.",
    };

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

    addJsonLd("Pixnora-organization-schema", organizationSchema);
    addJsonLd("Pixnora-website-schema", websiteSchema);
  }, [title, description, path, type]);

  return null;
}
