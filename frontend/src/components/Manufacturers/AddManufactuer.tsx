import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
} from '@mui/material'
import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import manufacturersService from '../../services/manufacturersService'
import { AppDispatch } from '../../store'
import { NewManufacturerType } from '../../types/manufacturer'

const AddManufacturer = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState<string>('')

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createManufacturerMutation = useMutation({
    mutationFn: (manufacturer: NewManufacturerType) =>
      manufacturersService.create(manufacturer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['manufacturers'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Manufacturer added.',
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
    setName('')
  }

  const handleSubmit = () => {
    createManufacturerMutation.mutate({ name })
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen}>Add Manufacturer</Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>Add Manufacturer</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="manufacturer-name"
              label="Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddManufacturer
