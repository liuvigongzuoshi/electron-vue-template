/**
 * Localstorage 存储数据
 * @param {String} key
 * @param {Object} value
 * @returns {Boolean}
 */
export const setLocalstorage = (key, value) => {
  const storage = window.localStorage
  if (!storage) {
    window.alert("浏览器不支持localstorage")
    return false
  }
  storage.setItem(key, JSON.stringify(value))
  return true
}

/**
 * Localstorage 提取存储
 * @param   {String} key
 * @returns {Boolean} Boolean or String
 */
export const getLocalstorage = key => {
  const storage = window.localStorage
  if (!storage) {
    window.alert("浏览器不支持localstorage")
    return false
  }
  const value = storage.getItem(key)
  return value ? JSON.parse(value) : false
}

/**
 * Localstorage 删除存储
 * @param {String} key
 * @returns {Boolean}
 */
export const removeLocalstorage = key => {
  const storage = window.localStorage
  if (!storage) {
    window.alert("浏览器不支持localstorage")
    return false
  }
  storage.removeItem(key)
  return true
}

/**
 * 绑定事件
 * @param {String} element 监听的dom
 * @param {String} event 监听事件类型的字符串
 * @param {Function} handler listener callback
 */
export const onEvent = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler)
      }
    }
  }
})()

/**
 * 解绑事件
 * @param {String} element 监听的dom
 * @param {String} event 监听事件类型的字符串
 * @param {Function} handler listener callback
 */
export const offEvent = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler)
      }
    }
  }
})()

/**
 * 防抖 首次不执行
 * @param {Function} fn
 * @param {Number} time
 * @returns
 */
export const debounce = (fn, time) => {
  let timeout

  return function(...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.apply(context, args)
      timeout = null
    }, time)
  }
}

/**
 * 节流 首次不执行
 * @param {Function} fn
 * @param {Number} time
 * @returns
 */
export const throttle = (fn, time) => {
  let timeout

  return function(...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    if (timeout) return
    timeout = setTimeout(() => {
      fn.apply(context, args)
      timeout = null
    }, time)
  }
}

/**
 * 数据类型判断
 * @param {String} type
 * @param {any} data
 * @returns
 */
export const isType = (type, data) => {
  const Type = Object.prototype.toString.call(data).slice(8, -1)
  return Type === type
}

export default {
  onEvent,
  offEvent,
  debounce,
  throttle
}
