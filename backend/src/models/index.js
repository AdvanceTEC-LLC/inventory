import Material from './material.js'
import Stock from './stock.js'
import Project from './project.js'
import Vendor from './vendor.js'
import Storage from './storage.js'
import Crate from './crate.js'
import CrateStock from './crateStock.js'
import Shipment from './shipment.js'
import ShipmentCrate from './shipmentCrate.js'

// Define relationships
const defineRelationships = () => {
  // Material to Vendor relationship
  Vendor.hasMany(Material, { foreignKey: 'vendorId', as: 'material' })
  Material.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })

  // Stock to Material relationship
  Material.hasMany(Stock, { foreignKey: 'materialId', as: 'stock' })
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })

  // Crate to Location relationship
  Crate.belongsTo(Storage, { foreignKey: 'storageId', as: 'storage' })
  Storage.hasMany(Crate, { foreignKey: 'storageId', as: 'crates' })

  // Crate to Project relationship
  Crate.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Crate, { foreignKey: 'projectId', as: 'crates' })

  // Crate to Vendor relationship
  Crate.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })
  Vendor.hasMany(Crate, { foreignKey: 'vendorId', as: 'crates' })

  // Shipment to Project relationship
  Shipment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Shipment, { foreignKey: 'projectId', as: 'shipments' })

  // Shipment to Vendor relationship
  Shipment.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })
  Vendor.hasMany(Shipment, { foreignKey: 'vendorId', as: 'shipments' })

  // Shipment to Crate relationship
  Shipment.belongsToMany(Crate, {
    through: ShipmentCrate,
    foreignKey: 'shipmentId',
    otherKey: 'crateId',
    as: 'crates',
  })
  Crate.belongsToMany(Shipment, {
    through: ShipmentCrate,
    foreignKey: 'crateId',
    otherKey: 'shipmentId',
    as: 'shipments',
  })

  // Crate to Stock through CrateStock
  Crate.belongsToMany(Stock, {
    through: CrateStock,
    foreignKey: 'crateId',
    otherKey: 'stockId',
    as: 'stock',
  })
  Stock.belongsToMany(Crate, {
    through: CrateStock,
    foreignKey: 'stockId',
    otherKey: 'crateId',
    as: 'crates',
  })

  // ShipmentCrate to Shipment relationship
  ShipmentCrate.belongsTo(Shipment, {
    foreignKey: 'shipmentId',
    as: 'shipment',
  })
  Shipment.hasMany(ShipmentCrate, {
    foreignKey: 'shipmentId',
    as: 'shipmentCrates',
  })

  // ShipmentCrate to Crate relationship
  ShipmentCrate.belongsTo(Crate, {
    foreignKey: 'crateId',
    as: 'crate',
  })
  Crate.hasMany(ShipmentCrate, {
    foreignKey: 'crateId',
    as: 'shipmentCrates',
  })

  // CrateStock to Stock relationship
  CrateStock.belongsTo(Stock, {
    foreignKey: 'stockId',
    as: 'stock',
  })
  Stock.hasMany(CrateStock, {
    foreignKey: 'stockId',
    as: 'crateStock',
  })

  // CrateStock to Crate relationship
  CrateStock.belongsTo(Crate, {
    foreignKey: 'crateId',
    as: 'crate',
  })
  Crate.hasMany(CrateStock, {
    foreignKey: 'crateId',
    as: 'crateStock',
  })
}

defineRelationships()

export {
  Storage,
  Vendor,
  Material,
  Project,
  Shipment,
  Stock,
  Crate,
  ShipmentCrate,
  CrateStock,
}
