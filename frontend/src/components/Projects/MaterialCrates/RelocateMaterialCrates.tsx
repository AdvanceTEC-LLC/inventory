import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { MaterialCrateType } from '../../../types/materialCrate'
import { ShelfLocationType } from '../../../types/shelfLocation'
import ShelfLocationDropdowns from '../ShelfLocationDropdowns'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { AppDispatch } from '../../../store'
import { useCrateLocations } from '../../../hooks/useCrateLocationsHook'
import cratesService from '../../../services/cratesService'
import { CrateType } from '../../../types/crate'

interface RelocateMaterialCratesProps {
  materialCrates: MaterialCrateType[]
}

const RelocateMaterialCrates = ({
  materialCrates,
}: RelocateMaterialCratesProps) => {
  const [open, setOpen] = useState(false)
  const [shelfLocation, setShelfLocation] = useState<ShelfLocationType>()

  const { data: crateLocations = [] } = useCrateLocations()

  const shelfCrateLocation = crateLocations.find((crateLocation) =>
    crateLocation.name.includes('Shelves')
  )

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const bulkUpdateCratesMutation = useMutation({
    mutationFn: (crates: CrateType[]) => cratesService.bulkUpdate(crates),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['materialCrates'] })
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
    setShelfLocation(undefined)
  }

  const handleSubmit = () => {
    if (!shelfLocation || !shelfCrateLocation) return

    const updatedCrates = materialCrates.map((materialCrate) => {
      return {
        ...materialCrate.crate,
        crateLocation: shelfCrateLocation,
        shelfLocation: shelfLocation,
      }
    })

    bulkUpdateCratesMutation.mutate(updatedCrates)

    console.log(updatedCrates)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen} disabled={materialCrates.length == 0}>
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
          Relocating {materialCrates.length} Crate
          {materialCrates.length > 1 ? 's' : ''}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 1 }}>
            <ShelfLocationDropdowns setShelfLocation={setShelfLocation} />
          </Box>
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

export default RelocateMaterialCrates
