class ValidationError extends Error {
  constructor(message, errors = [], statusCode = 400) {
    super(message)
    this.name = this.constructor.name
    this.errors = errors
    this.statusCode = statusCode
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      errors: this.errors.map((error) => error),
      statusCode: this.statusCode,
    }
  }
}

export default ValidationError
