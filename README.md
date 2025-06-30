# 🟢 Mini Live Server (Custom Dev Server with Node.js)

A lightweight, no-dependency development server built with pure Node.js — supports live-reloading in the browser on file changes.

---

## 🚀 Features

- ✅ Serves static files: HTML, CSS, JS
- ✅ WebSocket-based auto reload
- ✅ File change detection with `fs.watch`
- ✅ Reloads browser without any plugin or browser extension
- ✅ No frameworks: built entirely with native `http`, `fs`, `ws`, and `path`

---

## 📁 Project Structure

```
project-root/
├── server.js              # Main server file
├── package.json
├── README.md
├── LICENSE
└── public/                # Static files served
    ├── index.html
    ├── styles.css
    └── reload-client.js
```

---

## 🛠 How It Works

1. `server.js` sets up a Node.js HTTP server
2. It uses `fs.watch()` to detect changes in files inside `public/`
3. A `WebSocket` server is created on the same port
4. When a file changes, a `"reload"` message is sent to all clients
5. `reload-client.js` on the browser listens for this message and calls `location.reload()`

---

## 📦 Installation

```bash
npm install
```

> Make sure `ws` and `nodemon` (optional for development) are listed in your `package.json`.

---

## ▶️ Run the Server

```bash
node server.js
```

Or for development with auto-restart:

```bash
nodemon server.js
```

---

## 🧠 Skills Demonstrated

- Low-level understanding of HTTP server behavior
- Manual routing and MIME type management
- Real-time communication via WebSocket
- File system monitoring with `fs.watch`
- Frontend-backend integration without frameworks

---

## 🧪 Demo Use Case

1. Open `http://localhost:3000` in your browser
2. Modify `index.html` or `styles.css`
3. The page reloads automatically on file change

---

## 📍 Author

Custom-built by **Shayan Sharifi** as a personal project for understanding real-time development tooling.

Feel free to fork and expand it into your own dev server or tooling system.

---

## ✅ License

MIT
