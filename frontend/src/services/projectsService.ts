import { ProjectType, NewProjectType } from '../types/project'
import apiService from './apiService'

const projectsService = apiService<ProjectType, NewProjectType>({
  endpoint: 'projects',
})

export default projectsService
