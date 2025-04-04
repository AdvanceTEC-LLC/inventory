import { trace } from '../../util/logger.js'

const getByName = (service) => async (req, res) => {
  trace()

  const manufacturer = await service.getByName(req.body, service.findOptions)
  res.status(201).json(manufacturer)
}

export default getByName
