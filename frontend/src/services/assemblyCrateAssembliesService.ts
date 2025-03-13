import {
  AssemblyCrateAssemblyType,
  NewAssemblyCrateAssemblyType,
} from '../types/assemblyCrateAssembly'
import apiService from './apiService'

const assemblyCrateAssembliesService = apiService<
  AssemblyCrateAssemblyType,
  NewAssemblyCrateAssemblyType
>({
  endpoint: 'assemblyCrateAssemblies',
})

export default assemblyCrateAssembliesService
