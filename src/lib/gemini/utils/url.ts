/**
 * Validates and fixes URLs to ensure they are complete and absolute
 */
export function validateAndFixUrl(url: string): string {
  try {
    // Try to create a URL object to validate the URL
    new URL(url);
    return url;
  } catch (e) {
    // If URL is invalid, try to fix it
    if (url.startsWith('www.')) {
      return `https://${url}`;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    throw new Error(`Invalid URL: ${url}`);
  }
}