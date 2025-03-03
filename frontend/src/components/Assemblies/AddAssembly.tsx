/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import assembliesService from '../../services/assembliesService'
import { AppDispatch } from '../../store'
import { NewAssemblyType } from '../../types/assembly'
import { ProjectType } from '../../types/project'
import AddAssemblyMaterialsList from './AddAssemblyMaterialsList'
import { BillOfMaterialType } from './types'
import { Header } from '../ATEC UI/Text'
import { NewStockType } from '../../types/stock'

interface AddAssemblyProps {
  project: ProjectType | null
}

const AddAssembly = ({ project }: AddAssemblyProps) => {
  const [open, setOpen] = useState(false)

  const [code, setCode] = useState<string>()
  const [billOfMaterials, setBillOfMaterials] = useState<BillOfMaterialType[]>([
    { id: 0 },
  ])

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createAssemblyMutation = useMutation({
    mutationFn: (assembly: NewAssemblyType) =>
      assembliesService.deepCreate(assembly),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['assemblies'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Assembly added.',
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
    setCode(undefined)
    setBillOfMaterials([{ id: 0 }])
  }

  const handleSubmit = () => {
    if (!code?.trim() || !project) return

    const formattedBillOfMaterials: NewStockType[] = billOfMaterials
      .filter((bill) => bill.material && bill.quantity)
      .map((bill) => {
        return {
          material: bill.material!,
          quantity: bill.quantity!,
          project: project,
        }
      })

    const assembly = {
      code,
      prefabricated: false,
      type: '',
      projectId: project.id,
      billOfMaterials: formattedBillOfMaterials,
    }

    createAssemblyMutation.mutate(assembly)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen} disabled={!project} fullWidth>
        Add Assembly
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>Add Assembly</DialogTitle>
        <DialogContent>
          <Stack spacing={4}>
            <FormControl fullWidth>
              <TextField
                id="assembly-name"
                label="Assembly Code"
                variant="standard"
                fullWidth
                value={code ?? ''}
                onChange={(event) => {
                  setCode(event.target.value)
                }}
              />
            </FormControl>

            <Stack spacing={2}>
              <Header text="Bill of materials" />
              <AddAssemblyMaterialsList
                billOfMaterials={billOfMaterials}
                setBillOfMaterials={setBillOfMaterials}
              />
            </Stack>
          </Stack>
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

export default AddAssembly
