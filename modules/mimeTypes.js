const path = require("path");

function getMimeType(fileName) {
  const extname = path.extname(fileName).toLowerCase();
  switch (extname) {
    case ".html":
      return "text/html";
    case ".png":
      return "image/png";
    case ".ico":
      return "image/ico";
    default:
      return "application/octet-stream";
  }
}

module.exports = getMimeType;