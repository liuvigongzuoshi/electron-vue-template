export const showOpenDialog = (title, filters = []) => {
  return window.dialog.showOpenDialog({ title, filters, properties: ["openFile"] })
}

export const showErrorBox = (title, content) => {
  return window.dialog.showErrorBox(title, content)
}

export const showOpenCSVDialog = title => {
  const filters = [{ name: "csv", extensions: ["csv"] }]
  showOpenDialog(title, filters).then(result => {
    if (!result.canceled) {
      return result.filePaths[0]
    }
  })
}
