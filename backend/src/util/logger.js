const logInfo = true
const logError = true

export const info = (...params) => {
  if (!logInfo) return
  // eslint-disable-next-line no-console
  console.log(...params)
}

export const error = (...params) => {
  if (!logError) return
  // eslint-disable-next-line no-console
  console.error(...params)
}

export default {
  info,
  error,
}
