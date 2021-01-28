class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    const callbacks = this.events[event] || []
    callbacks.push(callback)
    this.events[event] = callbacks

    return this
  }

  off(event, callback) {
    const callbacks = this.events[event]
    this.events[event] = callbacks && callbacks.filter(fn => fn !== callback)

    return this
  }

  emit(event, ...args) {
    const callbacks = this.events[event]
    callbacks.forEach(fn => {
      fn(...args)
    })

    return this
  }

  once(event, callback) {
    const wrapFun = function(...args) {
      callback(...args)

      this.off(event, wrapFun)
    }
    this.on(event, wrapFun)

    return this
  }
}

export default EventEmitter
