import Assembly from './assembly.js'
import AssemblyMaterial from './assemblyMaterial.js'
import AssemblyCrate from './assemblyCrate.js'
import AssemblyCrateAssemblies from './assemblyCrateAssemblies.js'
import Crate from './crate.js'
import CrateLocation from './crateLocation.js'
import Manufacturer from './manufacturer.js'
import Material from './material.js'
import MaterialCrate from './materialCrate.js'
import MaterialCrateStock from './materialCrateStock.js'
import Project from './project.js'
import ReceivedShipment from './receivedShipment.js'
import ReceivedShipmentMaterialCrate from './receivedShipmentMaterialCrate.js'
import SentShipment from './sentShipment.js'
import SentShipmentAssemblyCrate from './sentShipmentAssemblyCrate.js'
import ShelfLocation from './shelfLocation.js'
import Shipment from './shipment.js'
import StagingArea from './stagingArea.js'
import Stock from './stock.js'

const assemblyRelationships = () => {
  Assembly.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

  Assembly.belongsToMany(Material, {
    through: AssemblyMaterial,
    foreignKey: 'assemblyId',
    otherKey: 'materialId',
    as: 'materials',
  })

  Assembly.belongsToMany(AssemblyCrate, {
    through: AssemblyCrateAssemblies,
    foreignKey: 'assemblyId',
    otherKey: 'assemblyCrateId',
    as: 'assemblyCrates',
    onDelete: 'CASCADE',
  })
}

const assemblyCrateRelationships = () => {
  AssemblyCrate.belongsTo(Crate, { foreignKey: 'crateId', as: 'crate' })
  AssemblyCrate.belongsTo(StagingArea, {
    foreignKey: 'stagingAreaId',
    as: 'stagingArea',
  })

  AssemblyCrate.belongsToMany(Assembly, {
    through: AssemblyCrateAssemblies,
    foreignKey: 'assemblyCrateId',
    otherKey: 'assemblyId',
    as: 'assemblies',
  })
}

const assemblyCrateAssembliesRelationships = () => {
  AssemblyCrateAssemblies.belongsTo(Crate, {
    foreignKey: 'assemblyCrateId',
    as: 'assemblyCrate',
  })
  AssemblyCrateAssemblies.belongsTo(Assembly, {
    foreignKey: 'assemblyId',
    as: 'assembly',
  })
}

const assemblyMaterialsRelationships = () => {
  AssemblyMaterial.belongsTo(Assembly, {
    foreignKey: 'assemblyId',
    as: 'assembly',
  })
  AssemblyMaterial.belongsTo(Material, {
    foreignKey: 'materialId',
    as: 'material',
  })
}

const crateRelationships = () => {
  Crate.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Crate.belongsTo(CrateLocation, {
    foreignKey: 'crateLocationId',
    as: 'crateLocation',
  })
  Crate.belongsTo(ShelfLocation, {
    foreignKey: 'shelfLocationId',
    as: 'shelfLocation',
  })
}

const crateLocationRelationships = () => {
  CrateLocation.hasMany(Crate, {
    foreignKey: 'crateLocationId',
    as: 'crates',
  })
}

const manufacturerRelationships = () => {
  Manufacturer.hasMany(Material, {
    foreignKey: 'manufacturerId',
    as: 'material',
  })
  Manufacturer.hasMany(ReceivedShipment, {
    foreignKey: 'manufacturerId',
    as: 'receivedShipments',
  })
}

const materialRelationships = () => {
  Material.hasMany(Stock, { foreignKey: 'materialId', as: 'stock' })

  Material.belongsTo(Manufacturer, {
    foreignKey: 'manufacturerId',
    as: 'manufacturer',
  })

  Material.belongsToMany(Assembly, {
    through: AssemblyMaterial,
    foreignKey: 'materialId',
    otherKey: 'assemblyId',
    as: 'assemblies',
  })
}

const materialCrateRelationships = () => {
  MaterialCrate.belongsTo(Crate, { foreignKey: 'crateId', as: 'crate' })

  MaterialCrate.belongsToMany(Stock, {
    through: MaterialCrateStock,
    foreignKey: 'materialCrateId',
    otherKey: 'stockId',
    as: 'stock',
    onDelete: 'CASCADE',
  })
}

const materialCrateStockRelationships = () => {
  MaterialCrateStock.belongsTo(MaterialCrate, {
    foreignKey: 'materialCrateId',
    as: 'materialCrate',
  })
  MaterialCrateStock.belongsTo(Stock, {
    foreignKey: 'stockId',
    as: 'stock',
  })
}

const projectRelationships = () => {
  Project.hasMany(Assembly, { foreignKey: 'projectId', as: 'assemblies' })
  Project.hasMany(Crate, { foreignKey: 'projectId', as: 'crates' })
  Project.hasMany(Shipment, { foreignKey: 'projectId', as: 'shipments' })
  Project.hasMany(StagingArea, { foreignKey: 'projectId', as: 'stagingAreas' })
  Project.hasMany(Stock, { foreignKey: 'projectId', as: 'stock' })
}

const receivedShipmentRelationships = () => {
  ReceivedShipment.belongsTo(Manufacturer, {
    foreignKey: 'manufacturerId',
    as: 'manufacturer',
  })

  ReceivedShipment.hasMany(ReceivedShipmentMaterialCrate, {
    foreignKey: 'receivedShipmentId',
    as: 'aeceivedShipmentMaterialCrates',
  })

  ReceivedShipment.belongsToMany(MaterialCrate, {
    through: ReceivedShipmentMaterialCrate,
    foreignKey: 'receivedShipmentId',
    otherKey: 'materialCrateId',
    as: 'materialCrates',
  })
}

const receivedShipmentMaterialCrateRelationships = () => {
  ReceivedShipmentMaterialCrate.belongsTo(MaterialCrate, {
    foreignKey: 'materialCrateId',
    as: 'materialCrate',
  })
  ReceivedShipmentMaterialCrate.belongsTo(ReceivedShipment, {
    foreignKey: 'receivedShipmentId',
    as: 'receivedShipment',
  })

  ReceivedShipment.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project',
  })
}

const sentShipmentRelationships = () => {
  SentShipment.belongsTo(Shipment, {
    foreignKey: 'shipmentId',
    as: 'shipment',
  })

  SentShipment.hasMany(SentShipmentAssemblyCrate, {
    foreignKey: 'sentShipmentId',
    as: 'sentShipmentAssemblyCrates',
  })

  SentShipment.belongsToMany(AssemblyCrate, {
    through: SentShipmentAssemblyCrate,
    foreignKey: 'sentShipmentId',
    otherKey: 'assemblyCrateId',
    as: 'assemblyCrates',
  })
}

const sentShipmentAssemblyCrateRelationships = () => {
  SentShipmentAssemblyCrate.belongsTo(AssemblyCrate, {
    foreignKey: 'assemblyCrateId',
    as: 'assemblyCrate',
  })
  SentShipmentAssemblyCrate.belongsTo(SentShipment, {
    foreignKey: 'sentShipmentId',
    as: 'sentShipment',
  })
}

const shelfLocationRelationships = () => {
  ShelfLocation.hasMany(Crate, { foreignKey: 'shelfLocationId', as: 'crates' })
}

const shipmentRelationships = () => {
  Shipment.hasMany(SentShipment, {
    foreignKey: 'shipmentId',
    as: 'sentShipments',
  })

  Shipment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
}

const stagingAreaRelationships = () => {
  StagingArea.hasMany(AssemblyCrate, {
    foreignKey: 'stagingAreaId',
    as: 'assemblyCrates',
  })

  StagingArea.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
}

const stockRelationships = () => {
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })
  Stock.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

  Stock.belongsToMany(MaterialCrate, {
    through: MaterialCrateStock,
    foreignKey: 'stockId',
    otherKey: 'materialCrateId',
    as: 'materialCrates',
    onDelete: 'CASCADE',
  })
}

assemblyRelationships()
assemblyCrateRelationships()
assemblyMaterialsRelationships()
crateRelationships()
assemblyCrateAssembliesRelationships()
crateLocationRelationships()
manufacturerRelationships()
materialRelationships()
materialCrateRelationships()
materialCrateStockRelationships()
projectRelationships()
receivedShipmentRelationships()
receivedShipmentMaterialCrateRelationships()
sentShipmentRelationships()
sentShipmentAssemblyCrateRelationships()
shelfLocationRelationships()
shipmentRelationships()
stagingAreaRelationships()
stockRelationships()

export {
  Assembly,
  AssemblyCrate,
  AssemblyMaterial,
  Crate,
  AssemblyCrateAssemblies,
  CrateLocation,
  Manufacturer,
  Material,
  MaterialCrate,
  MaterialCrateStock,
  Project,
  ReceivedShipment,
  ReceivedShipmentMaterialCrate,
  SentShipment,
  SentShipmentAssemblyCrate,
  ShelfLocation,
  Shipment,
  StagingArea,
  Stock,
}
