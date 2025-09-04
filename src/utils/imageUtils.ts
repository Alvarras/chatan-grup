// This is a simple SVG of a user avatar
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#0284c7" />
  <circle cx="100" cy="85" r="40" fill="#ffffff" />
  <path d="M160 160c0-33.137-26.863-60-60-60s-60 26.863-60 60" fill="#ffffff" />
</svg>`;

// Convert SVG to a data URL
export const avatarDataUrl = `data:image/svg+xml;base64,${Buffer.from(avatarSvg).toString("base64")}`;

// Default image placeholders
export const defaultProfileImage = "/avatar.svg";
export const defaultThumbnail = "/thumbnail.svg";
export const defaultPdfThumbnail = "/document.svg";
export const defaultVideoThumbnail = "/video.svg";
