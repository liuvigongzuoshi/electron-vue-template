import { ipcRenderer, shell, remote } from "electron"

window.ipcRenderer = ipcRenderer
window.shell = shell
window.dialog = remote.dialog
window.downloadsdir = remote.app.getPath("downloads")
