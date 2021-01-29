import path from "path"
import childProcess from "child_process"
import { BrowserWindow } from "electron"
// import { createProtocol } from "vue-cli-plugin-electron-builder/lib"

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([{ scheme: "electron-vue-template", privileges: { secure: true, standard: true } }])

let mainWindow: BrowserWindow, backgroundWindow: BrowserWindow, backgroundProcess: childProcess.ChildProcess

const createMainWindow = async function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 800,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
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
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
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
  // https://github.com/electron/electron/issues/6656
  // https://github.com/electron/electron/issues/4520
  backgroundProcess = childProcess.fork(modulePath, [])
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
