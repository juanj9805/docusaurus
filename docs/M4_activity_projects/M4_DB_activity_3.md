<div>
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>

### VIEWS

```
CREATE VIEW view_adult_users AS
SELECT
    id,
    first_name,
    last_name,
    document_type,
    document_number,
    city,
    country,
    YEAR(CURDATE()) - YEAR(birth_date) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(birth_date, '%m%d')) AS age
FROM users
WHERE YEAR(CURDATE()) - YEAR(birth_date) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(birth_date, '%m%d')) >= 18;

SELECT * FROM view_adult_users;

CREATE VIEW view_user_contacts AS
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    email,
    COALESCE(mobile, phone, 'Sin teléfono') AS contact_number,
    address,
    city,
    state,
    country
FROM users;

SELECT * FROM view_user_contacts;

CREATE VIEW view_users_with_income AS
SELECT
    id,
    first_name,
    last_name,
    profession,
    monthly_income
FROM users
WHERE monthly_income IS NOT NULL AND monthly_income > 0;

SELECT * FROM view_users_with_income
ORDER BY monthly_income DESC;

CREATE VIEW view_demographic_summary AS
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    YEAR(CURDATE()) - YEAR(birth_date) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(birth_date, '%m%d')) AS age,
    gender,
    marital_status,
    education_level,
    city,
    country
FROM users;

SELECT
    city,
    COUNT(*) AS cantidad_usuarios
FROM view_demographic_summary
GROUP BY city;

CREATE VIEW view_user_profile AS
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    document_type,
    document_number,
    YEAR(CURDATE()) - YEAR(birth_date) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(birth_date, '%m%d')) AS age,
    profession,
    education_level,
    company,
    monthly_income,
    city,
    country
FROM users;

SELECT * FROM view_user_profile
WHERE monthly_income > 3000000
ORDER BY city;
```
