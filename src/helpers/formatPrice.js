/**
 * Format price for Vietnamese currency display
 * @param {number} price - The price to format
 * @returns {string} - Formatted price with VNĐ currency
 */
export const formatVNPrice = (price) => {
  if (price === null || price === undefined || price === 0) {
    return "Miễn phí";
  }

  // Convert to number if it's a string
  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  // Format with dots as thousands separators
  const formattedPrice = numPrice.toLocaleString("vi-VN");

  return `${formattedPrice} VNĐ`;
};

/**
 * Format price for Vietnamese currency display without currency symbol
 * @param {number} price - The price to format
 * @returns {string} - Formatted price without currency symbol
 */
export const formatVNNumber = (price) => {
  if (price === null || price === undefined || price === 0) {
    return "0";
  }

  // Convert to number if it's a string
  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  // Format with dots as thousands separators
  return numPrice.toLocaleString("vi-VN");
};
