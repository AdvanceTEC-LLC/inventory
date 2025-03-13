import { useQuery } from '@tanstack/react-query'
import receivedShipmentsService from '../services/receivedShipmentsService'

export const useReceivedShipments = () => {
  return useQuery({
    queryKey: ['receivedShipments'],
    queryFn: receivedShipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
