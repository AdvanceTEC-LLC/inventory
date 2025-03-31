import { info } from '../../src/util/logger'

export const expectValidationError = (response, message) => {
  info('Validating error response:', response.body)
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toMatch(/ValidationError/i)
  expect(response.body).toHaveProperty('message')
  info('Validating error message:', response.body.error.message)
  expect(response.body.message).toMatch(new RegExp(message, 'i'))
}

export const expectNotFoundError = (
  response,
  resource = 'Resource',
  id = 0,
) => {
  expect(response.status).toBe(404)
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toMatch(/NotFoundError/i)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toMatch(
    new RegExp(`${resource} with id ${id} not found`, 'i'),
  )
}

export const expectMissingRequiredError = (
  response,
  resource = 'Resource',
  field = 'field',
  requirements = null,
) => {
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toMatch(/MissingRequiredError/i)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toMatch(
    new RegExp(
      `${resource} ${field} is required${requirements ? ` and ${requirements}` : ''}`,
      'i',
    ),
  )
}
