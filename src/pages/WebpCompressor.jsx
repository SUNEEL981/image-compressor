import ToolPage from "./ToolPage";

export default function WebpCompressor() {
  return (
    <ToolPage
      title="WebP Compressor"
      description="Compress WebP images online for free and reduce image file size while maintaining good quality."
      accepted="image/webp,.webp"
      inputLabel="WebP"
      outputType="image/webp"
      outputName="webp"
    />
  );
}