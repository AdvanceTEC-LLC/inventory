import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useStagingAreas } from '../../../hooks/useStagingAreas'
import { useCrates } from '../../../hooks/useCratesHook'
import { StagingAreaType } from '../../../types/stagingArea'
import { useState } from 'react'
import { useSentShipment } from './SentShipmentContext'
//import { useShipment } from './ShipmentContext'

const StagingAreaSelector = () => {
  const { data: stagingAreas = [] } = useStagingAreas()
  const { data: crates = [] } = useCrates()

  //const { shipment, setShipment } = useShipment()
  const { sentShipment, setSentShipment } = useSentShipment()

  const [stagingArea, setStagingArea] = useState<StagingAreaType>()

  const handleChange = (e: SelectChangeEvent) => {
    setStagingArea(
      stagingAreas.find(
        (stagingArea) => stagingArea.id === parseInt(e.target.value)
      )
    )

    const cratesInStagingArea = crates.filter(
      (crate) => crate.stagingArea?.id === parseInt(e.target.value)
    )

    setSentShipment({
      ...sentShipment,
      crates: cratesInStagingArea,
    })
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="staging-area-label">Staging Area</InputLabel>
      <Select
        labelId="staging-area-label"
        label="staging-area"
        value={stagingArea?.name ?? ''}
        onChange={handleChange}
      >
        {stagingAreas
          .filter((stagingArea) =>
            crates.some((crate) => crate.stagingArea?.id === stagingArea.id)
          )
          .map((stagingArea) => (
            <MenuItem key={stagingArea.id} value={stagingArea.id}>
              {stagingArea.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default StagingAreaSelector
