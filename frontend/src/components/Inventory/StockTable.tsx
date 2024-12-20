// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useQuery } from '@tanstack/react-query'
import stockService from '../../services/stockService'
import { StockType } from '../../types/stock'

const columnHelper = createColumnHelper<StockType>()

const columns = [
  {
    header: 'Stock',
    columns: [
      columnHelper.accessor('material.partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.description', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.vendor.name', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('material.thicknessInches', {
        header: () => 'Size',
        cell: ({ row }) => {
          const { thicknessInches, widthInches, lengthInches } =
            row.original.material
          return `${thicknessInches || ''}T x ${widthInches || ''}W x ${
            lengthInches || ''
          }L`
        },
      }),

      columnHelper.accessor('material.squareFeet', {
        header: () => 'Square Feet',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('quantity', {
        header: () => 'Quantity',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const StockTable = () => {
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
    <div className="flex flex-col gap-y-4">
      <Table data={stock} columns={columns} search={false} />
    </div>
  )
}

export default StockTable
