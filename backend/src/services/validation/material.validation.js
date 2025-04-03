import * as yup from 'yup'
import { Manufacturer } from '../../models/index.js'

const materialSchema = yup.object({
  name: yup
    .string()
    .required('name is required')
    .trim()
    .min(1, 'name must not be empty'),
  manufacturerId: yup
    .number()
    .required('manufacturerId is required')
    .positive('manufacturerId must be positive')
    .integer('manufacturerId must be an integer')
    .max(Number.MAX_SAFE_INTEGER, 'quantity must be a safe integer')
    .test('exists', `manufacturer does not exist`, async (id) => {
      const exists = await Manufacturer.findByPk(id)
      return !!exists
    }),
  unit: yup
    .string()
    .required('unit is required')
    .trim()
    .min(1, 'unit must not be empty'),
})

export default materialSchema
