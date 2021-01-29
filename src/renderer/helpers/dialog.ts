export const showOpenDialog = (title: string, filters: Electron.FileFilter[] = []) => {
  return window.dialog.showOpenDialog({ title, filters, properties: ["openFile"] })
}

export const showErrorBox = (title: string, content: string) => {
  return window.dialog.showErrorBox(title, content)
}

export const showOpenCSVDialog = (title: string) => {
  const filters = [{ name: "csv", extensions: ["csv"] }]
  showOpenDialog(title, filters).then(result => {
    if (!result.canceled) {
      return result.filePaths[0]
    }
  })
}
