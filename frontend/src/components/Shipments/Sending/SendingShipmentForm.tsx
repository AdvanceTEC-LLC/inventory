import { ProjectType } from '../../../types/project'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'
import { useState } from 'react'
import CratesTable from './CratesTable'
import FetchAutocomplete from '../../FetchAutocomplete'
import { CrateType } from '../../../types/crate'
import cratesService from '../../../services/cratesService'
import { Autocomplete, Container, TextField } from '@mui/material'
import Button from '../../ATEC UI/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { NewSentShipmentType } from '../../../types/sentShipment'
import { NewShipmentType } from '../../../types/shipment'
import sentShipmentsService from '../../../services/sentShipmentsService'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { setProject } from '../../../reducers/projectReducer'
import { Title, Subtitle } from '../../ATEC UI/Text'
import { StagingAreaType } from '../../../types/stagingArea'
import stagingAreasService from '../../../services/stagingAreasService'

const SendingShipmentForm = () => {
  const [stagingArea, setStagingArea] = useState<StagingAreaType>()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const {
    data: stagingAreas = [],
    isLoading,
    isError,
  } = useQuery<StagingAreaType[]>({
    queryKey: ['stagingAreas'],
    queryFn: stagingAreasService.getAll,
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

  const sendShipment = () => {
    if (!stagingArea) return
    if (!stagingArea.project) return

    const trackingNumber = 1

    const sendDate = new Date()

    const project: ProjectType = stagingArea.project

    const cratesInStagingArea = crates.filter(
      (crate) => crate.stagingArea && crate.stagingArea.id === stagingArea.id
    )

    const shipment: NewShipmentType = {
      trackingNumber,
      project,
      crates: cratesInStagingArea,
    }

    const sentShipment: NewSentShipmentType = {
      sendDate,
      shipment,
      delivered: false,
    }

    createShipmentMutation.mutate(sentShipment)
  }

  const createShipmentMutation = useMutation({
    mutationFn: (shipment: NewSentShipmentType) =>
      sentShipmentsService.create(shipment),
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
  })

  return (
    <>
      <Autocomplete
        fullWidth
        options={stagingAreas.filter((area) => area.project != null)}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={stagingArea}
        onChange={(_event, newValue) => {
          setStagingArea(newValue ?? undefined)
        }}
        renderInput={(params) => (
          <TextField {...params} label={'Staging Area'} />
        )}
        noOptionsText={
          isLoading
            ? 'Loading...'
            : isError
            ? 'Error fetching data'
            : `No staging areas ready for shipping`
        }
      />

      <Button
        text={'Send Shipment'}
        onClick={sendShipment}
        disabled={stagingArea === undefined}
      />
    </>
  )
}

export default SendingShipmentForm
