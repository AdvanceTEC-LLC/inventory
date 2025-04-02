export const expectValidationError = (
  response,
  modelName,
  expectedErrors = [],
) => {
  const { status, body } = response
  expect(status).toBe(400)
  expect(body).toHaveProperty('error')
  expect(body.error).toMatch(/ValidationError/i)
  expect(body).toHaveProperty('message')
  expect(body.message).toMatch(
    new RegExp(`${modelName} validation failed`, 'i'),
  )
  expect(body).toHaveProperty('errors')
  expect(Array.isArray(body.errors)).toBe(true)
  if (expectedErrors.length > 0) {
    expect(body.errors).toHaveLength(expectedErrors.length)
    expectedErrors.forEach((expectedError, index) => {
      expect(body.errors[index]).toMatch(new RegExp(expectedError, 'i'))
    })
  }
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
