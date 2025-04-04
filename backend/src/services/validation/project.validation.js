import * as yup from 'yup'
import { Project } from '../../models/index.js'

const projectSchema = yup.object({
  number: yup
    .number()
    .required('number is required')
    .integer('number must be an integer')
    .positive('number must be positive')
    .max(Number.MAX_SAFE_INTEGER, 'number must be a safe integer')
    .test('unique', `number must be unique`, async (id) => {
      const exists = await Project.findByPk(id)
      return !exists
    }),
  name: yup
    .string()
    .required('name is required')
    .trim()
    .min(1, 'name must not be empty'),
  active: yup.boolean().optional(),
})

export default projectSchema
