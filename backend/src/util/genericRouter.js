import { Router } from 'express'
import { sequelize } from './db.js'
import NotFoundError from './errors/NotFoundError.js'

const createGenericRouter = ({ model, service, findOptions = {} }) => {
  const router = Router()

  // Middleware to find an entity by ID
  const entityFinder = async (request, _response, next) => {
    const { id } = request.params
    const entity = await model.findByPk(id, findOptions)

    if (!entity) {
      throw new NotFoundError(model.name, id)
    }

    request.entity = entity
    next()
  }

  // GET all entities
  router.get('/', async (_request, response) => {
    const entities = await model.findAll(findOptions)
    response.status(200).send(entities)
  })

  // GET one entity by ID
  router.get('/:id', entityFinder, async (request, response) => {
    response.status(200).send(request.entity)
  })

  // POST: Create entity
  router.post('/', async (request, response, next) => {
    const transaction = await sequelize.transaction()
    try {
      const entity = await service.create(request.body, transaction)
      await transaction.commit()
      response.status(201).send(entity)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  })

  // POST: Deep create (if applicable)
  if (service.deepCreate) {
    router.post('/deep/', async (request, response, next) => {
      const transaction = await sequelize.transaction()
      try {
        const entity = await service.deepCreate(request.body, transaction)
        await transaction.commit()
        response.status(201).send(entity)
      } catch (error) {
        await transaction.rollback()
        next(error)
      }
    })
  }

  // POST: Bulk create (if applicable)
  if (service.bulkCreate) {
    router.post('/bulk/', async (request, response, next) => {
      const transaction = await sequelize.transaction()
      try {
        const entity = await service.bulkCreate(request.body, transaction)
        await transaction.commit()
        response.status(201).send(entity)
      } catch (error) {
        await transaction.rollback()
        next(error)
      }
    })
  }

  if (service.update) {
    router.put('/:id/', async (request, response, next) => {
      const { id } = request.params

      const transaction = await sequelize.transaction()
      try {
        const updatedEntities = await service.update(
          id,
          request.body,
          transaction,
        )
        await transaction.commit()
        response.status(200).send(updatedEntities)
      } catch (error) {
        await transaction.rollback()
        next(error)
      }
    })
  }

  // PUT: Bulk update
  if (service.bulkUpdate) {
    router.put('/bulk/', async (request, response, next) => {
      const transaction = await sequelize.transaction()
      try {
        const updatedEntities = await service.bulkUpdate(
          request.body,
          transaction,
        )
        await transaction.commit()
        response.status(200).send(updatedEntities)
      } catch (error) {
        await transaction.rollback()
        next(error)
      }
    })
  }

  // DELETE: Single entity
  router.delete('/:id', entityFinder, async (request, response) => {
    await request.entity.destroy()
    response
      .status(204)
      .json({ message: `${model.name} entry deleted successfully` })
  })

  // DELETE: All entities
  router.delete('/', async (_request, response) => {
    await model.destroy({ where: {}, truncate: true, cascade: true })
    response
      .status(204)
      .json({ message: `All ${model.name}s deleted successfully` })
  })

  return router
}

export default createGenericRouter
