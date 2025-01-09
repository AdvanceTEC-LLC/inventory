// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../ATEC UI/Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import storagesService from '../../services/storagesService'
import { CreateStorageType, StorageType } from '../../types/storage'
import Button from '../ATEC UI/Button'

// Notifications
import { useDispatch } from '../../hooks/hooks'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import { AppDispatch } from '../../store'

const columnHelper = createColumnHelper<StorageType>()

const columns = [
  {
    header: 'Storage',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('aisle', {
        header: () => 'Aisle',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('col', {
        header: () => 'Column',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('shelf', {
        header: () => 'Shelf',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const StorageTable = () => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: storages = [],
    isLoading,
    isError,
  } = useQuery<StorageType[]>({
    queryKey: ['storages'],
    queryFn: storagesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createStorageMutation = useMutation({
    mutationFn: (storage: CreateStorageType) => storagesService.create(storage),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['storages'] })
      console.log('Storage created:', data)
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Error',
          message: 'Failed to create new storage',
          status: 'error',
        })
      )
      console.error('Error creating storage:', error)
    },
  })

  const deleteAllMutation = useMutation({
    mutationFn: () => storagesService.removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
      console.log('Storages deleted')
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: 'Database Error',
          message: 'Failed to delete all storages from the database',
          status: 'error',
        })
      )
      console.error('Error deleting storages:', error)
    },
  })

  const createStorage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    const aisle = parseInt(
      (form.elements.namedItem('aisle') as HTMLInputElement).value,
      10
    )

    const col = (form.elements.namedItem('column') as HTMLInputElement).value

    const shelf = parseInt(
      (form.elements.namedItem('shelf') as HTMLInputElement).value,
      10
    )

    const newStorage: CreateStorageType = {
      aisle,
      col,
      shelf,
    }

    createStorageMutation.mutate(newStorage)
  }

  const deleteAllStorages = () => {
    deleteAllMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching Storage data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={storages} columns={columns} search={false} />

      <form onSubmit={createStorage} className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="aisle"
            name="aisle"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="column"
            name="column"
          />
          <input
            className="p-2 border-b-2 border-gray-300"
            type="text"
            placeholder="shelf"
            name="shelf"
          />
        </div>
        <div className="flex gap-x-4 justify-between">
          <Button type="submit" text="Create storage" onClick={() => {}} />
          <Button text="Delete all storages" onClick={deleteAllStorages} />
        </div>
      </form>
    </div>
  )
}

export default StorageTable
