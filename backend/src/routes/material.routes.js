import Router from 'express'
import {
  getAllMaterials,
  createMaterial,
  deleteAllMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
  createDeepMaterial,
  createBulkMaterials,
} from '../controllers/material.controller'

const router = Router()

router
  .route('/')
  .get(getAllMaterials)
  .post(createMaterial)
  .delete(deleteAllMaterials)

router.route('/:id').get(getMaterial).put(updateMaterial).delete(deleteMaterial)

router.route('/deep').post(createDeepMaterial)

router.route('/bulk').post(createBulkMaterials)

export default router
