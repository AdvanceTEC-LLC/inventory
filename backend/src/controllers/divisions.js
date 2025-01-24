import { Router } from 'express'
import { Division } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
const divisionsRouter = Router()

export const divisionFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const divisionFinder = async (request, _response, next) => {
  const { id } = request.params
  const division = await Division.findByPk(id, divisionFindOptions)

  if (!division) {
    throw new CustomError(
      'NotFoundError',
      `Division with id ${id} not found`,
      404,
    )
  }
  request.division = division
  next()
}

divisionsRouter.get('/', async (_request, response) => {
  const division = await Division.findAll(divisionFindOptions)

  response.status(200).send(division)
})

divisionsRouter.get('/:id', divisionFinder, async (request, response) => {
  response.status(200).send(request.division)
})

divisionsRouter.post('/', async (request, response) => {
  const { number, name } = request.body

  const division = await Division.create({
    number,
    name,
  })

  response.status(201).send(division)
})

divisionsRouter.delete('/:id', divisionFinder, async (request, response) => {
  await request.division.destroy()
  response.status(204).json({ message: 'Division entry deleted successfully' })
})

divisionsRouter.delete('/', async (request, response) => {
  await Division.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All divisions deleted successfully' })
})

export default divisionsRouter
