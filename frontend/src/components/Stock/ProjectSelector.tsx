import { Autocomplete, TextField } from '@mui/material'
import { useProjects } from '../../hooks/useProjectsHook'
import { ProjectType } from '../../types/project'
import { Dispatch, SetStateAction } from 'react'

interface ProjectSelectorProps {
  project: ProjectType | undefined
  setProject: Dispatch<SetStateAction<ProjectType | undefined>>
}

const ProjectSelector = ({ project, setProject }: ProjectSelectorProps) => {
  const { data: projects = [], isLoading, error } = useProjects()

  const handleChange = (newValue: ProjectType | null) => {
    setProject(newValue ?? undefined)
  }

  return (
    <Autocomplete
      options={projects}
      getOptionLabel={(option) => `${option.number} ${option.name}`}
      isOptionEqualToValue={(option, value) => option.number === value?.number}
      value={project ?? null}
      onChange={(_event, newValue) => handleChange(newValue)}
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
