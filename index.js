const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { error } = require("console");

const HOST = "localhost";
const PORT = 3000;

const routes = {
  "/": "templates/index.html", //Просто добавь сюда "запрос файла от пользователя : путь до файла на сервере", поидее должно работать
  "/login.html": "templates/login.html",
  "/favicon.ico": "favicon.ico",
  "/register.html": "templates/register.html",
  "/logo.png": "images/logo.png",
};

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

// const requestListener = function (req, res) {
//   let basePath = "";
//   let body = "";

//   console.log(req.url);

//   switch (req.url)

// console.log(req.url);
//
// switch (req.method) {
//   case "GET":
//     switch (req.url) {
//       case "/logo.png":
//         res.writeHead(200, { "Content-Type": "image/png" });
//         res.end(image);
//         break;
//       case "/":
//         res.writeHead(200, { "Content-Type": "text/html" });
//         basePath = createPath("index");
//         fs.readFile(basePath, (err, data) => {
//           res.write(data);
//           res.end;
//         });
//         res.statusCode = 200;
//         break;
//       case "/login":
//         res.writeHead(200, { "Content-Type": "text/html" });
//         basePath = createPath("login");
//         fs.readFile(basePath, (err, data) => {
//           res.write(data);
//           res.end;
//         });
//         res.statusCode = 200;
//         break;
//       case "/register":
//         res.writeHead(200, { "Content-Type": "text/html" });
//         basePath = createPath("register");
//         fs.readFile(basePath, (err, data) => {
//           res.write(data);
//           res.end;
//         });
//         res.statusCode = 200;
//         break;
//       default:
//         res.writeHead(200, { "Content-Type": "text/html" });
//         basePath = createPath("error");
//         fs.readFile(basePath, (err, data) => {
//           res.write(data);
//           res.end;
//         });
//         res.statusCode = 404;
//         break;
//     }
//     break;

//   case "POST":
//     switch (req.data) {
//       default:
//         req.on("data", function (data) {
//           body += data;
//         });

//         req.on("end", function (data) {
//           var post = querystring.parse(body);
//           console.log(`${post["username"]} | ${post["password"]}`);
//         });
//         break;
//     }
//     break;
// }
//};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
