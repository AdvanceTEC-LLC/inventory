import React, { Dispatch, SetStateAction } from 'react'
import { FormControl, Autocomplete, TextField } from '@mui/material'
import { StagingAreaType } from '../../../types/stagingArea'
import { useStagingAreas } from '../../../hooks/useStagingAreas'
import { useSelectedAssemblyCrates } from './SelectedAssemblyCratesContext'

interface StagingAreaSelectorProps {
  stagingArea: StagingAreaType | undefined
  setStagingArea: Dispatch<SetStateAction<StagingAreaType | undefined>>
}

const StagingAreaSelector: React.FC<StagingAreaSelectorProps> = ({
  stagingArea,
  setStagingArea,
}) => {
  const { data: stagingAreas = [], isLoading, error } = useStagingAreas()

  const { selectedAssemblyCrates } = useSelectedAssemblyCrates()

  const selectedProjectIds = new Set(
    selectedAssemblyCrates.map((crate) => crate.crate.project.id)
  )

  // Find staging areas that belong to the selected projects
  const matchingStagingAreas = stagingAreas.filter(
    (stagingArea) =>
      stagingArea.project && selectedProjectIds.has(stagingArea.project.id)
  )

  // Find unassigned staging areas (those without a project)
  const unassignedStagingAreas = stagingAreas.filter(
    (stagingArea) => !stagingArea.project
  )

  // Determine which set of staging areas to use
  const filteredStagingAreas =
    matchingStagingAreas.length > 0
      ? matchingStagingAreas
      : unassignedStagingAreas

  return (
    <FormControl>
      <Autocomplete
        sx={{ marginTop: 1 }}
        options={filteredStagingAreas}
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
