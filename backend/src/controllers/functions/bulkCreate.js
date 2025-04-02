import { sequelize } from '../../util/db.js'
import { trace } from '../../util/logger.js'

const bulkCreate = (service) => async (req, res, next) => {
  trace()
  const transaction = await sequelize.transaction()
  try {
    const newRecords = await service.createBulk(req.body, transaction)
    await transaction.commit()
    res.status(201).json(newRecords)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export default bulkCreate
