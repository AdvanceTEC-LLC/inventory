import { useEffect, useState } from 'react'

// Table
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { columns } from './columns'
import { StockType } from '../../types/stock'

// Queries
import { useQuery } from '@tanstack/react-query'
import cratesService from '../../services/cratesService'
import { CrateType } from '../../types/crate'
import { ProjectType } from '../../types/project'
import stockService from '../../services/stockService'
import FetchAutocomplete from '../FetchAutocomplete'
import projectsService from '../../services/projectsService'

const paginationModel = { page: 0, pageSize: 5 }

const MaterialsTable = () => {
  const [filteredStock, setFilteredStock] = useState<StockType[]>([])

  const {
    data: stock = [],
    isLoading: isStockLoading,
    isError: isStockError,
  } = useQuery<StockType[]>({
    queryKey: ['stock'],
    queryFn: stockService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const {
    data: crates = [],
    isLoading: isCratesLoading,
    isError: isCratesError,
  } = useQuery<CrateType[]>({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    if (stock) {
      const groupedStock = stock.reduce(
        (acc: Record<number, StockType>, item) => {
          const materialId = item.material.id

          if (!acc[materialId]) {
            // Initialize a new StockType object if not already present
            acc[materialId] = {
              id: item.id, // Keep one of the IDs; this can be adjusted if needed
              material: item.material,
              quantity: 0, // Start with zero to sum later
            }
          }

          // Sum the quantities for the same material ID
          acc[materialId].quantity += item.quantity

          return acc
        },
        {}
      )

      // Convert the grouped object back into an array
      const totalStockArray = Object.values(groupedStock)

      setFilteredStock((prevState) => {
        // Avoid unnecessary state update if the filteredStock is the same
        if (JSON.stringify(prevState) !== JSON.stringify(totalStockArray)) {
          return totalStockArray
        }
        return prevState
      })
    }
  }, [stock])

  if (isStockLoading || isCratesLoading) {
    return <div>Loading...</div>
  }

  if (isStockError || isCratesError) {
    return <div>Error fetching data.</div>
  }

  const setFilter = (filter: ProjectType | null) => {
    if (!filter) {
      setFilteredStock(crates.flatMap((crate) => crate.stock))
      return
    }

    const filteredCrates = crates.filter(
      (crate) => crate.project.id === filter.id
    )

    setFilteredStock(filteredCrates.flatMap((crate) => crate.stock))
  }

  return (
    <div className="flex flex-col gap-y-4">
      <FetchAutocomplete
        setFilter={setFilter}
        service={projectsService}
        queryKey={'projects'}
        label={'Projects'}
        getOptionLabel={(option: ProjectType): string =>
          `${option.number} ${option.name}`
        }
        isOptionEqualToValue={(option: ProjectType, value: ProjectType) =>
          option.id === value.id
        }
      />

      <DataGrid
        rows={filteredStock}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  )
}

export default MaterialsTable
