import React, { Dispatch, SetStateAction } from 'react'
import { FormControl, Autocomplete, TextField } from '@mui/material'
import { StagingAreaType } from '../../../types/stagingArea'
import { useStagingAreas } from '../../../hooks/useStagingAreas'

interface StagingAreaSelectorProps {
  stagingArea: StagingAreaType | undefined
  setStagingArea: Dispatch<SetStateAction<StagingAreaType | undefined>>
}

const StagingAreaSelector: React.FC<StagingAreaSelectorProps> = ({
  stagingArea,
  setStagingArea,
}) => {
  const { data: stagingAreas = [], isLoading, error } = useStagingAreas()

  return (
    <FormControl>
      <Autocomplete
        sx={{ marginTop: 1 }}
        options={stagingAreas}
        getOptionLabel={(option) => {
          let label = option.name
          if (option.project)
            label += ` - ${option.project.number} ${option.project.name}`
          return label
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={stagingArea ?? null}
        onChange={(_event, newValue) => {
          setStagingArea(newValue ?? undefined)
        }}
        renderInput={(params) => <TextField {...params} label="Staging Area" />}
        noOptionsText={
          isLoading
            ? 'Loading...'
            : error
            ? 'Error fetching data'
            : `No staging areas available`
        }
      />
    </FormControl>
  )
}

export default StagingAreaSelector
