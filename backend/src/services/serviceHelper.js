import { CustomError } from '../util/errors/CustomError'

const find = async (Model, id, transaction) => {
  const record = await Model.findByPk(id, { transaction })
  if (!record) {
    throw new CustomError(
      'NotFoundError',
      `${Model.name} with id ${id} not found`,
      404,
    )
  }
  return record
}
