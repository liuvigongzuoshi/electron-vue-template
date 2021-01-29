export const readFile = (path: string, options: Record<string, unknown>) => {
  return window.ipcRenderer.invoke("readFile", path, options)
}
