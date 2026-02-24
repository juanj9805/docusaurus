<div>
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>


### Level 1 Foundations Basic Exploration
```
Listar todos los usuarios.
SELECT *
FROM users

Mostrar solo first_name, last_name, email.
SELECT
	first_name,
	last_name,
	email
FROM users

Filtrar usuarios cuyo role sea 'admin'.
SELECT
	first_name,
	role
FROM users
WHERE role = 'admin'

Filtrar usuarios con document_type = 'CC'.
SELECT
	first_name,
	document_type
FROM users
WHERE document_type  = 'CC'

Mostrar usuarios mayores de 18 años (calcular edad desde birth_date).

Mostrar usuarios cuyo ingreso sea mayor a 5,000,000.
SELECT
	first_name,
	monthly_income
FROM users
WHERE monthly_income > 5000000

Mostrar usuarios cuyo nombre empiece por "A".
SELECT
	first_name
FROM users
WHERE first_name like 'a%'

Mostrar usuarios que no tengan company.
SELECT
	first_name
FROM users
WHERE company IS NULL
```

---

### level 2 conditions combination

```
Usuarios mayores de 25 años que sean 'employee'.

Usuarios con 'CC' que estén activos.
SELECT first_name
FROM users
WHERE document_type = 'CC' AND is_active = 1


Usuarios mayores de edad sin empleo.
SELECT first_name
FROM users
WHERE birth_date < '2000-12-01' AND monthly_income IS NULL


Usuarios con empleo y con ingresos mayores a 3,000,000.
SELECT first_name
FROM users
WHERE role = 'employee' AND monthly_income > 300000


Usuarios casados con al menos 1 hijo.
SELECT
	first_name,
	children_count
FROM users
WHERE children_count != 0

Usuarios entre 30 y 40 años.

Usuarios 'admin' verificados mayores de 25 años.
```

---

### Level 3 Introducig to analysis (Agregations)

```
Contar usuarios por role.
SELECT
	COUNT(role)
FROM users

Contar usuarios por document_type.
SELECT
	COUNT(document_type )
FROM users

Contar cuántos usuarios están desempleados.
SELECT
	COUNT(role)
FROM users
WHERE monthly_income IS NULL AND company IS NULL

Calcular el promedio general de ingresos.
SELECT
	AVG(monthly_income )
FROM users


Calcular el promedio de ingresos por role.
```

---

### Level 4 Analytical thinking

```
Mostrar profesiones con más de 10 personas.
Mostrar la ciudad con más usuarios.
Comparar cantidad de menores vs mayores de edad.
Promedio de ingresos por ciudad ordenado de mayor a menor.
Mostrar las 5 personas con mayor ingreso.
Aquí ya estás usando GROUP BY, ORDER BY, LIMIT y HAVING.


Mostrar profesiones con más de 10 personas.
SELECT
    profession,
    COUNT(*) AS total
FROM users
GROUP BY profession
HAVING COUNT(*) > 10;


Mostrar la ciudad con más usuarios.
SELECT
    city,
    COUNT(*) AS total_users
FROM users
GROUP BY city
ORDER BY total_users DESC
LIMIT 1;

Promedio de ingresos por ciudad ordenado de mayor a menor.
SELECT
    city,
    AVG(monthly_income) AS promedio_ingresos
FROM users
GROUP BY city
ORDER BY promedio_ingresos DESC;


Mostrar las 5 personas con mayor ingreso.
SELECT
    first_name,
    monthly_income
FROM users
ORDER BY monthly_income DESC
LIMIT 5;

Profesión con mayor ingreso promedio.
SELECT
    profession,
    AVG(monthly_income) AS ingreso_promedio
FROM users
GROUP BY profession
ORDER BY ingreso_promedio DESC
LIMIT 1;


Mostrar usuarios cuyo ingreso esté por encima del promedio general.
SELECT
    u.*
FROM users u
WHERE u.monthly_income > (
    SELECT AVG(monthly_income)
    FROM users
);
```
