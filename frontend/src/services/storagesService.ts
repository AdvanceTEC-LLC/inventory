import axios from 'axios'
import { CreateStorageType, StorageType } from '../types/shelfLocation'

const baseURL = '/api/storages'

const getAll = async (): Promise<StorageType[]> => {
  const response = await axios.get<StorageType[]>(baseURL)
  return response.data
}

const create = async (storage: CreateStorageType): Promise<StorageType> => {
  const response = await axios.post<StorageType>(baseURL, storage)
  return response.data
}

const update = async (
  id: number,
  storage: StorageType
): Promise<StorageType> => {
  const response = await axios.put<StorageType>(`${baseURL}/${id}/`, storage)
  return response.data
}

const remove = async (id: number): Promise<StorageType> => {
  const response = await axios.delete<StorageType>(`${baseURL}/${id}`)
  return response.data
}

const removeAll = async (): Promise<StorageType> => {
  const response = await axios.delete<StorageType>(baseURL)
  return response.data
}

const storagesService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
}

export default storagesService
