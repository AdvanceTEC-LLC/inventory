import Material from './material.js'
import Stock from './stock.js'
import Project from './project.js'
import Vendor from './vendor.js'
import Location from './location.js'
import Crate from './crate.js'
import CrateStock from './crateStock.js'
import Shipment from './shipment.js'
import ShipmentCrate from './shipmentCrate.js'
import Request from './request.js'
import RequestStock from './requestStock.js'

// Define relationships
const defineRelationships = () => {
  // Material to Stock relationship
  Material.hasMany(Stock, { foreignKey: 'materialId', as: 'stock' })
  Stock.belongsTo(Material, { foreignKey: 'materialId', as: 'material' })

  Vendor.hasMany(Material, { foreignKey: 'vendorId', as: 'material' })
  Material.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })

  // Crate to Location relationship
  Crate.belongsTo(Location, { foreignKey: 'locationId', as: 'location' })
  Location.hasMany(Crate, { foreignKey: 'locationId', as: 'crates' })

  // Crate to Project relationship
  Crate.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Crate, { foreignKey: 'projectId', as: 'crates' })

  // Shipment to Project relationship
  Shipment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Shipment, { foreignKey: 'projectId', as: 'shipments' })

  // Shipment to Vendor relationship
  Shipment.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' })
  Vendor.hasMany(Shipment, { foreignKey: 'vendorId', as: 'shipments' })

  // Request to Project relationship
  Request.belongsTo(Project, { foreignKey: 'projectId', as: 'project' })
  Project.hasMany(Request, { foreignKey: 'projectId', as: 'requests' })

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

  // RequestStock to Request relationship
  RequestStock.belongsTo(Request, { foreignKey: 'requestId', as: 'request' })
  Request.hasMany(RequestStock, {
    foreignKey: 'requestId',
    as: 'requestStocks',
  })

  // RequestStock to Stock relationship
  RequestStock.belongsTo(Stock, { foreignKey: 'stockId', as: 'stock' })
  Stock.hasMany(RequestStock, { foreignKey: 'stockId', as: 'requestStocks' })
}

defineRelationships()

export {
  Material,
  Stock,
  Project,
  Vendor,
  Location,
  Crate,
  CrateStock,
  Shipment,
  ShipmentCrate,
  Request,
  RequestStock,
}
