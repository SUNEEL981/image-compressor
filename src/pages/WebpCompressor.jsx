import ToolPage from "./ToolPage";

export default function WebpCompressor() {
  return (
    <ToolPage
      title="WebP Compressor"
      description="Compress WebP images for faster websites and sharing."
      accepted="image/webp,.webp"
      inputLabel="WebP"
      outputType="image/webp"
      outputName="webp"
    />
  );
}