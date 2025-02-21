import { Router } from 'express'
import { CrateAssemblies, Crate, Assembly } from '../models/index.js'
import { crateFindOptions } from './crates.js'
import { assemblyFindOptions } from './assemblies.js'
import { CustomError } from '../util/errors/CustomError.js'
const crateAssembliesRouter = Router()

const crateAssembliesFindOptions = {
  attributes: {
    exclude: ['crateId', 'AssembliesId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Crate,
      as: 'crate',
      //...crateFindOptions,
    },
    {
      model: Assembly,
      as: 'assembly',
      ...assemblyFindOptions,
    },
  ],
}

const crateAssembliesFinder = async (request, _response, next) => {
  const { id } = request.params
  const crateAssemblies = await CrateAssemblies.findByPk(
    id,
    crateAssembliesFindOptions,
  )

  if (!crateAssemblies) {
    throw new CustomError(
      'NotFoundError',
      `Crate assemblies with id ${id} not found`,
      404,
    )
  }
  request.crateAssemblies = crateAssemblies
  next()
}

crateAssembliesRouter.get('/', async (_request, response) => {
  const crate = await CrateAssemblies.findAll(crateAssembliesFindOptions)

  response.status(200).send(crate)
})

crateAssembliesRouter.get(
  '/:id',
  crateAssembliesFinder,
  async (request, response) => {
    response.status(200).send(request.crateAssemblies)
  },
)

crateAssembliesRouter.post('/', async (request, response) => {
  const { crateId, assembliesId } = request.body

  const crateExists = await Crate.findByPk(crateId)

  if (!crateExists) {
    throw new CustomError(
      'NotFoundError',
      `Crate with id ${crateId} not found`,
      404,
    )
  }

  const assembliesExists = await Assemblies.findByPk(assembliesId)

  if (!assembliesExists) {
    throw new CustomError(
      'NotFoundError',
      `Assemblies with id ${assembliesId} not found`,
      404,
    )
  }

  const crateAssemblies = await CrateAssemblies.create({
    crateId,
    AssembliesId,
  })

  response.status(201).send(crateAssemblies)
})

crateAssembliesRouter.delete(
  '/:id',
  crateAssembliesFinder,
  async (request, response) => {
    await request.crateAssemblies.destroy()
    response
      .status(204)
      .json({ message: 'Crate assemblies entry deleted successfully' })
  },
)

crateAssembliesRouter.delete('/', async (request, response) => {
  await CrateAssemblies.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All crate assemblies deleted successfully' })
})

export default crateAssembliesRouter
