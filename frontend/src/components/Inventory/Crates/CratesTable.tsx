import { TableRow, TableCell, Table, TableHead, TableBody } from '@mui/material'
import { useEffect, useState } from 'react'
import CrateRow from './CrateRow'
import { Subtext } from '../../ATEC UI/Text'
import { useQuery } from '@tanstack/react-query'
import cratesService from '../../../services/cratesService'
import { CrateType } from '../../../types/crate'
import FetchAutocomplete from '../../FetchAutocomplete'
import projectsService from '../../../services/projectsService'
import { ProjectType } from '../../../types/project'

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

  const handleProjectChange = (project: ProjectType | null) => {
    if (!project) return

    const projectCrates = crates.filter(
      (crate) => crate.project.number === project.number
    )

    setFilteredCrates(projectCrates)
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
        setFilter={handleProjectChange}
        service={projectsService}
        queryKey={'projects'}
        label={'Project'}
        getOptionLabel={(option) => `${option.number} ${option.name}` || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
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
