import logger from './logger.js'

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  const { name, message, statusCode } = error

  const status = name.includes('Sequelize') ? 400 : statusCode || 500

  logger.error(`Name ${name}`)
  logger.error(`Message: ${message}`)
  logger.error(`Status Code: ${status}`)

  if (response.headersSent) {
    return next(error)
  }

  response.status(status).json({
    error: name,
    message: message,
  })
}

export default { requestLogger, unknownEndpoint, errorHandler }
