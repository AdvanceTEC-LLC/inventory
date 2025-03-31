import ValidationError from './ValidationError.js'

class MissingRequiredError extends ValidationError {
  constructor(resourceType, identifier, value, requirements = null) {
    const message = `${resourceType} ${identifier} is required${requirements ? ` and ${requirements}` : ''}`
    super(message, 400)
    this.resourceType = resourceType
    this.identifier = identifier
    this.value = value
    this.requirements = requirements
  }

  toJSON() {
    return {
      ...super.toJSON(),
      resourceType: this.resourceType,
      identifier: this.identifier,
      value: this.value,
      requirements: this.requirements,
    }
  }
}

export default MissingRequiredError
