const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { error } = require("console");

//Пользовательские модули
const routes = require("./modules/routes");
const getMimeType = require("./modules/mimeTypes");
const handleFileRequest = require("./modules/fileHandler");
const db = require("./modules/database");

//Служебные константы
const HOST = "localhost";
const PORT = 3000;

const requestListener = function (req, res) {
  const url = req.url;
  const fileName = routes[url];

  console.log(req.url);

  switch (req.method) {
    case "POST":
      switch (url) {
        case "/register":
          var body = "";

          req.on("data", function (data) {
            body += data;
          });

          req.on("end", () => {
            const formData = querystring.parse(body);
            console.log(`${formData['username']} | ${formData['password']}`);
            //db.createUser(`${formData['username']}`, `${formData['password']}`);
          });     
      }
      break;
    case "GET":
      if (fileName) {
        const mimeType = getMimeType(fileName);
        handleFileRequest(req, res, fileName, mimeType);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
      break;
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
