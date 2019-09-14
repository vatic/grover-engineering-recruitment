BEGIN;

    INSERT INTO categories(id, title) VALUES
    (1, 'Phones and Tables'), (2, 'Computers'), (3, 'Cameras');

    INSERT INTO brands(id, title) VALUES
    (1, 'Apple'), (2, 'Samsung'), (3, 'HP'),
    (4, 'Acer'), (5, 'Canon'), (6, 'Sony');

    INSERT INTO stores(id, title) VALUES
    (1, 'grover-de'), (2, 'mm-berlin');

    INSERT INTO products (id, name, category_id, brand_id) VALUES
    (1, 'Galaxy S10e', 1, 2),
    (2, 'iPhone Xs Max', 1, 1),
    (3, 'Envy 13', 2, 3),
    (4, 'Swift 7', 2, 4),
    (5, 'EOS 2000D KIT', 3, 5),
    (6, 'Alpha 6000', 3, 6);

    INSERT INTO inventory_items (availability, quantity, product_id, store_id, created_at, updated_at) VALUES
    (true, 31, 1, 1, current_timestamp, current_timestamp),
    (false, 0, 1, 2, current_timestamp, current_timestamp),
    (false, 0, 2, 2, current_timestamp, current_timestamp),
    (true, 0, 2, 1, current_timestamp, current_timestamp),
    (true, 10, 3, 1, current_timestamp, current_timestamp),
    (true, 10, 3, 2, current_timestamp, current_timestamp),
    (false, 29, 4, 1, current_timestamp, current_timestamp),
    (true, 1, 5, 1, current_timestamp, current_timestamp),
    (true, 7, 6, 2, current_timestamp, current_timestamp);

    REFRESH MATERIALIZED VIEW inventory;

COMMIT;
