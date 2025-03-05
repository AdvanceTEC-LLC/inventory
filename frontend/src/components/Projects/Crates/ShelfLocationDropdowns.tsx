import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useShelfLocations } from '../../../hooks/useShelfLocationsHook'
import { ShelfLocationType } from '../../../types/shelfLocation'

interface ShelfLocationDropdownsProps {
  setShelfLocation: Dispatch<SetStateAction<ShelfLocationType | undefined>>
}

const ShelfLocationDropdowns: React.FC<ShelfLocationDropdownsProps> = ({
  setShelfLocation,
}) => {
  const [side, setSide] = useState<string>()
  const [aisle, setAisle] = useState<number>()
  const [col, setCol] = useState<string>()
  const [shelf, setShelf] = useState<number>()

  const { data: shelfLocations = [] } = useShelfLocations()

  // Filter dynamically based on previous selections
  const filteredAisles = new Set(
    shelfLocations
      .filter((location) => (side ? location.side === side : true))
      .map((location) => location.aisle)
  )

  const filteredCols = new Set(
    shelfLocations
      .filter((location) => (aisle ? location.aisle === aisle : true))
      .map((location) => location.col)
  )

  const filteredShelves = new Set(
    shelfLocations
      .filter((location) =>
        aisle && col ? location.aisle === aisle && location.col === col : true
      )
      .map((location) => location.shelf)
  )

  const handleSideChange = (event: SelectChangeEvent) => {
    setSide(event.target.value)
    setAisle(undefined) // Reset dependent selections
    setCol(undefined)
    setShelf(undefined)
  }

  const handleAisleChange = (event: SelectChangeEvent<number>) => {
    setAisle(Number(event.target.value))
    setCol(undefined)
    setShelf(undefined)
  }

  const handleColChange = (event: SelectChangeEvent) => {
    setCol(event.target.value)
    setShelf(undefined)
  }

  const handleShelfChange = (event: SelectChangeEvent<number>) => {
    setShelf(Number(event.target.value))
    handleChange(Number(event.target.value))
  }

  const handleChange = (selectedShelf: number) => {
    if (!side || !aisle || !col || !selectedShelf) return

    const shelfLocation = shelfLocations.find(
      (location) =>
        location.side === side &&
        location.aisle === aisle &&
        location.col === col &&
        location.shelf === selectedShelf
    )

    setShelfLocation(shelfLocation)
  }

  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth>
        <InputLabel>Side</InputLabel>
        <Select value={side ?? ''} onChange={handleSideChange} label="Side">
          {Array.from(
            new Set(shelfLocations.map((location) => location.side))
          ).map((side) => (
            <MenuItem key={side} value={side}>
              {side}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Aisle</InputLabel>
        <Select value={aisle ?? ''} onChange={handleAisleChange} label="Aisle">
          {Array.from(filteredAisles).map((aisle) => (
            <MenuItem key={aisle} value={aisle}>
              {aisle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Column</InputLabel>
        <Select value={col ?? ''} onChange={handleColChange} label="Column">
          {Array.from(filteredCols).map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Shelf</InputLabel>
        <Select value={shelf ?? ''} onChange={handleShelfChange} label="Shelf">
          {Array.from(filteredShelves).map((shelf) => (
            <MenuItem key={shelf} value={shelf}>
              {shelf}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default ShelfLocationDropdowns
