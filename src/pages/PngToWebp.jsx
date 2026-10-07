import ConvertPage from "./ConvertPage";

export default function PngToWebp() {
  return (
    <ConvertPage
      title="PNG to WebP Converter"
      description="Convert PNG images to WebP online for free. Create smaller, web-friendly image files quickly."
      accepted="image/png,.png"
      outputType="image/webp"
      outputName="webp"
      label="PNG"
    />
  );
}