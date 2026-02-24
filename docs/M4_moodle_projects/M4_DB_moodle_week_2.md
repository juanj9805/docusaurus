<div>
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>

### Initial design and db building
estudiantes: id_estudiante (PK, autoincremental), nombre_completo, correo_electronico, genero, identificacion (UNIQUE), carrera, fecha_nacimiento, fecha_ingreso
docentes: id_docente (PK, autoincremental), nombre_completo, correo_institucional, departamento_academico, anios_experiencia
cursos: id_curso (PK, autoincremental), nombre, codigo (UNIQUE), creditos, semestre, id_docente (FK)
inscripciones: id_inscripcion (PK, autoincremental), id_estudiante (FK), id_curso (FK), fecha_inscripcion, calificacion_final

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
Inserta al menos 5 estudiantes, 3 docentes y 4 cursos.
Genera 8 inscripciones distribuidas entre cursos y estudiantes.

