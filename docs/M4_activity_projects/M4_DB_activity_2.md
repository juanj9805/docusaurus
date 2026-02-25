<div>
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>


### Level 1 Basics queries and direct relationship
```
SELECT u.name, u.email, o.order_number
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.id = ?;

SELECT o.order_number, o.order_date
FROM orders o
INNER JOIN users u ON u.id = o.user_id
WHERE u.email = ?;

SELECT p.name AS product_name,
       c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

SELECT u.id, u.name, u.email
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

SELECT u.name,
       SUM(op.quantity * op.price_at_purchase) AS total_spent
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN order_product op ON op.order_id = o.id
WHERE u.id = ?
GROUP BY u.name;

SELECT status, COUNT(*) AS total_orders
FROM orders
GROUP BY status;

SELECT p.id, p.name, p.sale_price
FROM products p
INNER JOIN categories c ON c.id = p.category_id
WHERE c.name = 'Electrónica'
ORDER BY p.sale_price DESC;

SELECT op.product_id, op.quantity
FROM order_product op
INNER JOIN orders o ON o.id = op.order_id
WHERE o.order_number = ?;

SELECT DISTINCT u.name
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE u.city = ?;

SELECT u.name,
       AVG(order_total) AS average_order_value
FROM (
    SELECT o.id,
           o.user_id,
           SUM(op.quantity * op.price_at_purchase) AS order_total
    FROM orders o
    INNER JOIN order_product op ON op.order_id = o.id
    GROUP BY o.id
) AS sub
INNER JOIN users u ON u.id = sub.user_id
GROUP BY u.name;

```

### Level 2 Intermediate queries
```
SELECT o.order_number,
       o.order_date,
       p.name,
       op.price_at_purchase
FROM orders o
INNER JOIN order_product op ON op.order_id = o.id
INNER JOIN products p ON p.id = op.product_id
WHERE o.order_number = ?;

SELECT DISTINCT p.name
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN order_product op ON op.order_id = o.id
INNER JOIN products p ON p.id = op.product_id
WHERE u.name = ?;

SELECT p.name,
       MAX(o.order_date) AS ultima_venta
FROM products p
INNER JOIN order_product op ON op.product_id = p.id
INNER JOIN orders o ON o.id = op.order_id
GROUP BY p.name;

SELECT DISTINCT u.name
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN order_product op ON op.order_id = o.id
INNER JOIN products p ON p.id = op.product_id
WHERE p.name LIKE '%Gamer%';

SELECT c.name
FROM categories c
INNER JOIN products p ON p.category_id = c.id
INNER JOIN order_product op ON op.product_id = p.id
WHERE op.id IS NULL
GROUP BY c.name;

SELECT DISTINCT p.name
FROM orders o
INNER JOIN order_product op ON op.order_id = o.id
INNER JOIN products p ON p.id = op.product_id
WHERE o.status = 'cancelled';
```

### Level 3 Intermediate queries
```
SELECT u.name,
       SUM(op.quantity * op.price_at_purchase) AS total_gastado
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN order_product op ON op.order_id = o.id
GROUP BY u.id
ORDER BY total_gastado DESC
LIMIT 1;

SELECT p.name
FROM products p
LEFT JOIN order_product op ON op.product_id = p.id
WHERE op.product_id IS NULL;

SELECT DISTINCT p.name
FROM products p
INNER JOIN order_product op ON op.product_id = p.id
WHERE op.price_at_purchase < p.sale_price;

SELECT u.name,
       o.order_date,
       op.price_at_purchase,
       op.quantity
FROM order_product op
INNER JOIN orders o ON o.id = op.order_id
INNER JOIN users u ON u.id = o.user_id
WHERE op.product_id = ?
ORDER BY o.order_date DESC;

SELECT u.name,
       SUM(op.quantity * op.price_at_purchase) AS total_gastado,
       CASE
           WHEN SUM(op.quantity * op.price_at_purchase) > 5000 THEN 'VIP'
           WHEN SUM(op.quantity * op.price_at_purchase) BETWEEN 1000 AND 5000 THEN 'Frecuente'
           ELSE 'Regular'
       END AS categoria_cliente
FROM users u
INNER JOIN orders o ON o.user_id = u.id
INNER JOIN order_product op ON op.order_id = o.id
GROUP BY u.id
ORDER BY total_gastado DESC;
```
### Level 4 Bussines logic and advanced analytcal

SELECT DISTINCT o.order_number, p.name, p.stock
FROM orders o
INNER JOIN order_product op ON op.order_id = o.id
INNER JOIN products p ON p.id = op.product_id
WHERE o.status = 'pending'
AND p.stock < 5;

```
