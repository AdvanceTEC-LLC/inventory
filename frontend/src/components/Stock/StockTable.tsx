import { useEffect, useState } from 'react'

// Table
import { DataGrid } from '@mui/x-data-grid'
import { StockType } from '../../types/stock'

// Queries
import { ProjectType } from '../../types/project'
import { manufacturer, name, quantity, unit } from '../Tables/Columns/stock'
import { useStock } from '../../hooks/useStockHook'
import ProjectSelector from './ProjectSelector'

const paginationModel = { page: 0, pageSize: 5 }

const columns = [name, manufacturer, unit, quantity]

const StockTable = () => {
  const [filteredAndGroupedStock, setFilteredAndGroupedStock] = useState<
    StockType[]
  >([])
  const [project, setProject] = useState<ProjectType>()

  const { data: stock = [] } = useStock()

  const getFilteredAndGroupedStock = () => {
    const filteredStock = getFilteredStock()
    const filteredAndGroupedStock = getGroupedStock(filteredStock)
    setFilteredAndGroupedStock(filteredAndGroupedStock)
  }

  const getFilteredStock = () => {
    if (!project) return stock

    const filteredStock = stock.filter((item) => item.project.id === project.id)

    return filteredStock
  }

  const getGroupedStock = (filteredStock: StockType[]) => {
    const groupedStock = filteredStock.reduce(
      (acc: Record<number, StockType>, item) => {
        const materialId = item.material.id

        // Initialize a new StockType object if not already present
        acc[materialId] = {
          id: item.id,
          material: item.material,
          project: item.project,
          quantity: 0, // Start with zero to sum later
        }

        // Sum the quantities for the same material ID
        acc[materialId].quantity += item.quantity

        return acc
      },
      {}
    )

    // Convert the grouped object back into an array
    const groupedStockArray = Object.values(groupedStock)

    return groupedStockArray
  }

  useEffect(() => {
    getFilteredAndGroupedStock()
  }, [stock, project])

  return (
    <div className="flex flex-col gap-y-4">
      <ProjectSelector project={project} setProject={setProject} />

      <DataGrid
        rows={filteredAndGroupedStock}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default StockTable
