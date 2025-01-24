import { ProjectType } from '../../../types/project'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'
import { useState } from 'react'
import CratesTable from './CratesTable'
import FetchAutocomplete from '../../FetchAutocomplete'
import { CrateType } from '../../../types/crate'
import cratesService from '../../../services/cratesService'
import { Autocomplete, TextField } from '@mui/material'
import Button from '../../ATEC UI/Button'
import shipmentsService from '../../../services/shipmentsService'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { AppDispatch } from '../../../store'
import { NewSentShipmentType } from '../../../types/sentShipment'

const SendingShipmentForm = () => {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [crate, setCrate] = useState<CrateType | null>(null)
  const [filteredCrates, setFilteredCrates] = useState<CrateType[] | null>(null)
  const [selectedCrates, setSelectedCrates] = useState<CrateType[]>([])

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: crates = [],
    isLoading,
    isError,
  } = useQuery<CrateType[]>({
    queryKey: ['crates'],
    queryFn: cratesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  /*const handleProjectChange = (destinationProject: ProjectType | null) => {
    setProject(destinationProject)
    if (!destinationProject) return

    const projectCrates = crates.filter(
      (crate) => crate.project.number === destinationProject.number
    )

    const cratesInWarehouse = projectCrates.filter((crate) =>
      [CrateLocationEnum.StagingZone1, CrateLocationEnum.StagingZone2].includes(
        crate.location
      )
    )

    setFilteredCrates(cratesInWarehouse)
    setSelectedCrates([])
  }

  const onCrateSelect = (selectedCrate: CrateType) => {
    const newSelectedCrates = selectedCrates.includes(selectedCrate)
      ? selectedCrates.filter((crate) => crate.id !== selectedCrate.id)
      : [...selectedCrates, selectedCrate]

    setSelectedCrates(newSelectedCrates)
  }

  const sendShipment = () => {
    if (!project) {
      console.log('Cannot send a shipment without a project')
      return
    }

    const date = new Date()
    console.log(date)

    const shipment: NewSentShipmentType = {
      sendDate: date,
      project: project,
      crates: selectedCrates,
      vendor: selectedCrates[0].vendor, // REMOVE THIS IN THE FUTURE, WE HAVE TO MAKE SEPARATE SHIPMENT TYPES FOR SENDINGA ND RECEIVING SHIPMENTS THEY ARE JUST TOO DIFFERENT
    }

    createShipmentMutation.mutate(shipment)
  }

  const createShipmentMutation = useMutation({
    mutationFn: (shipment: CreateShipmentType) =>
      shipmentsService.create(shipment),
    onMutate: () => {
      dispatch(
        notifyWithTimeout({
          title: 'Processing...',
          message: 'Your shipment is being processed.',
          status: 'info',
        })
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      const { name, message } = error
      dispatch(
        notifyWithTimeout({
          title: name,
          message: message,
          status: 'error',
        })
      )
    },
  })*/

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
        text={'Send Shipment'}
        onClick={sendShipment}
        disabled={selectedCrates.length === 0}
      />
    </>
  )
}

export default SendingShipmentForm
