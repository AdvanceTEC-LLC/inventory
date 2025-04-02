import ValidationError from './ValidationError.js'

class UniqueConstraintError extends ValidationError {
  constructor(resourceType, identifier, value) {
    const message = `${resourceType} with ${identifier} "${value}" already exists`
    super(message, 409)
    this.resourceType = resourceType
    this.identifier = identifier
    this.value = value
  }

  toJSON() {
    return {
      ...super.toJSON(),
      resourceType: this.resourceType,
      identifier: this.identifier,
      value: this.value,
    }
  }
}

export default UniqueConstraintError
