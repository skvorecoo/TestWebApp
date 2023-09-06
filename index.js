const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { error } = require("console");
const image = fs.readFileSync("images/logo.png");

const ROOT = __dirname;
const HOST = "localhost";
const PORT = 3000;

function fileInfo(extname, MimeType, path) {
  this.extname = extname;
  this.MimeType = MimeType;
  this.path = path;
}

function getFileInfo(fileName) {
  const extname = path.extname(fileName).toLowerCase();
  switch (extname) {
    case ".html":
      return new fileInfo(
        ".html",
        "text/html",
        path.join(ROOT, "templates", fileName)
      );
    case ".png":
      return new fileInfo(
        ".png",
        "image/png",
        path.join(ROOT, "images", fileName)
      );
    case ".ico":
      return new fileInfo(".png", "image/ico", path.join(ROOT, fileName));
    default:
      return new fileInfo(null, null, null);
  }
}

const requestListener = function (req, res) {
  let file;

  switch (req.url) {
    case "/":
      file = getFileInfo("index.html");
      res.writeHead(200, { "Content-Type": `${file.MimeType}` });
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.error(err);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    case "/login.html":
      file = getFileInfo(`${req.url}`);
      res.writeHead(200, { "Content-Type": `${file.MimeType}` });
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.error(err);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    case "/favicon.ico":
      file = getFileInfo(`${req.url}`);
      res.writeHead(200, { "Content-Type": `${file.MimeType}` });
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.error(err);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    case "/register.html":
      file = getFileInfo(`${req.url}`);
      res.writeHead(200, { "Content-Type": `${file.MimeType}` });
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.error(err);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    case "/logo.png":
      file = getFileInfo(`${req.url}`);
      res.writeHead(200, { "Content-Type": `${file.MimeType}` });
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.error(err);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
    default:
      file = getFileInfo("error.html");
      res.writeHead(200, { "Content-Type": `${file.MimeType}` });
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.error(err);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
      break;
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
