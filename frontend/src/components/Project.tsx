import { Autocomplete, TextField } from '@mui/material'
import { useProjects } from '../hooks/useProjectsHook'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../reducers/projectReducer'
import { ProjectType } from '../types/project'

const Project = () => {
  const { data: projects = [], isLoading, error } = useProjects()
  const project = useSelector(
    (state: { project: ProjectType }) => state.project
  )
  const dispatch = useDispatch()

  return (
    <div className="grid gap-x-8">
      <Autocomplete
        options={[...projects]}
        getOptionLabel={(option) => `${option.number} ${option.name}`}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        value={project}
        onChange={(_event, newValue) => {
          dispatch(setProject(newValue))
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
    </div>
  )
}

export default Project
