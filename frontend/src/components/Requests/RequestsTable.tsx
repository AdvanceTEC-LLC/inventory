// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import requestsService from '../../services/requestsService'
import { CreateRequestType, RequestType } from '../../types/request'

const columnHelper = createColumnHelper<RequestType>()

const columns = [
  {
    header: 'Requests',
    columns: [
      columnHelper.accessor('id', {
        header: () => 'Id',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: 'Project',
    columns: [
      columnHelper.accessor('project.number', {
        header: () => 'Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('project.name', {
        header: () => 'Name',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const RequestsTable = () => {
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery<RequestType[]>({
    queryKey: ['requests'],
    queryFn: requestsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching request data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={requests} columns={columns} search={false} />
    </div>
  )
}

export default RequestsTable
