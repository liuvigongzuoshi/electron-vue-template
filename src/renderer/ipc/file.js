import { options } from "less"

export const readFile = (path, options) => {
  return window.ipcRenderer.invoke("readFile", path, options)
}
