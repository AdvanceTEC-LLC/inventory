import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useMaterials } from '../../hooks/useMaterialsHook'
import { CrateType, MaterialType, StockType } from './types'
import { useShipment } from './ShipmentContext'

interface MaterialSelectorProps {
  crate: CrateType
  stock: StockType
}

const MaterialSelector = ({ crate, stock }: MaterialSelectorProps) => {
  const { shipment, setShipment } = useShipment()

  const { data: materials = [] } = useMaterials()

  const handleChange = (e: SelectChangeEvent<string>) => {
    const material = materials.find(
      (material: MaterialType) => material.name === e.target.value
    )

    const updatedStock = {
      ...stock,
      material,
    }

    const updatedCrate = {
      ...crate,
      stock: crate.stock?.map((s) => (s.id === stock.id ? updatedStock : s)),
    }

    const crates = shipment?.crates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setShipment({
      ...shipment,
      crates,
    })
  }

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="manufactuer-label">Material</InputLabel>
      <Select
        labelId="manufactuer-label"
        label="material"
        value={stock?.material?.name ?? ''}
        onChange={handleChange}
      >
        {materials.map((material) => (
          <MenuItem key={material.id} value={material.name}>
            {material.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MaterialSelector
