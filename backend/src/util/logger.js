const logInfo = true
const logError = true
const logTrace = true
const logLabels = false

const COLORS = {
  RESET: '\x1b[0m',
  WHITE: '\x1b[37m',
  LIGHT_BLUE: '\x1b[38;5;116m',
  RED: '\x1b[38;5;209m',
}

export const info = (...params) => {
  if (!logInfo) return
  // eslint-disable-next-line no-console
  console.log(
    `${COLORS.WHITE}${logLabels ? '[INFO]' : ''}`,
    ...params,
    COLORS.RESET,
  )
}

export const error = (...params) => {
  if (!logError) return
  // eslint-disable-next-line no-console
  console.error(
    `${COLORS.RED}${logLabels ? '[ERROR]' : ''}`,
    ...params,
    COLORS.RESET,
  )
}

const getCallerInfo = () => {
  const stack = new Error().stack.split('\n')[3] // Get the caller function
  const match =
    stack.match(/at (.+) \((.+):(\d+):(\d+)\)/) ||
    stack.match(/at (.+) (.+):(\d+):(\d+)/)

  if (match) {
    return {
      functionName: match[1].trim(),
      fileName: match[2].split('/').pop(), // Extract only the filename
      line: match[3],
      column: match[4],
    }
  }
  return {
    functionName: 'Unknown',
    fileName: 'Unknown',
    line: '?',
    column: '?',
  }
}

export const trace = () => {
  if (!logTrace) return
  const { functionName, fileName, line } = getCallerInfo()
  // eslint-disable-next-line no-console
  console.log(
    `${COLORS.LIGHT_BLUE}${logLabels ? '[TRACE]' : ''} Entering ${functionName}() in ${fileName}:${line}${COLORS.RESET}`,
  )
}

export default {
  info,
  error,
  trace,
}
