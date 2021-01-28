/* eslint-disable @typescript-eslint/no-var-requires */
const { promises: fsPromises } = require("fs")
const { ipcMain } = require("electron")
const { getWindows } = require("./window")

// let apiIndex = 0

// ipcMain.handle("api", async (event, ...args) => {
//   const index = apiIndex++
//   const { backgroundProcess } = getWindows()
//   const message = { id: index, args }
//   backgroundProcess.send(message)
//   const result = new Promise((resolve, reject) => {
//     const callBack = ({ id, data }) => {
//       if (id === index) {
//         backgroundProcess.off("message", callBack)
//         resolve(data)
//       }
//     }
//     backgroundProcess.on("message", callBack)
//   })
//   return result
// })

ipcMain.handle("readFile", async (event, ...args) => {
  return fsPromises.readFile(...args)
})

ipcMain.on("asynchronous", (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply("asynchronous-reply", "pong")
})

ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = "pong"
})
