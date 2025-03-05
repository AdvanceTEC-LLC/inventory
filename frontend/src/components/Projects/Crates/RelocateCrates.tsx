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
import { useState } from 'react'
import { CrateType } from '../../../types/crate'
import { useWarehouseLocations } from '../../../hooks/useWarehouseLocationsHook'
import { WarehouseLocationType } from '../../../types/warehouseLocation'
import { ShelfLocationType } from '../../../types/shelfLocation'
import ShelfLocationDropdowns from './ShelfLocationDropdowns'
import { StagingAreaType } from '../../../types/stagingArea'
import StagingAreaSelector from './StagingAreaSelector'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import cratesService from '../../../services/cratesService'
import { AppDispatch } from '../../../store'

interface RelocateCratesProps {
  crates: CrateType[]
}

const RelocateCrates = ({ crates }: RelocateCratesProps) => {
  const [open, setOpen] = useState(false)
  const [warehouseLocation, setWarehouseLocation] =
    useState<WarehouseLocationType>()
  const [shelfLocation, setShelfLocation] = useState<ShelfLocationType>()
  const [stagingArea, setStagingArea] = useState<StagingAreaType>()

  const {
    data: warehouseLocations = [],
    isLoading,
    error,
  } = useWarehouseLocations()

  const filteredLocations = warehouseLocations.filter(
    (location) =>
      location.name.includes('Shel') || location.name.includes('Staging')
  )

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const bulkUpdateCratesMutation = useMutation({
    mutationFn: (crates: CrateType[]) => cratesService.bulkUpdate(crates),
    onSuccess: async () => {
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
    setWarehouseLocation(undefined)
    setShelfLocation(undefined)
    setStagingArea(undefined)
  }

  const handleSubmit = () => {
    if (!warehouseLocation) return

    const updatedCrates = crates.map((crate) => {
      return {
        ...crate,
        warehouseLocation,
        shelfLocation:
          warehouseLocation.name.includes('Shel') && shelfLocation
            ? shelfLocation
            : undefined,
        stagingArea: warehouseLocation.name.includes('Staging')
          ? stagingArea
          : undefined,
      }
    })

    bulkUpdateCratesMutation.mutate(updatedCrates)
  }

  const handleWarehouseLocationChange = (
    newValue: WarehouseLocationType | null
  ) => {
    setWarehouseLocation(newValue ?? undefined)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={crates.length == 0}
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
          Relocating {crates.length} Crate{crates.length > 1 ? 's' : ''}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <Autocomplete
                sx={{ marginTop: 1 }}
                options={filteredLocations}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={warehouseLocation ?? null}
                onChange={(_event, newValue) => {
                  handleWarehouseLocationChange(newValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Warehouse Location" />
                )}
                noOptionsText={
                  isLoading
                    ? 'Loading...'
                    : error
                    ? 'Error fetching data'
                    : `No warehouse locations available`
                }
              />
            </FormControl>

            {warehouseLocation?.name.includes('Shel') && (
              <ShelfLocationDropdowns setShelfLocation={setShelfLocation} />
            )}

            {warehouseLocation?.name.includes('Staging') && (
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

export default RelocateCrates
