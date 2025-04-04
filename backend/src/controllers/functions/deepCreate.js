import { sequelize } from '../../util/db.js'
import { trace } from '../../util/logger.js'

const deepCreate = (service) => async (req, res, next) => {
  trace()
  const transaction = await sequelize.transaction()
  try {
    const material = await service.deepCreate(req.body, transaction)
    await transaction.commit()
    res.status(201).json(material)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export default deepCreate
