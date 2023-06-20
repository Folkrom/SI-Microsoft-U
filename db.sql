CREATE DATABASE IF NOT EXISTS GESTION_EMPRESARIAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE GESTION_EMPRESARIAL;

/*  
	Creacion de tablas
*/
CREATE TABLE IF NOT EXISTS Roles (
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_name VARCHAR(255) NOT NULL,
  CONSTRAINT fk_role_name FOREIGN KEY (role_name) REFERENCES Roles(name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Certificaciones(
	Norma_de_Aplicacion varchar(50),
    Certificado varchar (70),
    Alcance varchar(100),
    Anio date,
    Validez varchar(50)
);

CREATE TABLE IF NOT EXISTS Mercado (
    Nombre_de_la_empresa varchar(50),
    Direccion varchar(100),
    Telefono varchar(20),
    Direccion_de_internet varchar(100),
    Giro varchar(50),
    RFC varchar(20),
    Tamano varchar(20),
    Dueno_de_la_empresa varchar(50),
    Telefono_del_dueno varchar(20),
    Email_del_dueno varchar(100)
);

CREATE TABLE IF NOT EXISTS Identificacion_ISP (
    Nombre varchar(50),
    Tipo_de_dispositivo varchar(50),
    Tipo_de_conexion varchar(50),
    Conexion_maxima varchar(50),
    Ruta varchar(50),
    Direccion_IP varchar(20),
    Alcance varchar(50)
);

CREATE TABLE IF NOT EXISTS Solicitud_ISP (
    Autorizacion varchar(50),
    Ampliacion_de_Autorizacion varchar(50),
    Entidad_Privada varchar(50),
    Autorizacion_Previa_del_ISP varchar(50),
    Criterio_de_Referencia varchar(50),
    Vigencia varchar(50),
    Alcance varchar(50)
);

CREATE TABLE IF NOT EXISTS Formato_Organizacional (
    ID_Empleado int NOT NULL,
    Nombre varchar(100),
    Edad int,
    Genero varchar(10),
    Puesto varchar(50),
    Area varchar(50),
    CURP varchar(18),
    RFC varchar(13),
    Telefono varchar(20),
    Correo varchar(100),
    Pais_de_Origen varchar(50),
    Cede varchar(50),
    Escolaridad varchar(50),
    Diplomados varchar(50),
    Certificaciones varchar(50),
    Idiomas varchar(50),
    PRIMARY KEY (ID_Empleado)
);

CREATE TABLE IF NOT EXISTS Materias_primas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    materia_prima VARCHAR(100),
    fecha_ingreso DATE,
    marca VARCHAR(50),
    lote_produccion VARCHAR(50),
    proveedor VARCHAR(100),
    presentacion VARCHAR(100),
    fecha_vencimiento DATE,
    tipo_empaque VARCHAR(50),
    estado VARCHAR(10), -- bueno | malo | regular
    cantidad FLOAT,
    unidad VARCHAR(20),
    observaciones TEXT
);

CREATE TABLE IF NOT EXISTS Proveedores (
    id INT NOT NULL AUTO_INCREMENT,
    nombre_proveedor VARCHAR(100) NOT NULL,
    rfc VARCHAR(50) NOT NULL,
    numero_contacto VARCHAR(20) NOT NULL,
    producto_servicio VARCHAR(100) NOT NULL,
    precio_unitario FLOAT NOT NULL,
    fecha_entrega DATE NOT NULL,
    forma_pago VARCHAR(50) NOT NULL,
    garantia_servicio_producto VARCHAR(100) NOT NULL,
    fecha_inicio_relacion DATE NOT NULL,
    contacto_principal VARCHAR(100) NOT NULL,
    domicilio_proveedor VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Inmuebles (
    id INT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL,
    arrendador VARCHAR(100) NOT NULL,
    arrendatario VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    tipo_inmueble VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    cantidad INT NOT NULL,
    tipo_material VARCHAR(50) NOT NULL,
    estado_inmueble VARCHAR(50) NOT NULL,
    observaciones TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Clientes (
    id INT NOT NULL AUTO_INCREMENT,
    nombre_cliente VARCHAR(100) NOT NULL,
    edad INT,
    genero VARCHAR(20),
    empresa VARCHAR(100),
    telefono VARCHAR(20),
    curp VARCHAR(20),
    rfc VARCHAR(20),
    sede VARCHAR(50),
    correo VARCHAR(100),
    domicilio VARCHAR(200),
    alcaldia VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Empleados (
    id INT NOT NULL AUTO_INCREMENT,
    nombre_solicitante VARCHAR(100) NOT NULL,
    id_empleado INT NOT NULL,
    edad INT,
    genero VARCHAR(20),
    puesto VARCHAR(100),
    area VARCHAR(100),
    curp VARCHAR(20),
    rfc VARCHAR(20),
    salario_neto FLOAT,
    salario_bruto FLOAT,
    sede VARCHAR(50),
    horario VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    pais_origen VARCHAR(50),
    domicilio VARCHAR(200),
    escolaridad VARCHAR(100),
    certificaciones VARCHAR(200),
    num_hijos INT,
    beneficiarios VARCHAR(200),
    enfermedades TEXT,
    PRIMARY KEY (id)
);






-- insertar datos necesarios
INSERT INTO Roles (name) 
VALUES ('Administrador'), ('CEO'), ('Recursos Humanos'), ('Ventas'), ('Finanzas'), ('TI'),
('Auditoría'), ('Producción');
INSERT INTO Users (username, password, role_name) 
VALUES ('admin', '$2b$10$zrsP6yrp4V5WyDXaUPHAS.nRQRlnksjMeUMyKSowmXQBmTHGiqB/u', 'Administrador');

INSERT INTO Certificaciones (Norma_de_Aplicacion, Certificado, Alcance, Año, Validez) VALUES
('ISO 27001', 'Certificado de seguridad de la información', 'Sistemas de gestión de seguridad de la información', '2021-01-01', '3 años'),
('ITIL 4', 'Certificado de gestión de servicios de TI', 'Gestión de servicios de TI', '2022-03-15', '5 años'),
('AWS Solutions Architect', 'Certificado de arquitectura de soluciones de AWS', 'Arquitectura de soluciones en la nube', '2023-05-01', '2 años');
INSERT INTO Mercado (Nombre_de_la_Empresa, Direccion, Telefono, Direccion_de_Internet, Giro, RFC, Tamano, Dueno_de_la_Empresa, Email_del_dueno) VALUES 
('Acme Software', 'Av. Tecnológico 123, Ciudad de México, México', '+52 555-123-4567', 'www.acmesoftware.com', 'Desarrollo de software', 'ASO123456AS1', 'Grande', 'John Doe', 'jdoe@acmesoftware.com'),
('Beta IT Services', '123 Main Street, San Francisco, Estados Unidos', '+1 555-123-4567', 'www.betaitservices.com', 'Servicios de TI', 'BIS123456BI1', 'Pequeña', 'Alice Smith', 'asmith@betaitservices.com'),
('Charlie Cybersecurity', '15 Queen Street, Toronto, Canadá', '+1 555-123-4567', 'www.charliecybersecurity.com', 'Seguridad informática', 'CCS123456CC1', 'Mediana', 'Kevin Brown', 'kbrown@charliecybersecurity.com');
INSERT INTO Identificacion_ISP (Nombre, Tipo_de_Dispositivo, Tipo_de_Conexion, Conexion_Maxima, Ruta, Direccion_IP, Alcance) VALUES
('Acme IT Services', 'Router', 'Fibra Óptica', '1 Gbps', '/ruta/1', '192.168.1.1', 'Local'),
('Beta Network Solutions', 'Switch', 'Ethernet', '10 Gbps', '/ruta/2', '192.168.2.1', 'Regional'),
('Charlie Cloud Services', 'Firewall', 'VPN', '100 Mbps', '/ruta/3', '192.168.3.1', 'Nacional');
INSERT INTO Solicitud_ISP (Autorizacion, Ampliacion_de_Autorizacion, Entidad_Privada, Autorizacion_Previa_del_ISP, Criterio_de_Referencia, Vigencia, Alcance) VALUES
('Conexión a internet para nueva oficina', NULL, 'Acme IT Services', 'Sí', 'Conexión de 1 Gbps', '12 meses', 'Local'),
('Ampliación de conexión a internet', 'Sí', 'Beta Network Solutions', 'Sí', 'Conexión de 10 Gbps', '24 meses', 'Regional'),
('Conexión a internet para nueva sede', NULL, 'Charlie Cloud Services', 'Sí', 'Conexión de 100 Mbps', '18 meses', 'Nacional');
INSERT INTO Formato_Organizacional (ID_Empleado, Nombre, Edad, Genero, Puesto, Area, CURP, RFC, Telefono, Correo, Pais_de_Origen, Cede, Escolaridad, Diplomados, Certificaciones, Idiomas) VALUES 
(1001, 'David Luiz', 28, 'M', 'Desarrollador de software', 'Desarrollo', 'LUDA123456XXXXXX01', 'LUDA123456XX1', '555-555-5555', 'jdoe@example.com', 'México', 'Ciudad de México', 'Licenciatura en Informática', 'Ninguno', 'Certificado en AWS', 'Inglés'),
(1002, 'Sofia Covarrubias', 35, 'F', 'Gerente de proyecto', 'Proyectos', 'CLVU123456XXXXXX02', 'CLVU123456XX2', '555-555-5556', 'sofirub@example.com', 'Estados Unidos', 'Nueva York', 'Maestría en Administración de Empresas', 'PMP', 'Certificado en SCRUM', 'Inglés, Español'),
(1003, 'Alexis Guzman', 24, 'M', 'Analista de seguridad', 'Seguridad', 'GUZA123456XXXXXX03', 'GUZA123456XX3', '555-555-5557', 'kbrown@example.com', 'Canadá', 'Toronto', 'Licenciatura en Seguridad Informática', 'Ninguno', 'Certificado en CISSP', 'Inglés, Francés');

INSERT INTO Materias_primas (materia_prima, fecha_ingreso, marca, lote_produccion, proveedor, presentacion, fecha_vencimiento, tipo_empaque, estado, cantidad, unidad, observaciones)
VALUES 
('Tarjeta madre', '2023-06-19', 'ASUS', 'LOT123', 'Proveedor A', 'Caja de 10 unidades', '2024-06-19', 'Caja', 'Bueno', 50, 'piezas', 'Materia prima para ensamble de computadoras.'),
('Memoria RAM', '2023-06-18', 'Crucial', 'LOT456', 'Proveedor B', 'Paquete de 5 unidades', '2025-06-18', 'Paquete', 'Regular', 100, 'piezas', 'Materia prima para ampliación de memoria en equipos.'),
('Tinta de impresora', '2023-06-17', 'InkMaster', 'LOT789', 'Epson', 'Unidad individual', '2026-06-17', 'Bidon', 'Bueno', 50, 'litros', 'Tinta para impresora color negro.');

INSERT INTO Proveedores (nombre_proveedor, rfc, numero_contacto, producto_servicio, precio_unitario, fecha_entrega, forma_pago, garantia_servicio_producto, fecha_inicio_relacion, contacto_principal, domicilio_proveedor)
VALUES
('ACME', 'ACM123456789', '5551234567', 'Hardware', 2500.00, '2023-05-15', 'Transferencia bancaria', 'Garantía de 1 año', '2021-01-01', 'Juan Pérez', 'Av. Tecnológico #123'),
('Microtek', 'MTK123456789', '5559876543', 'Software', 500.00, '2023-05-20', 'PayPal', 'Garantía de 6 meses', '2021-02-15', 'Ana García', 'Calle de la Innovación #456'),
('Intel', 'INT123456789', '5552468100', 'Hardware', 12000.00, '2023-05-30', 'Tarjeta de crédito', 'Garantía de 2 años', '2020-06-01', 'José López', 'Paseo de la Tecnología #789');

INSERT INTO Inmuebles (fecha, arrendador, arrendatario, direccion, tipo_inmueble, descripcion, cantidad, tipo_material, estado_inmueble, observaciones) 
VALUES 
('2022-01-01', 'Inmuebles SA de CV', 'Empresa TI', 'Av. Tecnológico 123', 'Oficina', 'Oficina con 2 cubículos y sala de juntas', 1, 'Concreto', 'Bueno', 'Recién remodelado'),
('2022-02-01', 'Fernanda Salas', 'Empresa TI', 'Av. Juárez 456', 'Bodega', 'Bodega de almacenamiento con entrada para camiones', 1, 'Acero', 'Regular', 'Falta mantenimiento'),
('2022-03-01', 'Inmobiliaria Tellez', 'Empresa TI', 'Calle Reforma 789', 'Oficina', 'Oficina con 4 cubículos y área de descanso', 1, 'Madera', 'Bueno', 'Ninguna observación');

INSERT INTO Clientes (nombre_cliente, edad, genero, empresa, telefono, curp, rfc, sede, correo, domicilio, alcaldia) VALUES
('Juan Perez', 35, 'Masculino', 'Empresa TI SA de CV', '55555555', 'PEAJ880726HMCSR01', 'PEAJ880726123', 'Ciudad de Mexico', 'juan.perez@empresati.com', 'Calle 123 Col. Centro', 'Cuauhtemoc'),
('Maria Rodriguez', 28, 'Femenino', 'Empresa TI SA de CV', '44444444', 'ROGM890626MDFRDR01', 'ROGM890626123', 'Ciudad de Mexico', 'maria.rodriguez@empresati.com', 'Avenida 456 Col. Polanco', 'Miguel Hidalgo'),
('Pedro Gomez', 42, 'Masculino', 'Empresa TI SA de CV', '33333333', 'GOJP780405HMCLRZ09', 'GOJP780405123', 'Ciudad de Mexico', 'pedro.gomez@empresati.com', 'Calle 789 Col. Del Valle', 'Benito Juarez');

INSERT INTO Empleados (nombre_solicitante, id_empleado, edad, genero, puesto, area, curp, rfc, salario_neto, salario_bruto, sede, horario, telefono, correo, pais_origen, domicilio, escolaridad, certificaciones, num_hijos, beneficiarios, enfermedades) VALUES
('Juan Perez', 3456, 28, 'Masculino', 'Desarrollador de software', 'Tecnología', 'PERJ920820HCMXNNA2', 'PERJ920820', 45000.00, 55000.00, 'Ciudad de México', '9:00 - 18:00', '55 1234 5678', 'juan.perez@empresa.com', 'México', 'Av. Reforma 123, Ciudad de México', 'Licenciatura en Ciencias de la Computación', 'Certificación en Java', 0, '', NULL),
('Ana Torres', 7890, 32, 'Femenino', 'Gerente de Proyectos', 'Proyectos', 'TOAA870528MCMNRR03', 'TOAA870528', 70000.00, 90000.00, 'Guadalajara', '8:00 - 17:00', '33 9876 5432', 'ana.torres@empresa.com', 'México', 'Av. Vallarta 456, Guadalajara', 'Maestría en Administración de Empresas', 'Certificación en PMP', 2, 'Esposo e hijo', 'Hipertensión arterial');

