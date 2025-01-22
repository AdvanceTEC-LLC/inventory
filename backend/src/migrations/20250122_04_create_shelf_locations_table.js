import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('shelf_locations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    side: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    aisle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    shelf: {
      type: DataTypes.INTEGER,
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

  await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION capitalize_side()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.side := UPPER(NEW.side);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `)

  await queryInterface.sequelize.query(`
    CREATE TRIGGER capitalize_side_before_insert
    BEFORE INSERT ON shelf_locations
    FOR EACH ROW
    EXECUTE FUNCTION capitalize_side();
  `)

  await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION capitalize_col()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.col := UPPER(NEW.col);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `)

  await queryInterface.sequelize.query(`
    CREATE TRIGGER capitalize_col_before_insert
    BEFORE INSERT ON shelf_locations
    FOR EACH ROW
    EXECUTE FUNCTION capitalize_col();
  `)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS capitalize_side_before_insert ON shelf_locations;
  `)

  await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS capitalize_col_before_insert ON shelf_locations;
  `)

  await queryInterface.sequelize.query(`
    DROP FUNCTION IF EXISTS capitalize_side;
  `)

  await queryInterface.sequelize.query(`
    DROP FUNCTION IF EXISTS capitalize_col;
  `)

  // Drop the table
  await queryInterface.dropTable('shelf_locations', { cascade: true })
}
