import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import materialsService from '../../services/materialsService'
import { AppDispatch } from '../../store'
import { NewMaterialType } from '../../types/material'
import { ManufacturerType } from '../../types/manufacturer'

const units = [
  { display: 'each', value: 'ea' },
  { display: 'linear feet', value: 'lnft' },
]
const defaultName = ''
const defaultUnit = units[0].value

interface AddMaterialProps {
  manufacturer: ManufacturerType | null
}

const AddMaterial = ({ manufacturer }: AddMaterialProps) => {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState<string>(defaultName)
  const [unit, setUnit] = useState<string>(defaultUnit)

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const creatematerialMutation = useMutation({
    mutationFn: (material: NewMaterialType) =>
      materialsService.create(material),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Material added.',
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

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setName(defaultName)
    setUnit(defaultUnit)
  }

  const handleSubmit = () => {
    if (!name?.trim() || !unit || !manufacturer) return

    const material = { name: name.trim(), unit, manufacturer: manufacturer.id }

    creatematerialMutation.mutate(material)
  }

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={handleOpen} disabled={!manufacturer} fullWidth>
        Add Material
      </Button>

      {/* Modal / Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Material</DialogTitle>
        <DialogContent className="flex flex-col gap-y-8">
          <FormControl fullWidth>
            <TextField
              id="material-name"
              label="Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              id="material-unit"
              label="Unit"
              variant="standard"
              fullWidth
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
            >
              {units.map((unit, index) => (
                <MenuItem key={index} value={unit.value}>
                  {unit.display}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddMaterial
