import {
  AssemblyMaterialType,
  NewAssemblyMaterialType,
} from '../types/assemblyMaterial'
import apiService from './apiService'

const assemblyMaterialsService = apiService<
  AssemblyMaterialType,
  NewAssemblyMaterialType
>({ endpoint: 'assemblyMaterials' })

export default assemblyMaterialsService
