import { MaterialType, NewMaterialType } from '../types/material'
import apiService from './apiService'

const materialsService = apiService<MaterialType, NewMaterialType>({
  endpoint: 'materials',
})

export default materialsService
