import BaseService from './classes/BaseService.js'
import { Stock, Material, Project } from '../models/index.js'
import stockSchema from './validation/stock.validation.js'
import { trace } from '../util/logger.js'

class StockService extends BaseService {
  constructor(materialService, projectService) {
    trace()
    super(Stock)

    this.materialService = materialService
    this.projectService = projectService

    this.deepCreate = this.deepCreate.bind(this)
  }

  get findOptions() {
    return {
      attributes: {
        exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Material,
          as: 'material',
          ...this.materialService.findOptions,
        },
        {
          model: Project,
          as: 'project',
          ...this.projectService.findOptions,
        },
      ],
    }
  }

  async validate(data) {
    trace()
    await super.validate(stockSchema, data)
  }

  async deepCreate(data, transaction) {
    trace()

    const { material, project } = data

    const materialInDb = await this.materialService.deepCreate(
      material,
      transaction,
    )

    const projectInDb = await this.projectService.create(project, transaction)

    const stockInDb = await this.create(
      {
        ...data,
        materialId: materialInDb.id,
        projectId: projectInDb.id,
      },
      transaction,
    )

    return stockInDb
  }

  async update(id, data, transaction) {
    trace()

    const { quantity } = data

    if (quantity <= 0) {
      return await this.deleteRecord(id, transaction)
    }

    return await super.update(id, data, transaction)
  }
}

export default StockService
