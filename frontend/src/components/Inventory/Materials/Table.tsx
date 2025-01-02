// Table
import Table from '../../Table'
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import materialsService from '../../../services/materialsService'
import { MaterialType } from '../../../types/material'

const MaterialsTable = () => {
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

export default MaterialsTable
