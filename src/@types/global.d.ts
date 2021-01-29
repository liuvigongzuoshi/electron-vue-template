import electron from "electron"

declare global {
  interface Window {
    ipcRenderer: electron.IpcRenderer
    shell: electron.Shell
    dialog: electron.Dialog
    downloadsdir: string
  }
}
