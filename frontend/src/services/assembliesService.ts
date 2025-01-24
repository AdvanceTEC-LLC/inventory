import { AssemblyType, NewAssemblyType } from '../types/assembly'
import apiService from './apiService'

const assembliessService = apiService<AssemblyType, NewAssemblyType>({
  endpoint: 'assemblies',
})

export default assembliessService
