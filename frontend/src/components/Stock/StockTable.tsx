import { useEffect, useState } from 'react'

// Table
import { DataGrid } from '@mui/x-data-grid'
import { StockType } from '../../types/stock'

// Queries
import { ProjectType } from '../../types/project'
import { manufacturer, name, quantity, unit } from '../Tables/Columns/stock'
import { useStock } from '../../hooks/useStockHook'
import ProjectSelector from './ProjectSelector'
import { pageSizeOptions, paginationModel } from '../Tables/pagination'

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

        // Initialize the stock if it doesn't exist yet, otherwise add the quantity
        if (!Object.prototype.hasOwnProperty.call(acc, materialId)) {
          acc[materialId] = {
            id: item.id,
            material: item.material,
            project: item.project,
            quantity: item.quantity, // Initialize with the first quantity value
          }
        } else {
          acc[materialId].quantity += item.quantity // If exists, add to the existing quantity
        }

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
        pageSizeOptions={pageSizeOptions}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default StockTable
