const MAX_IMAGE_SIZE = 1200;
const WEBP_QUALITY = 0.82;
const JPEG_QUALITY = 0.84;

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 102.4) / 10} KB`;
  }

  return `${Math.round(bytes / 1024 / 102.4) / 10} MB`;
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("This image could not be opened."));
    image.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The optimized image could not be saved."));
    reader.readAsDataURL(blob);
  });
}

export async function compressProductImage(file) {
  if (!file?.type.startsWith("image/")) {
    throw new Error("Please choose a valid image file.");
  }

  const image = await readImage(file);
  const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(image.width, image.height));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);
  URL.revokeObjectURL(image.src);

  let blob = await canvasToBlob(canvas, "image/webp", WEBP_QUALITY);
  if (!blob) {
    blob = await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);
  }

  if (!blob) {
    throw new Error("The image could not be compressed.");
  }

  return {
    dataUrl: await blobToDataUrl(blob),
    originalSize: file.size,
    compressedSize: blob.size,
    summary: `${formatBytes(file.size)} to ${formatBytes(blob.size)} • ${width}x${height}`,
  };
}
