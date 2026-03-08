<div>
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>

### Initial design and db building

students: id_student (PK, auto-increment), full_name, email, gender, identification (UNIQUE), major, birthdate, enrollment_date
teachers: id_teacher (PK, auto-increment), full_name, institutional_email, academic_department, years_experience
courses: id_course (PK, auto-increment), name, code (UNIQUE), credits, semester, id_teacher (FK)
enrollments: id_enrollment (PK, auto-increment), id_student (FK), id_course (FK), enrollment_date, final_grade

```
CREATE TABLE student (
	id 	INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(45),
	email VARCHAR(45),
	genre ENUM('Male','Female'),
	document VARCHAR(45) UNIQUE,
	career VARCHAR(45),
	birthdate DATE,
	registered_at DATE
)

CREATE TABLE teacher (
	id_teacher INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(45),
	email VARCHAR(45),
	academic_department VARCHAR(45),
	experience INT
)

CREATE TABLE course (
	id_curso INT AUTO_INCREMENT PRIMARY KEY,
	course VARCHAR(45),
	code VARCHAR(10) UNIQUE,
	credits INT,
	semester INT,
	id_teacher INT,
	CONSTRAINT fk_teacher
	FOREIGN KEY (id_teacher)
	REFERENCES teacher(id_teacher)
)
```

### Inserting data

Insert at least 5 students, 3 teachers and 4 courses.
Generate 8 enrollments distributed among courses and students.

````
Database and Tables Creation (DDL)

Create database
```sql
CREATE DATABASE gestion_academica_universidad;
USE gestion_academica_universidad;
````

```sql
CREATE TABLE students (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(45) NOT NULL,
    correo_electronico VARCHAR(45) NOT NULL UNIQUE,
    genero ENUM('M','F','Otro') NOT NULL,
    identificacion VARCHAR(45) NOT NULL UNIQUE,
    carrera VARCHAR(45) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_ingreso DATE NOT NULL,
    CHECK (fecha_ingreso >= fecha_nacimiento)
);
```

#### Teachers table

```sql
CREATE TABLE teachers (
    id_docente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(45) NOT NULL,
    correo_institucional VARCHAR(45) NOT NULL UNIQUE,
    departamento_academico VARCHAR(45) NOT NULL,
    anios_experiencia INT NOT NULL CHECK (anios_experiencia >= 0)
);
```

#### Courses table

```sql
CREATE TABLE courses (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    codigo VARCHAR(45) NOT NULL UNIQUE,
    creditos INT NOT NULL CHECK (creditos > 0),
    semestre INT NOT NULL CHECK (semestre >= 1),
    id_docente INT,
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente)
        ON DELETE SET NULL
);
```

#### Enrollments table

```sql
CREATE TABLE enrollments (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_curso INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    calificacion_final DECIMAL(4,2) CHECK (calificacion_final BETWEEN 0 AND 5),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante)
        ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
        ON DELETE CASCADE
);
```

---

### Data Insertion (DML)

Insert students

```sql
INSERT INTO estudiantes (nombre_completo, correo_electronico, genero, identificacion, carrera, fecha_nacimiento, fecha_ingreso) VALUES
('Carlos Gomez','carlos@correo.com','M','2006','Sistemas','1997-04-10','2016-02-01'),
('Valentina Perez','valentina@correo.com','F','2007','Ingenieria','2002-01-18','2020-02-01'),
('Andres Castillo','andres@correo.com','M','2008','Contabilidad','1999-12-03','2018-02-01'),
('Camila Torres','camila@correo.com','F','2009','Administracion','2001-06-25','2019-02-01'),
('Jorge Ramirez','jorge@correo.com','M','2010','Sistemas','1998-08-14','2017-02-01');
```

Insert teachers

```sql
INSERT INTO docentes (nombre_completo, correo_institucional, departamento_academico, anios_experiencia) VALUES
('Laura Martinez','laura@uni.edu','Administracion',10),
('Carlos Ramirez','carlos@uni.edu','Sistemas',7),
('Patricia Gomez','patricia@uni.edu','Ingenieria',9),
('Andres Morales','andres@uni.edu','Contabilidad',5),
('Sofia Herrera','sofia@uni.edu','Administracion',11);
```

Insert courses

```sql
INSERT INTO cursos (nombre, codigo, creditos, semestre, id_docente) VALUES
('Estructuras de Datos','EDT201',4,2,1),
('Desarrollo Web','WEB202',4,2,1),
('Analisis de Sistemas','ANS301',3,3,2),
('Contabilidad Financiera','CON101',3,1,3),
('Administracion de Proyectos','ADM201',3,2,3);
```

Insert enrollments (8)

```sql
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES
(6,1,'2024-03-10',4.3),
(6,2,'2024-03-10',3.9),
(7,3,'2024-03-10',4.7),
(7,4,'2024-03-10',3.6),
(8,1,'2024-03-10',4.4),
(8,2,'2024-03-10',3.8),
(9,3,'2024-03-10',4.0),
(9,4,'2024-03-10',3.7),
(10,1,'2024-03-10',4.5),
(10,2,'2024-03-10',4.1);
```

---

3 – Queries and Manipulation (DQL + DDL)

1. JOIN students with courses

```sql
SELECT e.nombre_completo, c.nombre AS curso, i.calificacion_final
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
JOIN cursos c ON i.id_curso = c.id_curso;
```

2. Courses taught by teachers with > 5 years

```sql
SELECT c.nombre, d.nombre_completo, d.anios_experiencia
FROM cursos c
JOIN docentes d ON c.id_docente = d.id_docente
WHERE d.anios_experiencia > 5;
```

3. Average per course

```sql
SELECT c.nombre, AVG(i.calificacion_final) AS promedio
FROM cursos c
JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.nombre;
```

4. Students in more than one course

```sql
SELECT e.nombre_completo, COUNT(*) AS total_cursos
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.nombre_completo
HAVING COUNT(*) > 1;
```

5. ALTER TABLE

```sql
ALTER TABLE estudiantes
ADD estado_academico VARCHAR(45) DEFAULT 'Activo';
```

6. Delete teacher (see ON DELETE SET NULL effect)

```sql
DELETE FROM docentes WHERE id_docente = 3;
```

7. Courses with more than 2 students

```sql
SELECT c.nombre, COUNT(i.id_estudiante) AS total_estudiantes
FROM cursos c
JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.nombre
HAVING COUNT(i.id_estudiante) > 2;
```

---

4 – Subqueries and Functions

1. Students with average > general average

```sql
SELECT e.nombre_completo, AVG(i.calificacion_final) AS promedio_estudiante
FROM estudiantes e
JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.id_estudiante
HAVING AVG(i.calificacion_final) >
    (SELECT AVG(calificacion_final) FROM inscripciones);
