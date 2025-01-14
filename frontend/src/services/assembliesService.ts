import axios from 'axios'
import { AssemblyType, CreateAssemblyType } from '../types/assembly'

const baseURL = '/api/assemblies'

const getAll = async (): Promise<AssemblyType[]> => {
  const response = await axios.get<AssemblyType[]>(baseURL)
  return response.data
}

const getId = async (id: string): Promise<AssemblyType> => {
  const response = await axios.get<AssemblyType>(`${baseURL}/${id}`)
  return response.data
}

const create = async (assembly: CreateAssemblyType): Promise<AssemblyType> => {
  const response = await axios.post<AssemblyType>(baseURL, assembly)
  return response.data
}

const createAll = async (
  assemblies: CreateAssemblyType[]
): Promise<AssemblyType[]> => {
  const response = await axios.post<AssemblyType[]>(baseURL, assemblies)
  return response.data
}

const update = async (
  id: string,
  assembly: AssemblyType
): Promise<AssemblyType> => {
  const response = await axios.put<AssemblyType>(`${baseURL}/${id}`, assembly)
  return response.data
}

const remove = async (id: number): Promise<AssemblyType> => {
  const response = await axios.delete<AssemblyType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<AssemblyType> => {
  const response = await axios.delete<AssemblyType>(baseURL)
  return response.data
}

const assembliesService = {
  getAll,
  getId,
  create,
  createAll,
  update,
  remove,
  removeAll,
}

export default assembliesService
