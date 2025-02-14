import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  // Ensure at least one warehouse exists before querying it
  await queryInterface.sequelize.query(
    `INSERT INTO warehouse_locations (name, is_default, created_at, updated_at)
     VALUES ('Shipping Bay', true, NOW(), NOW())
     ON CONFLICT (name) DO NOTHING;`,
  )

  // Get the default warehouse ID
  const [[defaultWarehouse]] = await queryInterface.sequelize.query(
    'SELECT id FROM warehouse_locations WHERE is_default = true LIMIT 1;',
  )

  await queryInterface.createTable('crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      unique: true,
    },
    warehouse_location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'warehouse_locations',
        key: 'id',
      },
      allowNull: false,
      defaultValue: defaultWarehouse.id,
    },
    shelf_location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shelf_locations',
        key: 'id',
      },
    },
    staging_area_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shelf_locations',
        key: 'id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    opened: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('crates', { cascade: true })
}
