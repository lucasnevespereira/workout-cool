/**
 * Gets the full URL for an image stored in the storage system
 * @param imagePath The path to the image in storage
 * @returns The full URL to the image
 */
export const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;

  // If the image path is already a full URL, return it
  if (imagePath.startsWith("http")) return imagePath;

  // Otherwise, construct the URL using the storage base URL
  return `${imagePath}`;
};
