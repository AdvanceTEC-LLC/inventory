import { Autocomplete, TextField } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { useProjects } from '../../hooks/useProjectsHook'
import { ProjectType } from '../../types/project'

const ProjectSelector = () => {
  const { shipment, setShipment } = useShipment()

  const { data: projects = [], isLoading, error } = useProjects()

  const handleChange = (newValue: ProjectType | null) => {
    const selectedProject = projects.find(
      (project: ProjectType) => project.number === newValue?.number
    )

    setShipment({
      ...shipment,
      project: selectedProject,
    })
  }

  return (
    <Autocomplete
      options={[...projects]}
      getOptionLabel={(option) => `${option.number} ${option.name}`}
      isOptionEqualToValue={(option, value) => option.number === value.number}
      value={shipment?.project ?? null}
      onChange={(_event, newValue) => {
        handleChange(newValue)
      }}
      renderInput={(params) => <TextField {...params} label="Project" />}
      noOptionsText={
        isLoading
          ? 'Loading...'
          : error
          ? 'Error fetching data'
          : `No projects available`
      }
    />
  )
}

export default ProjectSelector
