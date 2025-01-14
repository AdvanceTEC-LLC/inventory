import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { AppDispatch } from '../../../store'
import Button from '../../ATEC UI/Button'
import assembliesService from '../../../services/assembliesService'
import { CreateAssemblyType } from '../../../types/assembly'

interface ConfirmAssembliesButtonProps {
  assemblies: CreateAssemblyType[]
}

const ConfirmAssembliesButton = ({
  assemblies,
}: ConfirmAssembliesButtonProps) => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createAssembliesMutation = useMutation({
    mutationFn: (assemblies: CreateAssemblyType[]) =>
      assembliesService.createAll(assemblies),
    onMutate: () => {
      dispatch(
        notifyWithTimeout({
          title: 'Processing...',
          message: 'Your assemblies are being processed.',
          status: 'info',
        })
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Assembliess'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      const { name, message } = error
      dispatch(
        notifyWithTimeout({
          title: name,
          message: message,
          status: 'error',
        })
      )
    },
  })

  const confirmAssemblies = async () => {
    if (!assemblies) {
      console.error('Error: No assemblies to confirm')
      return
    }

    createAssembliesMutation.mutate(assemblies)
  }

  return (
    <Button
      text="Confirm Assemblies"
      onClick={() => {
        void confirmAssemblies()
      }}
    />
  )
}

export default ConfirmAssembliesButton
