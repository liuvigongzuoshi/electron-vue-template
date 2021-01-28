// const [, , ...args] = process.argv

process.on("message", async ({ id, args }) => {
  // TODO

  console.log("child-process got message:", args)

  const data = {}

  process.send({ id, data })
})
