/**
 * Get the file name without the extension.
 * @param {string} filename
 * @return {string}
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 * @example
 * const filename = getFilenameWithoutExtension('index.ts')
 * console.log(filename) // 'index'
 */
export const getFilenameWithoutExtension = (filename: string): string => {
  return filename.split('.').shift()!
}
