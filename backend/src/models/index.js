import Manufacturer from './manufacturer.js'
import Project from './project.js'
import ShelfLocation from './shelfLocation.js'
import StagingArea from './stagingArea.js'
import WarehouseLocation from './warehouseLocation.js'

import Assembly from './assembly.js'
import Crate from './crate.js'
import Material from './material.js'
import Shipment from './shipment.js'
import Stock from './stock.js'

import AssemblyMaterial from './assemblyMaterials.js'
import CrateAssemblies from './crateAssemblies.js'
import CrateStock from './crateStock.js'
import ShipmentCrate from './shipmentCrate.js'

import ReceivedShipment from './receivedShipment.js'
import SentShipment from './sentShipment.js'

const assemblyRelationships = () => {
  Assembly.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

  Assembly.belongsToMany(Material, {
    through: AssemblyMaterial,
    foreignKey: 'assemblyId',
    otherKey: 'materialId',
    as: 'materials',
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
  Crate.belongsTo(ShelfLocation, {
    foreignKey: 'shelfLocationId',
    as: 'shelfLocation',
  })
  Crate.belongsTo(StagingArea, {
    foreignKey: 'stagingAreaId',
    as: 'stagingArea',
  })
  Crate.belongsTo(WarehouseLocation, {
    foreignKey: 'warehouseLocationId',
    as: 'warehouseLocation',
  })

  Crate.belongsToMany(Assembly, {
    through: CrateAssemblies,
    foreignKey: 'crateId',
    otherKey: 'assemblyId',
    as: 'assemblies',
  })
  Crate.belongsToMany(Shipment, {
    through: ShipmentCrate,
    foreignKey: 'crateId',
    otherKey: 'shipmentId',
    as: 'shipments',
  })
  Crate.belongsToMany(Stock, {
    through: CrateStock,
    foreignKey: 'crateId',
    otherKey: 'stockId',
    as: 'stock',
  })
}

const crateAssembliesRelationships = () => {
  CrateAssemblies.belongsTo(Crate, {
    foreignKey: 'crateId',
    as: 'crate',
  })
  CrateAssemblies.belongsTo(Assembly, {
    foreignKey: 'assemblyId',
    as: 'assembly',
  })
}

const crateStockRelationships = () => {
  CrateStock.belongsTo(Crate, {
    foreignKey: 'crateId',
    as: 'crate',
  })
  CrateStock.belongsTo(Stock, {
    foreignKey: 'stockId',
    as: 'stock',
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
  ReceivedShipment.belongsTo(Shipment, {
    foreignKey: 'shipmentId',
    as: 'shipment',
  })
}

const sentShipmentRelationships = () => {
  SentShipment.belongsTo(Shipment, {
    foreignKey: 'shipmentId',
    as: 'shipment',
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
  Shipment.hasMany(ShipmentCrate, {
    foreignKey: 'shipmentId',
    as: 'shipmentCrates',
  })
  Shipment.hasMany(ReceivedShipment, {
    foreignKey: 'shipmentId',
    as: 'receivedShipments',
  })

  Shipment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

  Shipment.belongsToMany(Crate, {
    through: ShipmentCrate,
    foreignKey: 'shipmentId',
    otherKey: 'crateId',
    as: 'crates',
  })
}

const shipmentCrateRelationships = () => {
  ShipmentCrate.belongsTo(Crate, {
    foreignKey: 'crateId',
    as: 'crate',
  })
  ShipmentCrate.belongsTo(Shipment, {
    foreignKey: 'shipmentId',
    as: 'shipment',
  })
}

const stagingAreaRelationships = () => {
  StagingArea.hasMany(Crate, { foreignKey: 'stagingAreaId', as: 'crates' })

  StagingArea.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
}

const stockRelationships = () => {
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })
  Stock.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })

  Stock.belongsToMany(Crate, {
    through: CrateStock,
    foreignKey: 'stockId',
    otherKey: 'crateId',
    as: 'crates',
  })
}

const warehouseLocationRelationships = () => {
  WarehouseLocation.hasMany(Crate, {
    foreignKey: 'warehouseLocationId',
    as: 'crates',
  })
}

assemblyRelationships()
assemblyMaterialsRelationships()
crateRelationships()
crateAssembliesRelationships()
crateStockRelationships()
manufacturerRelationships()
materialRelationships()
projectRelationships()
receivedShipmentRelationships()
sentShipmentRelationships()
shelfLocationRelationships()
shipmentRelationships()
shipmentCrateRelationships()
stagingAreaRelationships()
stockRelationships()
warehouseLocationRelationships()

export {
  Assembly,
  AssemblyMaterial,
  Crate,
  CrateAssemblies,
  CrateStock,
  Manufacturer,
  Material,
  Project,
  ReceivedShipment,
  SentShipment,
  ShelfLocation,
  Shipment,
  ShipmentCrate,
  StagingArea,
  Stock,
  WarehouseLocation,
}
