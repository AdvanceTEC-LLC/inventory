import logger from './logger.js'

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  const { name, message, statusCode, errors } = error

  logger.error(`${name}: ${message}`)

  if (response.headersSent) {
    return next(error)
  }

  response.status(statusCode || 500).json({
    error: name || 'Error',
    message: message || 'An unexpected error has occurred.',
    errors,
    statusCode: statusCode || 500,
  })
}

export default { requestLogger, unknownEndpoint, errorHandler }
