import { materialService } from '../services/material.service.js'
import { sequelize } from '../util/db.js'

export const getAllMaterials = async (req, res) => {
  const materials = await materialService.getAllMaterials()
  res.json(materials)
}

export const getMaterial = async (req, res) => {
  const { id } = req.params
  const material = await materialService.getMaterial(id)
  res.status(200).json(material)
}

export const createMaterial = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const newMaterial = await materialService.createMaterial(
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(201).json(newMaterial)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const createDeepMaterial = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const newMaterial = await materialService.createDeepMaterial(
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(201).json(newMaterial)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const createBulkMaterials = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const newMaterials = await materialService.createBulkMaterials(
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(201).json(newMaterials)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const updateMaterial = async (req, res, next) => {
  const { id } = req.params

  const transaction = await sequelize.transaction()
  try {
    const updatedMaterial = await materialService.updateMaterial(
      id,
      req.body,
      transaction,
    )
    await transaction.commit()
    res.status(200).json(updatedMaterial)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const deleteMaterial = async (req, res, next) => {
  const { id } = req.params

  const transaction = await sequelize.transaction()
  try {
    const deletedMaterial = await materialService.deleteMaterial(
      id,
      transaction,
    )
    await transaction.commit()
    res.status(204).json(deletedMaterial)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

export const deleteAllMaterials = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const deletedMaterials =
      await materialService.deleteAllMaterials(transaction)
    await transaction.commit()
    res.status(204).json(deletedMaterials)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}
