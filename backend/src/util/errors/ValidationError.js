class ValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}

export default ValidationError
