import ConvertPage from "./ConvertPage";

export default function PngToWebp() {
  return (
    <ConvertPage
      title="PNG to WebP Converter"
      description="Convert PNG images to smaller WebP files."
      accepted="image/png,.png"
      outputType="image/webp"
      outputName="webp"
      label="PNG"
    />
  );
}