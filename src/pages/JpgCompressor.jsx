import ToolPage from "./ToolPage";

export default function JpgCompressor() {
  return (
    <ToolPage
      title="JPG Compressor"
      description="Compress JPG and JPEG images online to reduce file size while maintaining good quality."
      accepted="image/jpeg,.jpg,.jpeg"
      inputLabel="JPG / JPEG"
      outputType="image/jpeg"
      outputName="jpg"
    />
  );
}