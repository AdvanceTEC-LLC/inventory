import { Autocomplete, TextField } from '@mui/material'
import { useMaterials } from '../../../hooks/useMaterialsHook'
import { ReceivedMaterialCrateType, StockType } from '../types'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { SyntheticEvent } from 'react'
import { MaterialType } from '../../../types/material'

interface MaterialSelectorProps {
  crate: ReceivedMaterialCrateType
  stock: StockType
}

const MaterialSelector = ({ crate, stock }: MaterialSelectorProps) => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const { data: materials = [] } = useMaterials()

  const filteredMaterials = materials.filter(
    (material) =>
      material.manufacturer.id === receivedShipment?.manufacturer?.id
  )

  const sortedMaterials = [...filteredMaterials].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const handleChange = (_: SyntheticEvent, value: MaterialType | null) => {
    const updatedStock = {
      ...stock,
      material: value ?? undefined,
    }

    const updatedCrate = {
      ...crate,
      stock: crate.stock?.map((s) => (s.id === stock.id ? updatedStock : s)),
    }

    const materialCrates = receivedShipment?.materialCrates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setReceivedShipment({
      ...receivedShipment,
      materialCrates,
    })
  }

  const materialValue = stock.material ?? null

  return (
    <Autocomplete
      options={sortedMaterials}
      getOptionLabel={(option) => option.name}
      value={materialValue}
      onChange={(event, value) => {
        handleChange(event, value)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Material" />}
    />
  )
}

export default MaterialSelector
