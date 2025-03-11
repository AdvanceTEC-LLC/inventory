import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class MaterialCrateStock extends Model {}

MaterialCrateStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    materialCrateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'materialCrates', key: 'id' },
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'stock', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'materialCrateStock',
    tableName: 'material_crate_stock',
  },
)

export default MaterialCrateStock
