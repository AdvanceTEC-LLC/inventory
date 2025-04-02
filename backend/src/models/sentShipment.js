import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class SentShipment extends Model {}

SentShipment.init(
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
    transmittal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sendDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'sentShipment',
  },
)

export default SentShipment
