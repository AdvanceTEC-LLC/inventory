import * as yup from 'yup'

const manufacturerSchema = yup.object({
  name: yup
    .string()
    .required('name is required')
    .trim()
    .min(1, 'name must not be empty'),
})

export default manufacturerSchema
