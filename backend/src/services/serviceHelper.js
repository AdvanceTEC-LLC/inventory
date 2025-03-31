const find = async (Model, id, transaction) => {
  const record = await Model.findByPk(id, { transaction })
  if (!record) {
    throw new NotFoundError(Model.name, id)
  }
  return record
}
