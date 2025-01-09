-- This file isnt used by the code at all it was just the easiest way for me to plan out the database schema

----------------------------
-- RESETTING THE DATABASE --
----------------------------

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS storages;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS crates;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS shipments;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS shipment_crate;
DROP TABLE IF EXISTS crate_stock;

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-------------------------
-- CREATING THE TABLES --
-------------------------

CREATE TABLE IF NOT EXISTS storages(
    shelf_id INT AUTO_INCREMENT PRIMARY KEY,
    aisle INT NOT NULL,
    col CHAR NOT NULL,
    shelf INT NOT NULL,
);

CREATE TABLE IF NOT EXISTS vendors(
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS materials(
    material_id INT AUTO_INCREMENT PRIMARY KEY,
    part_number VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    thickness INT DEFAULT NULL,
    width INT DEFAULT NULL,
    length INT DEFAULT NULL,
    square_feet FLOAT DEFAULT NULL,
    top_finish VARCHAR(255) DEFAULT NULL,
    bottom_finish VARCHAR(255) DEFAULT NULL,
    x_dimension INT DEFAULT NULL,
    cutout BOOLEAN DEFAULT false,
    tag VARCHAR(255) DEFAULT NULL,
    vendor_id INT NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
);
ALTER TABLE materials ADD UNIQUE INDEX idx_materials_part_number(part_number);

CREATE TABLE IF NOT EXISTS projects(
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    number INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS shipments(
    shipment_id INT AUTO_INCREMENT PRIMARY KEY,
    direction ENUM('In', 'Out') NOT NULL, -- Relative to the Innovation Center. Either coming into the warehouse: 'In', or leaving the warehouse: 'Out'
    send_date DATE NOT NULL, -- When the shipment left it's origin
    received_date DATE DEFAULT NULL,  -- When the shipment reached it's destination
    vendor_id INT NOT NULL,
    project_id INT NOT NULL,
    CONSTRAINT valid_status CHECK (status IN ('In', 'Out')),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
);

CREATE TABLE IF NOT EXISTS stock(
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    material_id INT NOT NULL,
    quantity INT DEFAULT 0,
    FOREIGN KEY (material_id) REFERENCES materials(material_id),
);

CREATE TABLE IF NOT EXISTS crates(
    crate_id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(255) UNIQUE,
    location ENUM('Shipping Bay', 'Storage', 'Staging Zone 1', 'Staging Zone 2', 'In Transit', 'Delivered') NOT NULL,
    storage_id INT NOT NULL,
    project_id INT NOT NULL,
    vendor_id INT NOT NULL,
    CONSTRAINT valid_location CHECK (status IN ('Shipping Bay', 'Storage', 'Staging Zone 1', 'Staging Zone 2', 'In Transit', 'Delivered')),
    FOREIGN KEY (storage_id) REFERENCES storages(storage_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id),
);

CREATE TABLE IF NOT EXISTS crate_stock(
    crate_stock_id INT AUTO_INCREMENT PRIMARY KEY,
    crate_id INT NOT NULL,
    stock_id INT NOT NULL,
    FOREIGN KEY (crate_id) REFERENCES crates(crate_id),
    FOREIGN KEY (stock_id) REFERENCES stock(stock_id),
);

CREATE TABLE IF NOT EXISTS shipment_crate(
    shipment_crate_id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT NOT NULL,
    crate_id INT NOT NULL,
    FOREIGN KEY (shipment_id) REFERENCES shipments(shipment_id),
    FOREIGN KEY (crate_id) REFERENCES crates(crate_id),
);

-----------------------
-- CREATING TRIGGERS --
-----------------------

DELIMITER //
DROP TRIGGER IF EXISTS trigger_calculate_material_square_feet;
--  Trigger to calculate the sqft of each material
CREATE TRIGGER IF NOT EXISTS trigger_calculate_material_square_feet
BEFORE INSERT ON materials
FOR EACH ROW
BEGIN
    -- Only calculate sqft if it's not provided (i.e., NULL)
    IF NEW.sqft IS NULL THEN
        -- Check if width_inches and length_inches are valid (not NULL)
        IF NEW.width_inches IS NOT NULL AND NEW.length_inches IS NOT NULL THEN
            -- Calculate square feet
            SET NEW.sqft = NEW.width_inches * NEW.length_inches / 144;
        ELSE
            -- Handle missing dimensions by setting sqft to NULL
            SET NEW.sqft = NULL; 
        END IF;
    END IF;
    -- If sqft is provided, the trigger does nothing to overwrite it
END;
//
DELIMITER ;

---------------------
-- DROPPING TABLES --
---------------------

DO $$
DECLARE
    table_name TEXT;
BEGIN
    FOR table_name IN
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE FORMAT('DROP TABLE IF EXISTS %I CASCADE', table_name);
    END LOOP;
END $$;