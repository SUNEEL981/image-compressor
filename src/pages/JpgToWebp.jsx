import ConvertPage from "./ConvertPage";

export default function JpgToWebp() {
  return (
    <ConvertPage
      title="JPG to WebP Converter"
      description="Convert JPG and JPEG images to WebP."
      accepted="image/jpeg,.jpg,.jpeg"
      outputType="image/webp"
      outputName="webp"
      label="JPG / JPEG"
    />
  );
}