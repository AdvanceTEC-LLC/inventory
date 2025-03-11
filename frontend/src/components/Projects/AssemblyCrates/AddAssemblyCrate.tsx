import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useProject } from '../Projects/ProjectContext'
import AssemblyCrateForm from './AssemblyCrateForm'
import { useAssemblyCrate } from './AssemblyCrateContext'
import { useCrateLocations } from '../../../hooks/useCrateLocationsHook'
import { NewCrateType } from '../../../types/crate'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import assemblyCratesService from '../../../services/assemblyCratesService'
import { AppDispatch } from '../../../store'
import { NewAssemblyCrateType } from '../../../types/assemblyCrate'

const AddAssemblyCrate = () => {
  const { data: crateLocations = [] } = useCrateLocations()

  const { project } = useProject()
  const { assemblyCrate, setAssemblyCrate } = useAssemblyCrate()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const holdingBayLocation = crateLocations.find((location) =>
      location.name.includes('Hold')
    )

    if (!holdingBayLocation || !project) return

    const crate: NewCrateType = {
      crateLocationId: holdingBayLocation.id,
      projectId: project.id,
      number: '',
    }

    setAssemblyCrate({
      crate,
      assemblies: [],
    })
  }, [crateLocations, project])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)

    if (!assemblyCrate) return

    setAssemblyCrate({
      ...assemblyCrate,
      crate: {
        ...assemblyCrate.crate,
        number: '',
      },
    })
  }

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createAssemblyCrateMutation = useMutation({
    mutationFn: (assemblyCrate: NewAssemblyCrateType) =>
      assemblyCratesService.deepCreate(assemblyCrate),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['assemblyCrates'] })
      await queryClient.invalidateQueries({ queryKey: ['crates'] })
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

  const handleSubmit = () => {
    if (!project || !assemblyCrate?.crate.number) return
    setOpen(false)

    createAssemblyCrateMutation.mutate(assemblyCrate)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen} disabled={!project} fullWidth>
        Add Assembly Crate
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>Add Assembly Crate</DialogTitle>
        <DialogContent>
          <AssemblyCrateForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!assemblyCrate?.crate.number.length}
            variant="contained"
            loading={createAssemblyCrateMutation.isPending ? true : null}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddAssemblyCrate
