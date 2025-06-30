const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const sendFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>Error reading the file</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  const url = req.url;

  const routes = {
    "/": "index.html",
    "/styles.css": "styles.css",
    "/logo.svg": "logo.svg",
    "/browser-app.js": "browser-app.js",
    "/reload-client.js": "reload-client.js",
  };

  if (routes[url]) {
    const filePath = path.join(PUBLIC_DIR, routes[url]);
    const ext = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css",
      ".js": "text/javascript",
      ".svg": "image/svg+xml",
    };
    sendFile(res, filePath, contentTypes[ext] || "application/octet-stream");
  }else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Page not found</h1>");
  }
});

const wss = new WebSocket.Server({ server });

function broadcastReload() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("reload");
    }
  });
}

fs.watch(PUBLIC_DIR, { recursive: true }, (eventType, filename) => {
  if (filename && !filename.endsWith("reload-client.js")) {
    console.log(`📦 File changed: ${filename}`);
    broadcastReload();
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});