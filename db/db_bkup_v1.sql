-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Aug 06, 2014 at 07:11 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Proyecto_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `carrera`
--

CREATE TABLE `carrera` (
  `id_carrera` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` int(3) NOT NULL,
  `thumb` varchar(255) NOT NULL,
  PRIMARY KEY (`id_carrera`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carrera`
--

INSERT INTO `carrera` (`id_carrera`, `nombre`, `estado`, `thumb`) VALUES
(1, 'Desarrollo y diseño Web', 1, 'test.png'),
(2, 'Desarrollo de software', 1, 'test.png'),
(3, 'Integración de tecnologías', 1, 'test.png'),
(4, 'Telemática', 1, 'test.png'),
(5, 'Ciberseguridad', 1, 'test.png'),
(6, 'Tecnología de bases de datos', 1, 'test.png'),
(7, 'Inglés', 1, 'test.png');

-- --------------------------------------------------------

--
-- Table structure for table `comentario_foro`
--

CREATE TABLE `comentario_foro` (
  `id_comentario_foro` int(255) NOT NULL AUTO_INCREMENT,
  `id_foro` int(255) NOT NULL,
  `id_usuario` int(255) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `calificacion` int(255) NOT NULL,
  `estado` int(3) NOT NULL,
  PRIMARY KEY (`id_comentario_foro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `comentario_post`
--

CREATE TABLE `comentario_post` (
  `id_comentario_post` int(255) NOT NULL AUTO_INCREMENT,
  `id_post` int(255) NOT NULL,
  `id_usuario` int(255) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `estado` int(3) NOT NULL,
  PRIMARY KEY (`id_comentario_post`),
  UNIQUE KEY `id_comentario_post` (`id_comentario_post`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `curso`
--

CREATE TABLE `curso` (
  `id_curso` varchar(255) NOT NULL,
  `id_carrera` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` int(3) NOT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `curso`
--

INSERT INTO `curso` (`id_curso`, `id_carrera`, `nombre`, `estado`) VALUES
('BD1', 6, 'Programación avanzada en SQL', 1),
('BD10', 6, 'Seguridad de bases de datos', 1),
('BD11', 6, 'Minería de datos 1', 1),
('BD12', 6, 'Depósitos de datos avanzados', 1),
('BD13', 6, 'Arquitectura de bases de datos en ambientes distribuidos', 1),
('BD14', 6, 'Buenas prácticas en ambientes de bases de datos', 1),
('BD15', 6, 'Proyecto de investigación aplicada 1', 1),
('BD16', 6, 'Analítica empresarial', 1),
('BD17', 6, 'Proyecto de investigación aplicada 2', 1),
('BD2', 6, 'Bases de datos relacionales-objeto', 1),
('BD3', 6, 'Administración de proyectos', 1),
('BD4', 6, 'Administración de bases de datos', 1),
('BD5', 6, 'Diseño y calidad de datos', 1),
('BD6', 6, 'Depósitos de datos', 1),
('BD7', 6, 'Gobernanza de la información', 1),
('BD8', 6, 'Afinamiento y rendimiento de bases de datos', 1),
('BD9', 6, 'Bases de datos multidimensionales', 1),
('CS1', 5, 'Introducción a la seguridad de la información', 1),
('CS10', 5, 'Seguridad y protocolos de comunicación', 1),
('CS11', 5, 'Seguridad de aplicaciones y sistemas', 1),
('CS12', 5, 'Seguridad de datos almacenados', 1),
('CS13', 5, 'Análisis y detección de vulnerabilidades', 1),
('CS14', 5, 'Continuidad del negocio y recuperación de desastres', 1),
('CS15', 5, 'Análisis y evaluación de riesgos de seguridad', 1),
('CS16', 5, 'Proyecto de investigación aplicada 1', 1),
('CS17', 5, 'Electiva', 1),
('CS18', 5, 'Arquitectura y diseño de seguridad', 1),
('CS19', 5, 'Administración del sistema de gestión de seguridad de la información', 1),
('CS2', 5, 'Principios de criptografía', 1),
('CS20', 5, 'Proyecto de investigación aplicada 2', 1),
('CS3', 5, 'Tecnología de redes y telecomunicaciones seguras', 1),
('CS4', 5, 'Métodos de investigación aplicada', 1),
('CS5', 5, 'Control de acceso, seguridad ambiental y física', 1),
('CS6', 5, 'Criptografía aplicada', 1),
('CS7', 5, 'Seguridad en redes inalámbricas y dispositivos móviles', 1),
('CS8', 5, 'Seguridad en sistemas operativos', 1),
('CS9', 5, 'Aspectos culturales, éticos, legales y regulatorios', 1),
('DS1', 2, 'Fundamentos de programación', 1),
('DS10', 2, 'Programación con patrones', 1),
('DS11', 2, 'Proyecto de ingeniería del software 2', 1),
('DS12', 2, 'Estructuras de datos', 1),
('DS13', 2, 'Inglés para tecnologías de información 3', 1),
('DS14', 2, 'Diseño conceptual de software', 1),
('DS15', 2, 'Programación de bases de datos', 1),
('DS16', 2, 'Diseño y construcción de componentes', 1),
('DS17', 2, 'Arquitectura de computadoras', 1),
('DS18', 2, 'Inglés para tecnologías de información 4', 1),
('DS19', 2, 'Proyecto de ingeniería del software 3', 1),
('DS2', 2, 'Proyecto de ingeniería del software 1', 1),
('DS20', 2, 'Estructura de datos 2', 1),
('DS21', 2, 'Principios de sistemas operativos', 1),
('DS22', 2, 'Portafolio profesional', 1),
('DS23', 2, 'Ética y profesionalismo', 1),
('DS3', 2, 'Introducción a la tecnología de información', 1),
('DS4', 2, 'Inglés para tecnologías de información 1', 1),
('DS5', 2, 'Programación orientada a objetos', 1),
('DS6', 2, 'Fundamentos de bases de datos', 1),
('DS7', 2, 'Estructuras discretas', 1),
('DS8', 2, 'Procesos empresariales', 1),
('DS9', 2, 'Inglés para tecnologías de información 2', 1),
('DW1', 1, 'DDW-Diseño Web 1', 1),
('DW10', 1, 'DDW-Fundamentos de bases de datos', 1),
('DW11', 1, 'DDW-Inglés para tecnologías de información 3', 1),
('DW12', 1, 'DDW-Diseño de la experiencia del usuario', 1),
('DW13', 1, 'DDW-Tecnologías avanzadas de diseño Web', 1),
('DW14', 1, 'DDW-Comunicación de información en la Web', 1),
('DW15', 1, 'DDW-Inglés para tecnologías de información 4', 1),
('DW16', 1, 'DDW-Introducción a la tecnología de la información', 1),
('DW17', 1, 'DDW-Estructuras discretas', 1),
('DW18', 1, 'DDW-Programación Web interactiva', 1),
('DW19', 1, 'DDW-Comunicación social en la Web', 1),
('DW2', 1, 'DDW-Diseño visual digital 1', 1),
('DW20', 1, 'DDW-Programación del lado del servidor', 1),
('DW21', 1, 'DDW-Proyecto de desarrollo Web 2', 1),
('DW22', 1, 'DDW-Animación Web 2D', 1),
('DW23', 1, 'DDW-Posicionamiento en la Web', 1),
('DW24', 1, 'DDW-Procesos empresariales', 1),
('DW25', 1, 'DDW-Inglés para tecnologías de información 5', 1),
('DW26', 1, 'DIW-Diseño Web', 1),
('DW27', 1, 'DIW-Taller de imagen digital', 1),
('DW28', 1, 'DIW-Fundamentos de diseño gráfico', 1),
('DW29', 1, 'DIW-Introducción a la tecnología de la información', 1),
('DW3', 1, 'DDW-Fundamentos de programación Web', 1),
('DW30', 1, 'DIW-Inglés para tecnologías de información 1', 1),
('DW31', 1, 'DIW-Diseño de la interacción 1', 1),
('DW32', 1, 'DIW-Fundamentos de programación Web', 1),
('DW33', 1, 'DIW-Tecnologías avanzadas de diseño Web', 1),
('DW34', 1, 'DIW-Inglés para tecnologías de información 2', 1),
('DW35', 1, 'DIW-Diseño de la interacción 2', 1),
('DW36', 1, 'DIW-Programación Web dinámica', 1),
('DW37', 1, 'DIW-Comunicación de información en la Web', 1),
('DW38', 1, 'DIW-Dirección y evaluación de proyectos', 1),
('DW39', 1, 'DIW-Inglés para tecnologías de información 3', 1),
('DW4', 1, 'DDW-Inglés para tecnologías de información 1', 1),
('DW40', 1, 'DIW-Diseño de la interacción 3', 1),
('DW41', 1, 'DIW-Proyecto de diseño Web', 1),
('DW42', 1, 'DIW-Mercadeo y publicidad en medios digitales', 1),
('DW43', 1, 'DIW-Estadística, análisis e ingeniería', 1),
('DW44', 1, 'DIW-Inglés para tecnologías de información 4', 1),
('DW5', 1, 'DDW-Diseño Web 2', 1),
('DW6', 1, 'DDW-Diseño visual digital 2', 1),
('DW7', 1, 'DDW-Programación Web dinámica', 1),
('DW8', 1, 'DDW-Inglés para tecnologías de información 2', 1),
('DW9', 1, 'DDW-Proyecto de desarrollo Web 1', 1),
('I1', 7, 'Intermediate English 1', 1),
('I10', 7, 'Customer Service and Troubleshooting', 1),
('I11', 7, 'Professional Ethics Workshop', 1),
('I12', 7, 'TOEIC Preparation Workshop', 1),
('I2', 7, 'Introduction to Service Centers', 1),
('I3', 7, 'Office Automation', 1),
('I4', 7, 'Intermediate English 2', 1),
('I5', 7, 'Oral Communication Techniques', 1),
('I6', 7, 'Written communication techniques', 1),
('I7', 7, 'Advanced English', 1),
('I8', 7, 'Cross-cultural diversity', 1),
('I9', 7, 'Human Factor', 1),
('InT1', 3, 'Introducción a la tecnología de información', 1),
('InT10', 3, 'Inglés para tecnologías de información 2', 1),
('InT11', 3, 'Sistemas operativos 2', 1),
('InT12', 3, 'Tecnología telemática 3', 1),
('InT13', 3, 'Fundamentos de bases de datos', 1),
('InT14', 3, 'Ofimática', 1),
('InT15', 3, 'Inglés para tecnologías de información 3', 1),
('InT16', 3, 'Arquitectura de computadoras', 1),
('InT17', 3, 'Proyecto de integración de tecnologías 1', 1),
('InT18', 3, 'Tecnología telemática 4', 1),
('InT19', 3, 'Administración de bases de datos 1', 1),
('InT2', 3, 'Laboratorio de tecnologías 1', 1),
('InT20', 3, 'Inglés para tecnologías de información 4', 1),
('InT21', 3, 'Sistemas operativos 3', 1),
('InT22', 3, 'Proyecto de integración de tecnologías 2', 1),
('InT23', 3, 'Administración de bases de datos 2', 1),
('InT24', 3, 'Proyecto web 1', 1),
('InT25', 3, 'Estructuras discretas', 1),
('InT26', 3, 'Proyecto de integración de tecnologías 3', 1),
('InT27', 3, 'Proyecto web 2', 1),
('InT28', 3, 'Procesos empresariales', 1),
('InT29', 3, 'Probabilidad y estadística 1', 1),
('InT3', 3, 'Tecnología telemática 1', 1),
('InT30', 3, 'Ética y profesionalismo', 1),
('InT31', 3, 'Seguridad informática', 1),
('InT32', 3, 'Derecho informático', 1),
('InT33', 3, 'Administración de proyectos 1', 1),
('InT34', 3, 'Sociedad y TIC', 1),
('InT35', 3, 'Cálculo diferencial e integral', 1),
('InT36', 3, 'Proyecto de integración de tecnologías 4', 1),
('InT37', 3, 'Administración de servicios informáticos', 1),
('InT38', 3, 'Administración de proyectos 2', 1),
('InT39', 3, 'Física 1', 1),
('InT4', 3, 'Fundamentos de programación', 1),
('InT40', 3, 'Álgebra lineal', 1),
('InT41', 3, 'Arquitectura tecnológica', 1),
('InT42', 3, 'Aseguramiento de la continuidad del negocio', 1),
('InT43', 3, 'Probabilidad y estadística 2', 1),
('InT44', 3, 'Física 2', 1),
('InT5', 3, 'Inglés para tecnologías de información', 1),
('InT6', 3, 'Laboratorio de tecnologías 2', 1),
('InT7', 3, 'Sistemas operativos 1', 1),
('InT8', 3, 'Tecnología telemática 2', 1),
('InT9', 3, 'Programación y estructura de datos', 1),
('T1', 4, 'T-Tecnología de redes 1', 1),
('T10', 4, 'T-Inglés para tecnologías de información 2', 1),
('T11', 4, 'T-Tecnología de redes 3', 1),
('T12', 4, 'T-Infraestructura de fibra óptica', 1),
('T13', 4, 'T-Sistemas operativos 1', 1),
('T14', 4, 'T-Fundamentos de bases de datos', 1),
('T15', 4, 'T-Inglés para tecnologías de información 3', 1),
('T16', 4, 'T-Tecnología de redes 4', 1),
('T17', 4, 'T-Diseño de centros de datos e infraestructura de redes', 1),
('T18', 4, 'T-Sistemas operativos 2', 1),
('T19', 4, 'T-Procesos empresariales', 1),
('T2', 4, 'T-Tecnología de comunicaciones y cableado', 1),
('T20', 4, 'T-Inglés para tecnologías de información 4', 1),
('T21', 4, 'T-Proyecto de integración de tecnologías 1', 1),
('T22', 4, 'T-Convergencia de voz y datos', 1),
('T23', 4, 'T-Redes inalámbricas', 1),
('T24', 4, 'T-Seguridad en las redes', 1),
('T25', 4, 'T-Servicio al cliente', 1),
('T26', 4, 'T-Factor humano', 1),
('T27', 4, 'T-Inglés para tecnologías de información 5 (Curso optativo)', 1),
('T28', 4, 'T-Proyecto de diseño de redes empresariales', 1),
('T29', 4, 'T-Administración de redes', 1),
('T3', 4, 'T-Introducción a la tecnología de información', 1),
('T30', 4, 'T-Análisis y diagnóstico de redes', 1),
('T31', 4, 'T-Probabilidad y estadísitca 1', 1),
('T32', 4, 'T-Ética y profesionalismo', 1),
('T33', 4, 'T-Inglés para tecnologías de información 6 (Curso optativo)', 1),
('T34', 4, 'RC-Tecnología de comunicaciones y cableado', 1),
('T35', 4, 'RC-Introducción a la tecnología de información', 1),
('T36', 4, 'RC-Inglés para tecnologías de información 1', 1),
('T37', 4, 'RC-Tecnología de redes 1', 1),
('T38', 4, 'RC-Fundamentos de fibra óptica', 1),
('T39', 4, 'RC-Inglés para tecnologías de información 2', 1),
('T4', 4, 'T-Laboratorio de tecnologías 1', 1),
('T40', 4, 'RC-Tecnología de redes 2', 1),
('T41', 4, 'RC-Infraestructura de fibra óptica', 1),
('T42', 4, 'RC-Inglés para tecnologías de información 3', 1),
('T43', 4, 'RC-Redes inalámbricas', 1),
('T44', 4, 'RC-Diseño de centros de datos e infraestructura de redes', 1),
('T45', 4, 'RC-Inglés para tecnologías de información 4', 1),
('T46', 4, 'RyC-IT Essentials', 1),
('T47', 4, 'RyC-Módulo 1: Introducción a redes', 1),
('T48', 4, 'RyC-Módulo 2: Principios de enrutamiento y conmutación', 1),
('T49', 4, 'RyC-Preparación para examen de certificación CCENT', 1),
('T5', 4, 'T-Inglés para tecnologías de información 1', 1),
('T50', 4, 'RyC-Módulo 3: Redes escalables', 1),
('T51', 4, 'RyC-Módulo 4: Interconexión de redes', 1),
('T52', 4, 'RyC-Preparación para examen de certificación CCNA R&S', 1),
('T6', 4, 'T-Tecnología de redes 2', 1),
('T7', 4, 'T-Fundamentos de fibra óptica', 1),
('T8', 4, 'T-Fundamentos de programación', 1),
('T9', 4, 'T-Estructuras discretas', 1);

-- --------------------------------------------------------

--
-- Table structure for table `documento`
--

CREATE TABLE `documento` (
  `id_documento` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(255) NOT NULL,
  `id_curso` int(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `calificacion` int(255) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `foro`
--

CREATE TABLE `foro` (
  `id_foro` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(255) NOT NULL,
  `id_curso` int(255) NOT NULL,
  `id_moderador` int(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `periodo` varchar(255) NOT NULL,
  `estado` int(3) NOT NULL,
  PRIMARY KEY (`id_foro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `historial_descargas`
--

CREATE TABLE `historial_descargas` (
  `id_usuario` int(255) NOT NULL,
  `id_documento` int(255) NOT NULL,
  `estado` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invitado_foro`
--

CREATE TABLE `invitado_foro` (
  `id_foro` int(255) NOT NULL,
  `id_usuario` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id_post` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `texto` int(255) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_post`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ranking`
--

CREATE TABLE `ranking` (
  `id_ranking` int(255) NOT NULL AUTO_INCREMENT,
  `num_uno` int(255) NOT NULL,
  `num_dos` int(255) NOT NULL,
  `num_tres` int(255) NOT NULL,
  `num_cuatro` int(255) NOT NULL,
  `num_cinco` int(255) NOT NULL,
  `ranking_uno` int(255) NOT NULL,
  `ranking_dos` int(255) NOT NULL,
  `ranking_tres` int(255) NOT NULL,
  `ranking_cuatro` int(255) NOT NULL,
  `ranking_cinco` int(255) NOT NULL,
  PRIMARY KEY (`id_ranking`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(255) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `estado` int(3) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `calificacion` int(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `tipo`, `email`, `nombre`, `apellido`, `estado`, `genero`, `calificacion`, `password`) VALUES
(1, 'p', 'alvaro@ucenfotec.ac.cr', 'Álvaro', 'Cordero Peña', 1, 'm', 0, '123'),
(2, 'e', 'juan@ucenfotec.ac.cr', 'Juan', 'Pérez Padilla', 1, 'm', 0, '123'),
(3, 'a', 'admin@ucenfotec.ac.cr', 'John', 'Doe', 1, 'm', 0, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_x_curso`
--

CREATE TABLE `usuario_x_curso` (
  `id_curso` int(255) NOT NULL,
  `id_usuario` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
