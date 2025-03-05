import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useState } from 'react'
import { useProject } from '../Projects/ProjectContext'
import FieldCrateForm from './FieldCrateForm'

const AddFieldCrate = () => {
  const [open, setOpen] = useState(false)

  const { project } = useProject()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    /*
    if (!project) return

    const fieldCrate = {
      number,
      projectId: project.id,
      assemblies: [],
    }

    createFieldCrateMutation.mutate(fieldCrate)
    */
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen} disabled={!project} fullWidth>
        Add Field Crate
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>Add Field Crate</DialogTitle>
        <DialogContent>
          <FieldCrateForm />
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

export default AddFieldCrate
