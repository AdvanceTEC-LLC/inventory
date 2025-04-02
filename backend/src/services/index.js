import ManufacturerService from './manufacturer.service.js'
import MaterialService from './material.service.js'
import ProjectService from './project.service.js'

export const manufacturerService = new ManufacturerService()
export const materialService = new MaterialService(manufacturerService)
export const projectService = new ProjectService()
