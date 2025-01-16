import { TableRow, TableCell, Table, TableHead, TableBody } from '@mui/material'
import { useEffect, useState } from 'react'
import CrateRow from './CrateRow'
import { Subtext } from '../../ATEC UI/Text'
import { useQuery } from '@tanstack/react-query'
import cratesService from '../../../services/cratesService'
import { CrateType } from '../../../types/crate'
import { MaterialType } from '../../../types/material'
import materialsService from '../../../services/materialsService'
import FetchAutocomplete from '../../FetchAutocomplete'

const CratesTable = () => {
  const [filteredCrates, setFilteredCrates] = useState<CrateType[]>([])

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
    if (crates.length > 0) {
      setFilteredCrates(crates)
    }
  }, [crates])

  const setFilter = (material: MaterialType | null) => {
    if (!material) {
      setFilteredCrates(crates)
      return
    }

    const cratesContainingMaterial = crates.filter((crate) =>
      crate.stock.some((stock) => stock.material.id === material.id)
    )

    setFilteredCrates(cratesContainingMaterial)
  }

  if (isCratesLoading) {
    return <div>Loading...</div>
  }

  if (isCratesError) {
    return <div>Error fetching data.</div>
  }

  return (
    <>
      <FetchAutocomplete
        setFilter={setFilter}
        service={materialsService}
        queryKey={'materials'}
        label={'Materials'}
        getOptionLabel={(option: MaterialType): string =>
          `${option.partNumber} ${option.description}`
        }
        isOptionEqualToValue={(option: MaterialType, value: MaterialType) =>
          option.id === value.id
        }
      />

      {filteredCrates.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Vendor</TableCell>
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
