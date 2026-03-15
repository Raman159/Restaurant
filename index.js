// const { app, BrowserWindow } = require("electron");
// const path = require("path");
// const { spawn } = require("child_process");
// require("dotenv").config();

// const isProd = process.env.NODE_ENV === "production";

// function startBackend() {
//   const backendPath = isProd
//     ? path.join(__dirname, "../backend/dist/app.js")
//     : path.join(__dirname, "../backend/src/app.ts");

//   const command = isProd ? "node" : "npx ts-node";

//   spawn(command, [backendPath], {
//     stdio: "inherit",
//     shell: true,
//     cwd: __dirname,
//   });
// }

// function createMainWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//  if (isProd) {
//     mainWindow.loadFile(
//       path.join(__dirname, "../POS/dist/index.html")
      
//     );
//       mainWindow.webContents.openDevTools();
//   } else {
//     mainWindow.loadURL(process.env.REACT_DEV_SERVER);
//   }


//   // TEMP: enable to debug white screen
//   mainWindow.webContents.openDevTools();
// }

// app.whenReady().then(() => {
//   startBackend();
//   createMainWindow();
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

const isProd = app.isPackaged;

function startBackend() {
  const backendPath = path.join(__dirname, "backend/dist/app.js");
  spawn("node", [backendPath], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname,
  });
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const indexHtml = path.join(__dirname, "frontend/dist/index.html");
  console.log("Loading:", indexHtml);

  win.loadFile(indexHtml);
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  startBackend();
  createMainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
