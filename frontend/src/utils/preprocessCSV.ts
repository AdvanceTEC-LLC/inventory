// Maps csv input to data matrix
export const preprocessCSV = (data: string): string => {
  return data
    .split('\n')
    .map((line) =>
      line
        .split(',')
        .map((cell) => {
          if (cell.includes(',') && !cell.startsWith('"')) {
            return `"${cell.trim()}"`
          }
          return cell.trim()
        })
        .join(',')
    )
    .join('\n')
}
