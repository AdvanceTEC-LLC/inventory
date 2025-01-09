// Table
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

const paginationModel = { page: 0, pageSize: 5 }

interface TableProps<T extends object> {
  title: string
  columns: GridColDef[]
  service: {
    getAll: () => Promise<T[]>
  }
}

const Table = <T extends object>({
  title,
  columns,
  service,
}: TableProps<T>) => {
  const { data, isLoading, isError } = useQuery<T[]>({
    queryKey: [`${title.toLowerCase()}`],
    queryFn: service.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching {title.toLowerCase()} data.</div>
  }

  return (
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default Table
