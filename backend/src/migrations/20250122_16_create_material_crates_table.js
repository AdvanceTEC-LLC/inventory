import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(
    `INSERT INTO crate_locations (name, material_crate_default, created_at, updated_at)
     VALUES ('Shipping Bay', true, NOW(), NOW())
     ON CONFLICT (name) DO NOTHING;`,
  )

  await queryInterface.createTable('material_crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'crates',
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
  await queryInterface.dropTable('material_crates', { cascade: true })
}
