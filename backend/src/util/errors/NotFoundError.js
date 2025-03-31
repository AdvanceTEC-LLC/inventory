class NotFoundError extends Error {
  constructor(message, resource, id) {
    if (arguments.length === 2) {
      id = resource
      resource = message
      message = `${resource} with id ${id} not found`
    }

    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      resource: this.resource,
      id: this.id,
    }
  }
}

export default NotFoundError
