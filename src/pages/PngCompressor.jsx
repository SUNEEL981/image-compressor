import ToolPage from "./ToolPage";

export default function PngCompressor() {
  return (
    <ToolPage
      title="PNG Compressor"
      description="Compress PNG images online for free and reduce file size for websites, sharing and storage while maintaining good visual quality."
      accepted="image/png,.png"
      inputLabel="PNG"
      outputType="image/webp"
      outputName="webp"
      note="WebP output is recommended when you need a significantly smaller file."
      seoTitle="PNG Compressor Online – Compress PNG Images | Compressly"
      seoDescription="Compress PNG images online for free. Reduce PNG file size for websites, sharing and storage with Compressly."
      canonicalPath="/png-compressor"
    />
  );
}