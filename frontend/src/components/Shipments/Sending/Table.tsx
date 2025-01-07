import { TableRow, TableCell, Table, TableHead, TableBody } from '@mui/material'
import { useEffect, useState } from 'react'
import CrateRow from '../../Inventory/Crates/CrateRow'
import { Header, Subtext } from '../../ATEC UI/Text'
import { useQuery } from '@tanstack/react-query'
import { CrateType } from '../../../types/crate'
import { MaterialType } from '../../../types/material'
import materialsService from '../../../services/materialsService'

interface CratesTableProps {
  crates: CrateType[]
}

const CratesTable = ({ crates }: CratesTableProps) => {
  const [filteredCrates, setFilteredCrates] = useState<CrateType[]>([])

  const {
    data: materials = [],
    isLoading: isMaterialsLoading,
    isError: isMaterialsError,
  } = useQuery<MaterialType[]>({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    if (crates.length > 0) {
      setFilteredCrates(crates)
    }
  }, [crates])

  if (isMaterialsLoading) {
    return <div>Loading...</div>
  }

  if (isMaterialsError) {
    return <div>Error fetching data.</div>
  }

  const handleFilterChange = (filter: string) => {
    if (filter === 'empty') {
      filterCrates(filter)
      return
    }

    const materialId = parseInt(filter)
    if (!isNaN(materialId)) {
      const material = materials.find((material) => material.id === materialId)

      if (!material) {
        console.log(
          `Could not find a material with the id ${materialId} in the materials list`
        )
        return
      }

      filterCrates(material)
      return
    } else {
      filterCrates('all')
    }
  }

  const filterCrates = (filter: MaterialType | string) => {
    let filteredCrates: CrateType[] = crates

    // Filter for empty crates
    if (filter === 'empty') {
      filteredCrates = crates.filter((crate) => crate.stock.length === 0)
    }

    // Filter by material
    if (typeof filter === 'object' && 'id' in filter) {
      filteredCrates = crates.filter((crate) =>
        crate.stock.some((stock) => stock.material.id === filter.id)
      )
    }

    // Reset to show all crates when 'all' is selected
    if (filter === 'all') {
      filteredCrates = crates
    }

    setFilteredCrates(filteredCrates)
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-end items-center gap-x-4">
        <Header text="Filter" className="col-span-2" />

        <select
          name="filter"
          className="border border-gray-300 rounded p-2 w-full"
          onChange={(event) => {
            handleFilterChange(event.target.value)
          }}
        >
          <option key={'all'} value={'all'}>
            All crates
          </option>
          <option key={'empty'} value={'empty'}>
            Empty crates
          </option>

          <optgroup label="Contains...">
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.description} {}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {filteredCrates.length ? (
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell />
              <TableCell>Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Project</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCrates.map((crate) => (
              <CrateRow crate={crate} key={crate.id} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Subtext text="There are no crates that match the filter criteria" />
      )}
    </>
  )
}

export default CratesTable
