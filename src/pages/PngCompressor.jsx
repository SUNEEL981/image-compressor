import ToolPage from "./ToolPage";

export default function PngCompressor() {
  return (
    <ToolPage
      title="PNG Compressor"
      description="Compress PNG images online and reduce file size for websites, sharing and storage."
      accepted="image/png,.png"
      inputLabel="PNG"
      outputType="image/webp"
      outputName="webp"
      note="WebP output is recommended when you need a significantly smaller file."
    />
  );
}