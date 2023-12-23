const MAX_FILE_SIZE = 5000000;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const validateImage = (image: File): string | null => {
  if (!VALID_IMAGE_TYPES.includes(image.type)) {
    return 'filetype';
  }

  if (image.size >= MAX_FILE_SIZE) {
    return 'filesize';
  }

  return null;
};
