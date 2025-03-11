import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class ReceivedShipmentMaterialCrate extends Model {}

ReceivedShipmentMaterialCrate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    receivedShipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'receivedShipments', key: 'id' },
    },
    materialCrateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'materialCrates', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'receivedShipmentMaterialCrate',
  },
)

export default ReceivedShipmentMaterialCrate
