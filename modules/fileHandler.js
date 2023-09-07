const fs = require("fs");
const path = require('path');

function handleFileRequest(req, res, fileName, mimeType) {
  const filePath = path.join(__dirname, '../static/', fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": mimeType });
      res.write(data);
      res.end();
    }
  });
}

module.exports = handleFileRequest;
