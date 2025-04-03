import * as yup from 'yup'
import { Material, Project } from '../../models/index.js'

const stockSchema = yup.object({
  materialId: yup
    .number()
    .required('materialId is required')
    .positive('materialId must be positive')
    .integer('materialId must be an integer')
    .max(Number.MAX_SAFE_INTEGER, 'quantity must be a safe integer')
    .test('exists', `material does not exist`, async (id) => {
      const exists = await Material.findByPk(id)
      return !!exists
    }),

  projectId: yup
    .number()
    .required('projectId is required')
    .positive('projectId must be positive')
    .integer('projectId must be an integer')
    .max(Number.MAX_SAFE_INTEGER, 'quantity must be a safe integer')
    .test('exists', `project does not exist`, async (id) => {
      const exists = await Project.findByPk(id)
      return !!exists
    }),

  quantity: yup
    .number()
    .required('quantity is required')
    .integer('quantity must be an integer')
    .positive('quantity must be positive')
    .max(Number.MAX_SAFE_INTEGER, 'quantity must be a safe integer'),
})

export default stockSchema
