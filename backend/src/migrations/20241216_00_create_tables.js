import { DataTypes, Sequelize } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  // Drop tables with CASCADE to handle dependencies
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "crate_stock" CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "shipment_stock" CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "request_stock" CASCADE;',
  )
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS "crates" CASCADE;')
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "locations" CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TABLE IF EXISTS "materials" CASCADE;',
  )

  // Create ENUMs for PostgreSQL
  await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'crate_location') THEN
          CREATE TYPE crate_location AS ENUM (
            'Shipping Bay', 'Storage', 'Staging Zone 1', 'Staging Zone 2', 'In Transit', 'Delivered'
          );
        END IF;
      END
      $$;
    `)

  await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shipment_direction') THEN
          CREATE TYPE shipment_direction AS ENUM (
            'In', 'Out'
          );
        END IF;
      END
      $$;
    `)

  // Create tables
  await queryInterface.createTable('storages', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

  await queryInterface.createTable('vendors', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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

  await queryInterface.createTable('materials', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    part_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thickness: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value) {
          if (value !== null && value < 0) {
            throw new Error('Thickness must be positive if provided')
          }
        },
      },
    },
    width: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value) {
          if (value !== null && value < 0) {
            throw new Error('Width must be positive if provided')
          }
        },
      },
    },
    length: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value) {
          if (value !== null && value < 0) {
            throw new Error('Length must be positive if provided')
          }
        },
      },
    },
    square_feet: {
      type: DataTypes.FLOAT,
      validate: {
        isPositive(value) {
          if (value !== null && value < 0) {
            throw new Error('Square feet must be positive if provided')
          }
        },
      },
    },
    top_finish: DataTypes.STRING,
    bottom_finish: DataTypes.STRING,
    x_dimension: {
      type: DataTypes.INTEGER,
      validate: {
        isPositive(value) {
          if (value !== null && value < 0) {
            throw new Error('X Dimension must be positive if provided')
          }
        },
      },
    },
    cutout: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tag: DataTypes.STRING,
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id',
      },
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

  await queryInterface.addIndex('materials', ['part_number'], {
    unique: true,
    name: 'idx_materials_part_number',
  })

  await queryInterface.createTable('projects', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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

  await queryInterface.createTable('shipments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    direction: {
      type: 'shipment_direction',
      allowNull: false,
    },
    send_date: { type: DataTypes.DATE, allowNull: false },
    received_date: DataTypes.DATE,
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vendors',
        key: 'id',
      },
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

  await queryInterface.createTable('stock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materials',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    location: {
      type: 'crate_location',
    },
    storage_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'storages',
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
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id',
      },
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

  await queryInterface.createTable('crate_stock', {
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
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'id',
      },
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

  await queryInterface.createTable('shipment_crates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shipments',
        key: 'id',
      },
    },
    crate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'crates',
        key: 'id',
      },
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

  // Create the trigger to calculate `square_feet` for materials
  await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION calculate_square_feet()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.square_feet IS NULL THEN
              IF NEW.width IS NOT NULL AND NEW.length IS NOT NULL THEN
                  NEW.square_feet := (NEW.width * NEW.length) / 144;
              ELSE
                  NEW.square_feet := NULL;
              END IF;
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_calculate_material_square_feet
      BEFORE INSERT ON materials
      FOR EACH ROW
      EXECUTE FUNCTION calculate_square_feet();
    `)

  // Add checks
  await queryInterface.sequelize.query(`
      ALTER TABLE shipments
      ADD CONSTRAINT send_date_before_received_date
      CHECK ( 
        send_date < received_date OR send_date IS NULL OR received_date IS NULL
      );
    `)

  await queryInterface.sequelize.query(`
      ALTER TABLE crates
      ADD CONSTRAINT check_storage_requires_storage_id
      CHECK (
        NOT (location = 'Storage' AND storage_id IS NULL)
      );
    `)
}

export const down = async ({ context: queryInterface }) => {
  // Drop triggers
  await queryInterface.sequelize.query(
    'DROP TRIGGER IF EXISTS trigger_calculate_material_square_feet ON materials',
  )

  // Drop tables in reverse order of dependencies
  await queryInterface.dropTable('shipment_crates', { cascade: true })
  await queryInterface.dropTable('crate_stock', { cascade: true })
  await queryInterface.dropTable('crates', { cascade: true })
  await queryInterface.dropTable('stock', { cascade: true })
  await queryInterface.dropTable('shipments', { cascade: true })
  await queryInterface.dropTable('requests', { cascade: true })
  await queryInterface.dropTable('projects', { cascade: true })
  await queryInterface.dropTable('materials', { cascade: true })
  await queryInterface.dropTable('vendors', { cascade: true })
  await queryInterface.dropTable('storages', { cascade: true })

  // Drop enums
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS shipment_direction CASCADE;',
  )
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS crate_location CASCADE;',
  )
}
