/**
 * Formats a number as a currency string
 * @param {number} amount - The amount to format
 * @param {string} [currency='USD'] - The currency code
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  /**
   * Capitalizes the first letter of each word in a string
   * @param {string} str - The string to capitalize
   * @returns {string} The capitalized string
   */
  export const capitalizeWords = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  /**
   * Truncates a string to a specified length and adds ellipsis
   * @param {string} text - The text to truncate
   * @param {number} [maxLength=100] - Maximum length before truncating
   * @returns {string} Truncated text with ellipsis if needed
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };
