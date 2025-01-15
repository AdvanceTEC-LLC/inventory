import { useQuery } from '@tanstack/react-query'
import { Header } from '../../ATEC UI/Text'
import { Autocomplete, TextField } from '@mui/material'
import { ProjectType } from '../../../types/project'
import projectsService from '../../../services/projectsService'
import { useState } from 'react'

interface ProjectFilterType {
  setProject: (project: ProjectType | null) => void
}

const ProjectFilter = ({ setProject }: ProjectFilterType) => {
  const [project, setDisplayProject] = useState<ProjectType | null>(null)

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] justify-items-end items-center gap-x-4">
      <Header text="Filter" className="col-span-2" />
      <Autocomplete
        fullWidth
        options={projects}
        getOptionLabel={(option) => `${option.number} ${option.name}` || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={project}
        onChange={(_event, newValue) => {
          setProject(newValue)
          setDisplayProject(newValue)
        }}
        renderInput={(params) => <TextField {...params} label="Project" />}
        noOptionsText={
          isProjectsLoading
            ? 'Loading'
            : isProjectsError
            ? 'Error'
            : 'No projects available'
        }
      />
    </div>
  )
}

export default ProjectFilter