```

2. Majors with students in semester ≥ 2

```sql
SELECT DISTINCT carrera
FROM estudiantes
WHERE id_estudiante IN (
    SELECT i.id_estudiante
    FROM inscripciones i
    JOIN cursos c ON i.id_curso = c.id_curso
    WHERE c.semestre >= 2
);
```

3. Indicators with functions

```sql
SELECT
    ROUND(AVG(calificacion_final),2) AS promedio_general,
    SUM(calificacion_final) AS suma_total,
    MAX(calificacion_final) AS nota_maxima,
    MIN(calificacion_final) AS nota_minima,
    COUNT(*) AS total_registros
FROM inscripciones;
```

---

5 – Create View

```sql
CREATE VIEW vista_historial_academico AS
SELECT
    e.nombre_completo AS estudiante,
    c.nombre AS curso,
    d.nombre_completo AS docente,
    c.semestre,
    i.calificacion_final
FROM inscripciones i
JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
JOIN cursos c ON i.id_curso = c.id_curso
LEFT JOIN docentes d ON c.id_docente = d.id_docente;
```

---

6 – Permissions and Transactions (DCL + TCL)

1. Create role and grant permissions

```sql
CREATE ROLE revisor_academico;

GRANT SELECT ON gestion_academica_universidad.vista_historial_academico TO revisor_academico;

REVOKE INSERT, UPDATE, DELETE
ON gestion_academica_universidad.inscripciones
FROM revisor_academico;
```

2. Transactions

```sql
START TRANSACTION;

UPDATE inscripciones
SET calificacion_final = 4.8
WHERE id_inscripcion = 1;

SAVEPOINT cambio1;

UPDATE inscripciones
SET calificacion_final = 2.0
WHERE id_inscripcion = 2;

ROLLBACK TO cambio1;

COMMIT;
```

```

```
