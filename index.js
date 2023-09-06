const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { error } = require("console");

const routes = require('./modules/routes')
const getMimeType = require('./modules/mimeTypes')

const HOST = "localhost";
const PORT = 3000;

const requestListener = function (req, res) {
  const url = req.url;
  const fileName = routes[url];

  if (fileName) {
    const filePath = path.join(__dirname, fileName);
    const mimeType = getMimeType(fileName);

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
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
