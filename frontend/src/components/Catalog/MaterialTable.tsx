// Table
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../Table'

// Queries
import { useQuery } from '@tanstack/react-query'
import materialsService from '../../services/materialsService'
import { MaterialType } from '../../types/material'

const columnHelper = createColumnHelper<MaterialType>()

const columns = [
  {
    header: 'Materials',
    columns: [
      columnHelper.accessor('partNumber', {
        header: () => 'Part Number',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('description', {
        header: () => 'Description',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('color', {
        header: () => 'Color',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vendor.name', {
        header: () => 'Vendor',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('tag', {
        header: () => 'Tag',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('thicknessInches', {
        header: () => 'Thickness',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('widthInches', {
        header: () => 'Width',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('lengthInches', {
        header: () => 'Length',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('squareFeet', {
        header: () => 'Square Feet',
        cell: (info) => info.getValue(),
      }),
    ],
  },
]

const MaterialTable = () => {
  const {
    data: materials = [],
    isLoading,
    isError,
  } = useQuery<MaterialType[]>({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching materials data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table data={materials} columns={columns} search={false} />
    </div>
  )
}

export default MaterialTable
