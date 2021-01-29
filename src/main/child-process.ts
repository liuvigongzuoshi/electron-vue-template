// const [, , ...args] = process.argv

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("message", async ({ id, args }: { id: string; args: any }) => {
  // TODO

  console.log("child-process got message:", args)

  const data = {}
  const message = { id: id, data }

  process.send && process.send(message)
})
