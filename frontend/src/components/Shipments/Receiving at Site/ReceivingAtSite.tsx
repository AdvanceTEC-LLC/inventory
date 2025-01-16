import { useState } from 'react'
import { ShipmentType } from '../../../types/shipment'
import Container from '../../ATEC UI/Container'
import { Subtext, Subtitle, Title } from '../../ATEC UI/Text'
import FetchAutocomplete from '../../FetchAutocomplete'
import shipmentsService from '../../../services/shipmentsService'
import Shipment from './Shipment'
import projectsService from '../../../services/projectsService'
import { ProjectType } from '../../../types/project'
import { Autocomplete, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Button from '../../ATEC UI/Button'

const ReceivingAtSite = () => {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [shipment, setShipment] = useState<ShipmentType | null>(null)
  const [filteredShipments, setFilteredShipments] = useState<
    ShipmentType[] | null
  >(null)

  const {
    data: shipments = [],
    isLoading,
    isError,
  } = useQuery<ShipmentType[]>({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleProjectChange = (projectSite: ProjectType | null) => {
    setProject(projectSite)
    if (!projectSite) return

    const projectShipments = shipments.filter(
      (shipment) =>
        shipment.project.number === projectSite.number &&
        shipment.crates.some((crate) => crate.location === 'In Transit')
    )

    setFilteredShipments(projectShipments)
  }

  return (
    <Container>
      <Title text={'Receiving Shipments at Site'} />
      <Subtitle text="Confirm shipments received at project site" />

      <FetchAutocomplete
        setFilter={handleProjectChange}
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

      {project && filteredShipments && (
        <Autocomplete
          fullWidth
          options={filteredShipments}
          getOptionLabel={(option) => `${option.id}` || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={shipment}
          onChange={(_event, newValue) => {
            setShipment(newValue)
          }}
          renderInput={(params) => (
            <TextField {...params} label={'Find Shipment'} />
          )}
          noOptionsText={
            isLoading
              ? 'Loading...'
              : isError
              ? 'Error fetching data'
              : `No shipments in transit to site`
          }
        />
      )}

      {shipment && <Shipment shipment={shipment} />}

      <Button
        text={'Shipment Received'}
        onClick={() => {
          console.log('DEBUG: Shipment received')
        }}
        disabled={shipment === null}
      />
    </Container>
  )
}

export default ReceivingAtSite
