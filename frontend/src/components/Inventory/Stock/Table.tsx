import { useEffect, useState } from 'react'

// Table
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './columns'
import { StockType } from '../../../types/stock'
import { Header } from '../../ATEC UI/Text'

// Queries
import { useQuery } from '@tanstack/react-query'
import cratesService from '../../../services/cratesService'
import { CrateType } from '../../../types/crate'
import projectsService from '../../../services/projectsService'
import { ProjectType } from '../../../types/project'
import stockService from '../../../services/stockService'

const paginationModel = { page: 0, pageSize: 5 }

const StockTable = () => {
  const [filteredStock, setFilteredStock] = useState<StockType[]>([])
  const [totalStock, setTotalStock] = useState<StockType[]>([])

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

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
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

      setTotalStock((prevState) => {
        // Avoid unnecessary state update if the totalStock is the same
        if (JSON.stringify(prevState) !== JSON.stringify(totalStockArray)) {
          return totalStockArray
        }
        return prevState
      })

      setFilteredStock((prevState) => {
        // Avoid unnecessary state update if the filteredStock is the same
        if (JSON.stringify(prevState) !== JSON.stringify(totalStockArray)) {
          return totalStockArray
        }
        return prevState
      })
    }
  }, [stock])

  if (isStockLoading || isCratesLoading || isProjectsLoading) {
    return <div>Loading...</div>
  }

  if (isStockError || isCratesError || isProjectsError) {
    return <div>Error fetching data.</div>
  }

  const handleFilterChange = (filter: string) => {
    if (typeof filter === 'string') {
      filterStock(filter)
      return
    }

    const projectId = parseInt(filter)
    if (!isNaN(projectId)) {
      const project = projects.find((project) => project.id === projectId)

      if (!project) {
        console.log(
          `Could not find a project with the id ${projectId} in the projects list`
        )
        return
      }

      filterStock(project)
      return
    } else {
      filterStock('total')
    }
  }

  const filterStock = (filter: ProjectType | string) => {
    if (filter === 'total') {
      setFilteredStock(totalStock)
      return
    }

    let filteredCrates: CrateType[] = crates

    if (filter === 'unassigned') {
      filteredCrates = crates.filter((crate) => crate.project.id === null)
    }

    if (typeof filter === 'object' && 'id' in filter) {
      filteredCrates = crates.filter((crate) => crate.project.id === filter.id)
    }

    setFilteredStock(filteredCrates.flatMap((crate) => crate.stock))
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-end items-center gap-x-4">
        <Header text="Filter" className="col-span-2" />

        <select
          name="filter"
          className="border border-gray-300 rounded p-2 w-full"
          onChange={(event) => {
            handleFilterChange(event.target.value)
          }}
        >
          <optgroup label="Stock Types">
            <option key={'total'} value={'total'}>
              Total Stock
            </option>
            <option key={'unassigned'} value={'unassigned'}>
              Unassigned Stock
            </option>
          </optgroup>

          <optgroup label="Projects">
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.number} {project.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <DataGrid
        rows={filteredStock}
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
