import { ProjectType } from '../../../types/project'
import { useQuery } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'
import { useState } from 'react'
import CratesTable from './CratesTable'
import FetchAutocomplete from '../../FetchAutocomplete'
import { CrateLocationEnum, CrateType } from '../../../types/crate'
import cratesService from '../../../services/cratesService'
import { Autocomplete, TextField } from '@mui/material'
import Button from '../../ATEC UI/Button'
import { CreateShipmentType } from '../../../types/shipment'

const SendingShipmentForm = () => {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [crate, setCrate] = useState<CrateType | null>(null)
  const [filteredCrates, setFilteredCrates] = useState<CrateType[] | null>(null)
  const [shipment, setShipment] = useState<CreateShipmentType>()

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

    // TODO: Consider limiting crates to only those in the staging areas
    const cratesInWarehouse = projectCrates.filter((crate) =>
      [CrateLocationEnum.StagingZone1, CrateLocationEnum.StagingZone2].includes(
        crate.location
      )
    )

    setFilteredCrates(cratesInWarehouse)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data.</div>
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
        <CratesTable crates={[crate]} />
      ) : (
        filteredCrates &&
        filteredCrates.length > 0 && (
          <CratesTable crates={filteredCrates ?? []} />
        )
      )}

      <Button
        text={'Send Shipment'}
        onClick={() => {
          console.log('DEBUG: Shipment sent')
        }}
        disabled={shipment === undefined}
      />
    </>
  )
}

export default SendingShipmentForm
