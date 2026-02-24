<div align="center">
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>

```
-- 1
SELECT u.name, u.email, o.order_number
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.id = ?;

-- 2
SELECT o.order_number, o.order_date
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE u.email = ?;

-- 3
SELECT p.name AS product_name,
       c.name AS category_name
FROM products p
JOIN categories c ON p.category_id = c.id;

-- 4
SELECT u.id, u.name, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- 5
SELECT u.name,
       SUM(op.quantity * op.price_at_purchase) AS total_spent
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_product op ON op.order_id = o.id
WHERE u.id = ?
GROUP BY u.name;

-- 6
SELECT status, COUNT(*) AS total_orders
FROM orders
GROUP BY status;

-- 7
SELECT p.id, p.name, p.sale_price
FROM products p
JOIN categories c ON c.id = p.category_id
WHERE c.name = 'Electrónica'
ORDER BY p.sale_price DESC;

-- 8
SELECT op.product_id, op.quantity
FROM order_product op
JOIN orders o ON o.id = op.order_id
WHERE o.order_number = ?;

-- 9
SELECT DISTINCT u.name
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.city = ?;

-- 10
SELECT u.name,
       AVG(order_total) AS average_order_value
FROM (
    SELECT o.id,
           o.user_id,
           SUM(op.quantity * op.price_at_purchase) AS order_total
    FROM orders o
    JOIN order_product op ON op.order_id = o.id
    GROUP BY o.id
) AS sub
JOIN users u ON u.id = sub.user_id
GROUP BY u.name;

-- 11
SELECT o.order_number,
       o.order_date,
       p.name,
       op.price_at_purchase
FROM orders o
JOIN order_product op ON op.order_id = o.id
JOIN products p ON p.id = op.product_id
WHERE o.order_number = ?;

-- 12
SELECT c.name,
       SUM(op.quantity * op.price_at_purchase) AS ingresos_totales
FROM categories c
JOIN products p ON p.category_id = c.id
JOIN order_product op ON op.product_id = p.id
GROUP BY c.name
ORDER BY ingresos_totales DESC;

-- 13
SELECT DISTINCT p.name
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_product op ON op.order_id = o.id
JOIN products p ON p.id = op.product_id
WHERE u.name = ?;

-- 14
SELECT p.name,
       SUM(op.quantity) AS total_vendidos
FROM order_product op
JOIN products p ON p.id = op.product_id
GROUP BY p.name
ORDER BY total_vendidos DESC
LIMIT 5;

-- 15
SELECT p.name,
       MAX(o.order_date) AS ultima_venta
FROM products p
JOIN order_product op ON op.product_id = p.id
JOIN orders o ON o.id = op.order_id
GROUP BY p.name;

-- 16
SELECT DISTINCT u.name
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_product op ON op.order_id = o.id
JOIN products p ON p.id = op.product_id
WHERE p.name LIKE '%Gamer%';

-- 17
SELECT DATE(o.order_date) AS fecha,
       SUM(op.quantity * op.price_at_purchase) AS ingresos
FROM orders o
JOIN order_product op ON op.order_id = o.id
GROUP BY DATE(o.order_date)
ORDER BY fecha;

-- 18
SELECT c.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
LEFT JOIN order_product op ON op.product_id = p.id
WHERE op.id IS NULL
GROUP BY c.name;

-- 19
SELECT u.name,
       AVG(order_total) AS ticket_promedio
FROM (
    SELECT o.id,
           o.user_id,
           SUM(op.quantity * op.price_at_purchase) AS order_total
    FROM orders o
    JOIN order_product op ON op.order_id = o.id
    GROUP BY o.id
) AS sub
JOIN users u ON u.id = sub.user_id
GROUP BY u.name;

-- 20
SELECT DISTINCT p.name
FROM orders o
JOIN order_product op ON op.order_id = o.id
JOIN products p ON p.id = op.product_id
WHERE o.status = 'cancelled';

-- 22
SELECT SUM(op.quantity * op.price_at_purchase) AS total_ropa
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN order_product op ON op.order_id = o.id
JOIN products p ON p.id = op.product_id
JOIN categories c ON c.id = p.category_id
WHERE c.name = 'Ropa'
AND u.city = ?;

-- 23
SELECT u.name,
       SUM(op.quantity * op.price_at_purchase) AS total_gastado
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_product op ON op.order_id = o.id
GROUP BY u.id
ORDER BY total_gastado DESC
LIMIT 1;

-- 24
SELECT p.name
FROM products p
LEFT JOIN order_product op ON op.product_id = p.id
WHERE op.product_id IS NULL;

-- 25
SELECT SUM((op.price_at_purchase - p.purchase_price) * op.quantity) AS ganancia_total
FROM order_product op
JOIN products p ON p.id = op.product_id;

-- 27
SELECT u.city,
       SUM(op.quantity * op.price_at_purchase) AS ingresos
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_product op ON op.order_id = o.id
GROUP BY u.city
ORDER BY ingresos DESC
LIMIT 3;

-- 28
SELECT o.order_number,
       COUNT(DISTINCT op.product_id) AS productos_distintos
FROM orders o
JOIN order_product op ON op.order_id = o.id
GROUP BY o.id
ORDER BY productos_distintos DESC
LIMIT 1;

-- 29
SELECT DISTINCT p.name
FROM products p
JOIN order_product op ON op.product_id = p.id
WHERE op.price_at_purchase < p.sale_price;

-- 30
SELECT u.name,
       o.order_date,
       op.price_at_purchase,
       op.quantity
FROM order_product op
JOIN orders o ON o.id = op.order_id
JOIN users u ON u.id = o.user_id
WHERE op.product_id = ?
ORDER BY o.order_date DESC;

-- 33
SELECT u.name, MAX(o.order_date) AS ultima_compra
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.id
HAVING MAX(o.order_date) < DATE_SUB(CURDATE(), INTERVAL 6 MONTH);

-- 34
SELECT u.name,
       SUM(op.quantity * op.price_at_purchase) AS total_gastado,
       CASE
           WHEN SUM(op.quantity * op.price_at_purchase) > 5000 THEN 'VIP'
           WHEN SUM(op.quantity * op.price_at_purchase) BETWEEN 1000 AND 5000 THEN 'Frecuente'
           ELSE 'Regular'
       END AS categoria_cliente
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_product op ON op.order_id = o.id
GROUP BY u.id
ORDER BY total_gastado DESC;

-- 36
SELECT DISTINCT o.order_number, p.name, p.stock
FROM orders o
JOIN order_product op ON op.order_id = o.id
JOIN products p ON p.id = op.product_id
WHERE o.status = 'pending'
AND p.stock < 5;

-- 37
SELECT c.name,
       ROUND(
           (SUM(op.quantity * op.price_at_purchase) /
           (SELECT SUM(quantity * price_at_purchase) FROM order_product)) * 100, 2
       ) AS porcentaje
FROM categories c
JOIN products p ON p.category_id = c.id
JOIN order_product op ON op.product_id = p.id
GROUP BY c.id
ORDER BY porcentaje DESC;
```
