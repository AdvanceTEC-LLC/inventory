import Project from '../models/project.js'
import { projectsService } from '../services/projectsService.js'
import createGenericRouter from '../util/genericRouter.js'

export const projectFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const projectsRouter = createGenericRouter({
  model: Project,
  service: projectsService,
  findOptions: projectFindOptions,
})

export default projectsRouter
