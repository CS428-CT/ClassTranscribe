
/**
 * Formats a string where a number is replaced with the corresponding literal at that index.
 * For example, format("HELLO {0}{1}", "World", "!") = "HELLO World!"
 * @param {*} str The string to be formatted
 * @param {*} args The literals to substitute the indicies with
 * @returns The formatted string
 */
export const format = function(str, ...args) {
    for (let i = 0; i < args.length; i++) {
      str = replaceAll(str, "{" + i + "}", args[i])
    }

    return str
}

const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
}