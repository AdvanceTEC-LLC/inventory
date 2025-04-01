import { manufacturerService } from '../services/manufacturer.service.js'
import { sequelize } from '../util/db.js'

export const getAllManufacturers = async (req, res) => {
  const Manufacturers = await manufacturerService.getAllManufacturers()
  res.json(Manufacturers)
}

export const getManufacturer = async (req, res) => {
  const { id } = req.params
  const manufacturer = await manufacturerService.getManufacturer(id)
  res.status(200).json(manufacturer)
}

export const getManufacturerByName = async (req, res) => {
  const manufacturer = await manufacturerService.getManufacturerByName(
    req.params,
  )
  res.status(200).json(manufacturer)
}

export const createManufacturer = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const newManufacturer = await manufacturerService.createManufacturer(
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(201).json(newManufacturer)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const createBulkManufacturers = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const newManufacturers = await manufacturerService.createBulkManufacturers(
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(201).json(newManufacturers)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const updateManufacturer = async (req, res, next) => {
  const { id } = req.params

  const transaction = await sequelize.transaction()
  try {
    const updatedManufacturer = await manufacturerService.updateManufacturer(
      id,
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(200).json(updatedManufacturer)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const deleteManufacturer = async (req, res, next) => {
  const { id } = req.params

  const transaction = await sequelize.transaction()
  try {
    const deletedManufacturer = await manufacturerService.deleteManufacturer(
      id,
      transaction,
    )
    await transaction.commit()
    res.status(204).json(deletedManufacturer)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const deleteAllManufacturers = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const deletedManufacturers =
      await manufacturerService.deleteAllManufacturers(transaction)
    await transaction.commit()
    res.status(204).json(deletedManufacturers)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}
