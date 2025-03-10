import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Autocomplete,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import { useCrateLocations } from '../../../hooks/useCrateLocationsHook'
import { ShelfLocationType } from '../../../types/shelfLocation'
import ShelfLocationDropdowns from '../ShelfLocationDropdowns'
import { StagingAreaType } from '../../../types/stagingArea'
import StagingAreaSelector from './StagingAreaSelector'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import assemblyCratesService from '../../../services/assemblyCratesService'
import { AppDispatch } from '../../../store'
import { CrateLocationType } from '../../../types/crateLocation'
import { useSelectedAssemblyCrates } from './SelectedAssemblyCratesContext'

const RelocateAssemblyCrates = () => {
  const [open, setOpen] = useState(false)
  const [crateLocation, setCrateLocation] = useState<CrateLocationType>()
  const [shelfLocation, setShelfLocation] = useState<ShelfLocationType>()
  const [stagingArea, setStagingArea] = useState<StagingAreaType>()
  const [stagingAllowed, setStagingAllowed] = useState<boolean>()

  const { selectedAssemblyCrates } = useSelectedAssemblyCrates()

  const { data: crateLocations = [], isLoading, error } = useCrateLocations()

  useEffect(() => {
    const selectedProjects = selectedAssemblyCrates.map(
      (assemblyCrate) => assemblyCrate.crate.project.id
    )

    const uniqueProjects = new Set(selectedProjects)

    setStagingAllowed(uniqueProjects.size === 1)
  }, [selectedAssemblyCrates])

  const filteredLocations = crateLocations.filter(
    (location) =>
      location.name.includes('Shel') ||
      (stagingAllowed && location.name.includes('Staging'))
  )

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const bulkUpdateAssemblyCratesMutation = useMutation({
    mutationFn: (assemblyCrates: AssemblyCrateType[]) =>
      assemblyCratesService.bulkUpdate(assemblyCrates),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['assemblyCrates'] })
      await queryClient.invalidateQueries({ queryKey: ['crates'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Crate locations updated.',
          status: 'success',
        })
      )
      handleClose()
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: error.name,
          message: error.message,
          status: 'error',
        })
      )
    },
  })

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setCrateLocation(undefined)
    setShelfLocation(undefined)
    setStagingArea(undefined)
  }

  const handleSubmit = () => {
    if (!crateLocation) return

    const updatedAssemblyCrates = selectedAssemblyCrates.map(
      (assemblyCrate) => {
        return {
          ...assemblyCrate,
          crate: {
            ...assemblyCrate.crate,
            crateLocation,
            shelfLocation:
              crateLocation.name.includes('Shel') && shelfLocation
                ? shelfLocation
                : undefined,
          },
          stagingArea: crateLocation.name.includes('Staging')
            ? stagingArea
            : undefined,
        }
      }
    )

    bulkUpdateAssemblyCratesMutation.mutate(updatedAssemblyCrates)
    console.log(updatedAssemblyCrates)
  }

  const handlecrateLocationChange = (newValue: CrateLocationType | null) => {
    setCrateLocation(newValue ?? undefined)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button
        fullWidth
        onClick={handleOpen}
        disabled={selectedAssemblyCrates.length === 0}
      >
        Relocate Selected
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>
          Relocating {selectedAssemblyCrates.length} Crate
          {selectedAssemblyCrates.length > 1 ? 's' : ''}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <Autocomplete
                sx={{ marginTop: 1 }}
                options={filteredLocations}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={crateLocation ?? null}
                onChange={(_event, newValue) => {
                  handlecrateLocationChange(newValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Crate Location" />
                )}
                noOptionsText={
                  isLoading
                    ? 'Loading...'
                    : error
                    ? 'Error fetching data'
                    : `No crate locations available`
                }
              />
            </FormControl>

            {crateLocation?.name.includes('Shel') && (
              <ShelfLocationDropdowns setShelfLocation={setShelfLocation} />
            )}

            {crateLocation?.name.includes('Staging') && (
              <StagingAreaSelector
                stagingArea={stagingArea}
                setStagingArea={setStagingArea}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RelocateAssemblyCrates
