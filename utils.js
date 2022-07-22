export function throttle (fn, wait) {
  let inThrottle = false
  return function() {
    const context = this, args = arguments
    if (inThrottle) return
    const result = fn.apply(context, args)
    inThrottle = true
    setTimeout(function() {
      inThrottle = false
    }, wait)
    return result
  }
}

// return [a,b)
export function randomN(a, b) {
  let n = b - a
  return Math.floor(Math.random() * n + a)
}

// Mobile or Desktop
export function detectDeviceType() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';
}

export function isMobile() {
  return detectDeviceType() === "Mobile"
}
