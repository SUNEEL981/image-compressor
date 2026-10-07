import ToolPage from "./ToolPage";

export default function PngCompressor() {
  return (
    <ToolPage
      title="PNG Compressor"
      description="Optimize PNG images and reduce unnecessary file size."
      accepted="image/png,.png"
      inputLabel="PNG"
      outputType="image/webp"
      outputName="webp"
      note="WebP output is recommended when you need a significantly smaller file."
    />
  );
}