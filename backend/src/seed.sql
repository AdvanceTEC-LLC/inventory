BEGIN;
INSERT INTO storages (aisle, col, shelf)
SELECT aisle, col, shelf
FROM generate_series(10, 20) AS aisle
CROSS JOIN (
  SELECT chr(generate_series(65, 90)) AS col
) AS col_table
CROSS JOIN generate_series(1, 6) AS shelf;
COMMIT;

BEGIN;
INSERT INTO vendors (name) VALUES 
('Plascore'),
('KCS'),
('Kingspan'),
('Titus'),
('AAF'),
('Door Tek'),
('Astra'),
('Camfil'),
('Kenall');
COMMIT;

BEGIN;
INSERT INTO materials (
    part_number,
    description,
    thickness,
    width,
    length,
    tag,
    vendor_id
) VALUES 
('M08681511_000', 'Ceiling Panel', 2, 116, 58, 'CP2', 1),
('M08681512_000', 'Ceiling Panel', 2, 58, 18, 'CP3', 1),
('M08681519_000', 'Ceiling Panel', 2, 24, 120, 'CP12', 1),
('M21760028_001', 'Ceiling Panel', 2, 58, 120, 'CP1E', 1),
('M21760028_000', 'Ceiling Panel', 2, 58, 120, 'CP1', 1),
('M21760045_000', 'Ceiling Panel', 2, 116, 58, 'CP2E', 1)
ON CONFLICT (part_number) DO NOTHING;
COMMIT;

BEGIN;
INSERT INTO projects (
    number,
    name
) VALUES 
(22098, 'NC New Warehouse - Engr/Const'),
(23012, 'Gilbane Pfizer MAP'),
(23016, 'Jacobs FDBU DSM-1 Construction'),
(23022, 'Jacobs FDBU DSM-2 Construction'),
(23032, 'Jacobs - FDBU DPFG Const.'),
(23034, 'Pfizer Fill Line Plascore Inst'),
(23035, 'Nycom / VIMS Project'),
(24010, 'CRB-Kindeva Project Phoenix'),
(24011, 'JE Dunn - Fuji Warehouse'),
(24013, 'Donaldson - IsolereBio Lab Fit-UP'),
(24015, 'Messer Lilly LP2'),
(24022, 'NIST Multitool Install'),
(24023, 'KBI - CC2 Skin Walls'),
(24027, 'EMD - Clean Hood & Storage'),
(25010, 'CRB AstraZeneca 9950 MCD'),
(25011, 'Novo Service 2024'),
(25012, 'Fluor LP1 Design'),
(25013, 'Ecolab Window Replacement'),
(25014, 'CRB-BioBloom Design'),
(25015, 'Indivior Raleigh PFS Project'),
(25016, 'KBI-Wall Cladding'),
(25017, 'CRB Gracell Design'),
(25019, 'Jacobs FDB Aura'),
(25020, 'Silfex Air Balance'),
(25021, 'GWU Clean-up'),
(25099, 'WHSE Fab Improvement'),
(25024, 'LP1 Construction')
ON CONFLICT (number) DO NOTHING;
COMMIT;

BEGIN;
INSERT INTO shipments (
    direction,
    send_date,
    received_date,
    vendor_id,
    project_id
) VALUES
('In', '2025-01-01', '2025-01-02', 1, 11),
('Out', '2025-01-03', '2025-01-04', 2, 11),
('In', '2025-01-05', '2025-01-06', 3, 11),
('Out', '2025-01-07', '2025-01-08', 4, 3),
('In', '2025-01-09', '2025-01-10', 5, 3);
COMMIT;

BEGIN;
INSERT INTO stock (
    material_id,
    quantity
) VALUES 
(1, 100),
(1, 200),
(2, 50),
(2, 75),
(3, 300),
(4, 150),
(5, 500),
(6, 250);
COMMIT;

BEGIN;
INSERT INTO crates (
    number,
    location,
    storage_id,
    project_id,
    vendor_id
) VALUES 
('CR001', 'Shipping Bay', null, 11, 1),
('CR002', 'Storage', 2, 11, 2),
('CR003', 'Staging Zone 1', null, 11, 3),
('CR004', 'In Transit', null, 11, 4),
('CR005', 'Delivered', null, 11, 5)
ON CONFLICT (number) DO NOTHING;
COMMIT;

