import { CrateAssemblyType, NewCrateAssemblyType } from '../types/crateAssembly'
import apiService from './apiService'

const crateAssembliesService = apiService<
  CrateAssemblyType,
  NewCrateAssemblyType
>({
  endpoint: 'crateAssemblies',
})

export default crateAssembliesService
