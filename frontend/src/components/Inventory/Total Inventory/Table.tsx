// Table
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import stockService from '../../../services/stockService'
import { StockType } from '../../../types/stock'

const paginationModel = { page: 0, pageSize: 5 }

const TotalInventoryTable = () => {
  const {
    data: stock = [],
    isLoading,
    isError,
  } = useQuery<StockType[]>({
    queryKey: ['stock'],
    queryFn: stockService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching stock data.</div>
  }

  return (
    <DataGrid
      rows={stock}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default TotalInventoryTable
