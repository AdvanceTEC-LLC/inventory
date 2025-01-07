export class CustomError extends Error {
  constructor(name, message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = name
  }
}
