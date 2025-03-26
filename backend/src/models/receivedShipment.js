import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class ReceivedShipment extends Model {}

ReceivedShipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchaseOrder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orderAcknowledgement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salesOrder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receivedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    manufacturerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manufacturers',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'receivedShipment',
  },
)

export default ReceivedShipment
