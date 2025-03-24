import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../reducers/notificationsReducer'
import { AppDispatch } from '../store'

interface UseMutationWithNotificationsOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useMutationWithNotifications = <TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationWithNotificationsOptions<TData, TVariables>) => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      onSuccess?.()
    },
    onError: (error: Error) => {
      const { name, message } = error
      dispatch(
        notifyWithTimeout({
          title: name,
          message: message,
          status: 'error',
        })
      )
      onError?.(error)
    },
  })
}