BEGIN;
INSERT INTO assemblies (
    identifier,
    project_id
) VALUES
('FC - 1.0696-CP1E', 11),
('FC - 1.0697-CP1', 11),
('FC - 1.0698-CP1', 11),
('FC - 1.0699-CP1E', 11),
('FC - 1.0700-CP1', 11),
('FC - 1.0701-CP1E', 11),
('FC - 1.0702-CP1', 11),
('FC - 1.0703-CP1E', 11),
('FC - 1.0704-CP1', 11),
('FC - 1.0713-CP1', 11),
('FC - 1.0714-CP1E', 11),
('FC - 1.0715-CP1', 11),
('FC - 1.0716-CP1', 11),
('FC - 1.0717-CP1E', 11),
('FC - 1.0718-CP1', 11),
('FC - 1.0719-CP1E', 11),
('FC - 1.0720-CP1', 11),
('FC - 1.0721-CP1E', 11),
('FC - 1.0739-CP1', 11),
('FC - 1.0740-CP1E', 11),
('FC - 1.0741-CP1', 11),
('FC - 1.0742-CP1E', 11),
('FC - 1.0743-CP1', 11),
('FC - 1.0744-CP1E', 11),
('FC - 1.0745-CP1', 11),
('FC - 1.0746-CP1E', 11),
('FC - 1.0751-CP1E', 11),
('FC - 1.0752-CP1', 11),
('FC - 1.0753-CP1E', 11),
('FC - 1.0754-CP1', 11),
('FC - 1.0755-CP1E', 11),
('FC - 1.0756-CP1E', 11),
('FC - 1.0757-CP1E', 11),
('FC - 1.0758-CP1', 11),
('FC - 1.0780-CP1', 11),
('FC - 1.0781-CP1E', 11),
('FC - 1.0782-CP1', 11),
('FC - 1.0783-CP1E', 11),
('FC - 1.0784-CP1', 11),
('FC - 1.0785-CP1', 11),
('FC - 1.0788-CP1', 11),
('FC - 1.0792-CP1', 11),
('FC - 1.0793-CP1E', 11),
('FC - 1.0794-CP12', 11),
('FC - 1.0795-CP1E', 11),
('FC - 1.0796-CP1', 11),
('FC - 1.0797-CP1E', 11),
('FC - 1.0798-CP1', 11),
('FC - 1.0799-CP1E', 11),
('FC - 1.0800-CP1', 11),
('FC - 1.0801-CP1', 11),
('FC - 1.0802-CP1E', 11),
('FC - 1.0820-CP1', 11)
ON CONFLICT (identifier) DO NOTHING;
COMMIT;

BEGIN;
INSERT INTO assembly_materials (
    assembly_id,
    material_id,
    quantity
) VALUES 
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1),
(6, 1, 1),
(7, 1, 1),
(8, 1, 1),
(9, 1, 1),
(10, 1, 1),
(11, 1, 1),
(12, 1, 1),
(13, 1, 1),
(14, 1, 1),
(15, 1, 1),
(16, 1, 1),
(17, 1, 1),
(18, 1, 1),
(19, 1, 1),
(20, 1, 1),
(21, 1, 1),
(22, 1, 1),
(23, 1, 1),
(24, 1, 1),
(25, 1, 1),
(26, 1, 1),
(27, 1, 1),
(28, 1, 1),
(29, 1, 1),
(30, 1, 1),
(31, 2, 1),
(32, 2, 1),
(33, 2, 1),
(34, 2, 1),
(35, 2, 1),
(36, 2, 1),
(37, 2, 1),
(38, 2, 1),
(39, 2, 1),
(40, 2, 1),
(41, 3, 1),
(42, 3, 1),
(43, 3, 1),
(44, 3, 1),
(45, 3, 1),
(46, 3, 1),
(47, 3, 1),
(48, 3, 1),
(49, 3, 1),
(50, 3, 1);
COMMIT;

BEGIN;
INSERT INTO crate_stock (crate_id, stock_id) VALUES
(1, 1), 
(1, 2), 
(2, 3), 
(2, 4), 
(3, 5), 
(3, 6), 
(4, 7), 
(4, 8);
COMMIT;

BEGIN;
INSERT INTO shipment_crates (shipment_id, crate_id) VALUES
(1, 1), 
(1, 2), 
(2, 3), 
(2, 4), 
(3, 5); 
COMMIT;