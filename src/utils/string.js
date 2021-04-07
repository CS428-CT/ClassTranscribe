/**
 * Formats a string where a number is replaced with the corresponding literal at that index.
 * For example, format("HELLO {0}{1}", "World", "!") = "HELLO World!"
 * @param {String} str The string to be formatted
 * @param {Array} args The literals to substitute the indicies with
 * @returns The formatted string
 */
export const format = (str, ...args) => {
  let fStr = str

  for (let i = 0; i < args.length; i += 1) {
    fStr = replaceAll(fStr, `{${i}}`, args[i])
  }

  return fStr
}

const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace)
}

/**
 * Truncates a string to the provided length. If the string is shorter than maxLength, nothing is done. Else,
 * The string is cut to size maxLength and "..." is added to the end of it.
 * @param {String} str string to truncate
 * @param {Number} maxLength the maximum length for the string before truncation happens
 * @returns
 */
export const truncateString = (str, maxLength) => {
  if (!str) return ""
  if (str.length <= maxLength) return str

  const truncated = `${str.substring(0, maxLength)}...`
  return truncated
}
