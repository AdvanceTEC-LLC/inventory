import { Autocomplete, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import cratesService from '../../../services/cratesService'
import projectsService from '../../../services/projectsService'
import { CrateType } from '../../../types/crate'
import { ProjectType } from '../../../types/project'
import Button from '../../ATEC UI/Button'
import FetchAutocomplete from '../../FetchAutocomplete'
import CratesTable from './CratesTable'

const StageCrates = () => {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [crate, setCrate] = useState<CrateType | null>(null)
  const [filteredCrates, setFilteredCrates] = useState<CrateType[]>([])
  const [selectedCrates, setSelectedCrates] = useState<CrateType[]>([])

  const {
    data: crates = [],
    isLoading,
    isError,
  } = useQuery<CrateType[]>({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleProjectChange = (destinationProject: ProjectType | null) => {
    setProject(destinationProject)
    if (!destinationProject) return

    const projectCrates = crates.filter(
      (crate) => crate.project.number === destinationProject.number
    )

    const stagedCrates = projectCrates.filter(
      (crate) => crate.stagingArea != null
    )

    setFilteredCrates(stagedCrates)
    setSelectedCrates([])
  }

  const onCrateSelect = (selectedCrate: CrateType) => {
    const newSelectedCrates = selectedCrates.includes(selectedCrate)
      ? selectedCrates.filter((crate) => crate.id !== selectedCrate.id)
      : [...selectedCrates, selectedCrate]

    setSelectedCrates(newSelectedCrates)
  }

  const stageCrates = () => {
    // This should mutate all of the seleted crates and change their warehouse location to staging and give them the staging area id of the selected staging area
  }

  return (
    <>
      <FetchAutocomplete
        setFilter={handleProjectChange}
        service={projectsService}
        queryKey={'projects'}
        label={'Destination Project'}
        getOptionLabel={(option) => `${option.number} ${option.name}` || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      {project && filteredCrates && (
        <Autocomplete
          fullWidth
          options={filteredCrates}
          getOptionLabel={(option) => option.number || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={crate}
          onChange={(_event, newValue) => {
            setCrate(newValue)
          }}
          renderInput={(params) => (
            <TextField {...params} label={'Find Crate'} />
          )}
          noOptionsText={
            isLoading
              ? 'Loading...'
              : isError
              ? 'Error fetching data'
              : `No crates in staging areas for this project`
          }
        />
      )}

      {crate ? (
        <CratesTable
          selectedCrates={selectedCrates}
          setSelectedCrates={setSelectedCrates}
          onSelect={onCrateSelect}
          crates={[crate]}
        />
      ) : (
        filteredCrates &&
        filteredCrates.length > 0 && (
          <CratesTable
            selectedCrates={selectedCrates}
            setSelectedCrates={setSelectedCrates}
            onSelect={onCrateSelect}
            crates={filteredCrates ?? []}
          />
        )
      )}

      <Button
        text={'Stage Crates'}
        onClick={stageCrates}
        disabled={selectedCrates.length === 0}
      />
    </>
  )
}

export default StageCrates
