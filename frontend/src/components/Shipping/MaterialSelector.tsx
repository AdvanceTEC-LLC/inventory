import { Autocomplete, TextField } from '@mui/material'
import { useMaterials } from '../../hooks/useMaterialsHook'
import { ReceivedCrateType, StockType } from './types'
import { useShipment } from './ShipmentContext'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { SyntheticEvent } from 'react'
import { MaterialType } from '../../types/material'

interface MaterialSelectorProps {
  crate: ReceivedCrateType
  stock: StockType
}

const MaterialSelector = ({ crate, stock }: MaterialSelectorProps) => {
  const { shipment, setShipment } = useShipment()
  const { receivedShipment } = useReceivedShipment()

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

    const crates = shipment?.crates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setShipment({
      ...shipment,
      crates,
    })
  }

  const materialValue = stock?.material ?? null

  return (
    <Autocomplete
      options={sortedMaterials}
      getOptionLabel={(option) => option.name}
      value={materialValue}
      onChange={(event, value) => handleChange(event, value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Material" />}
    />
  )
}

export default MaterialSelector
