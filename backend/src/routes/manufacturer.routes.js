import Router from 'express'
import {
  getAllManufacturers,
  createManufacturer,
  deleteAllManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer,
  getManufacturerByName,
  createBulkManufacturers,
} from '../controllers/manufacturer.controller'

const router = Router()

router
  .route('/')
  .get(getAllManufacturers)
  .post(createManufacturer)
  .delete(deleteAllManufacturers)

router
  .route('/:id')
  .get(getManufacturerById)
  .put(updateManufacturer)
  .delete(deleteManufacturer)

router.route('/:name').get(getManufacturerByName)

router.route('/bulk/').post(createBulkManufacturers)

export default router
