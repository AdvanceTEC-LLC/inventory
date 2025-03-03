import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import projectsService from '../../services/projectsService'
import { AppDispatch } from '../../store'
import { NewProjectType } from '../../types/project'

const AddProject = () => {
  const [open, setOpen] = useState(false)
  const [number, setNumber] = useState<number>()
  const [name, setName] = useState<string>()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createProjectMutation = useMutation({
    mutationFn: (project: NewProjectType) => projectsService.create(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Project added.',
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

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const number = value === '' ? undefined : parseInt(value, 10)

    setNumber(number)
  }

  const handleSubmit = () => {
    if (!number || !name) return

    const project: NewProjectType = {
      number,
      name,
      active: true,
    }

    createProjectMutation.mutate(project)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen}>Add Project</Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              id="project-number"
              label="Number"
              variant="standard"
              fullWidth
              value={number ?? ''}
              onChange={handleNumberChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="project-name"
              label="Name"
              variant="standard"
              fullWidth
              value={name ?? ''}
              onChange={handleNameChange}
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

export default AddProject
