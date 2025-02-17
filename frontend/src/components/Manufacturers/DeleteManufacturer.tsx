import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import manufacturersService from '../../services/manufacturersService'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import { useDispatch } from '../../hooks/useDispatchHook'
import { ManufacturerType } from '../../types/manufacturer'

interface DeleteManufacturerProps {
  manufacturer: ManufacturerType | null
}

const DeleteManufacturer = ({ manufacturer }: DeleteManufacturerProps) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const deleteManufacturerMutation = useMutation({
    mutationFn: () => manufacturersService.remove(manufacturer!.id),
    onSuccess: () => {
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Manufacturer deleted.',
          status: 'success',
        })
      )
      setOpen(false) // Close the modal on success
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

  const handleConfirmDelete = () => {
    if (!manufacturer) return
    deleteManufacturerMutation.mutate()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOpen = () => setOpen(true)

  return (
    <>
      {/* Button to Open Modal */}
      <Button color="error" onClick={handleOpen} disabled={!manufacturer}>
        Delete Manufacturer
      </Button>

      {/* Modal / Dialog */}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Delete Manufacturer</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete "{manufacturer?.name}"?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteManufacturer
