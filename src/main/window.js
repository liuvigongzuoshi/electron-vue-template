/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const childProcess = require("child_process")
const { BrowserWindow } = require("electron")
const { getDBPath } = require("@/main/helper")
// import { createProtocol } from "vue-cli-plugin-electron-builder/lib"

let mainWindow, backgroundWindow, backgroundProcess

const createMainWindow = async function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 800,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true
    }
  })

  mainWindow.once("ready-to-show", function() {
    mainWindow.show()
    mainWindow.focus()
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    // createProtocol("electron-vue-template")
    // Load the index.html when not in development
    mainWindow.loadURL("electron-vue-template://./index.html")
  }
}

const createBackgroundWindow = async function() {
  backgroundWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await backgroundWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}background.html`)
    if (!process.env.IS_TEST) backgroundWindow.webContents.openDevTools()
  } else {
    backgroundWindow.loadURL("electron-vue-template://./background.html")
  }
}

const createBackgroundProcess = function() {
  const modulePath = path.join(__dirname, ".", "child-process.js")
  const dbPath = getDBPath()
  // https://github.com/electron/electron/issues/6656
  // https://github.com/electron/electron/issues/4520
  backgroundProcess = childProcess.fork(modulePath, [dbPath])
}

const killBackgroundProcess = function() {
  backgroundProcess.kill()
}

export const createWindow = function() {
  // createBackgroundWindow()
  // createBackgroundProcess()
  createMainWindow()
}

export const getWindows = function() {
  return { mainWindow, backgroundWindow, backgroundProcess }
}

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }])

// console.log("app.getPath(): ", app.getPath("userData"))
