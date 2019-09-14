BEGIN;
    DROP TABLE IF EXISTS "categories" CASCADE;
    DROP TABLE IF EXISTS "brands" CASCADE;
    DROP TABLE IF EXISTS "stores" CASCADE;
    DROP TABLE IF EXISTS "products" CASCADE;
    DROP TABLE IF EXISTS "inventory_items" CASCADE;
    DROP MATERIALIZED VIEW IF EXISTS "inventory";

    CREATE TABLE IF NOT EXISTS "categories" (
        "id" INTEGER PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "brands" (
        "id" INTEGER PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "stores" (
        "id" INTEGER PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "products" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "category_id" INTEGER REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        "brand_id" INTEGER REFERENCES "brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "inventory_items" (
        "id" SERIAL,
        "availability" BOOLEAN NOT NULL,
        "quantity" INTEGER NOT NULL,
        "product_id" INTEGER REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        "store_id" INTEGER REFERENCES "stores" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL
    );

    CREATE MATERIALIZED VIEW IF NOT EXISTS "inventory"
    AS
    SELECT
        s.title as store,
        p.name,
        c.title as category,
        b.title as brand,
        i.availability,
        i.quantity,
        i.created_at,
        i.updated_at
    FROM products p INNER JOIN categories c ON c.id = p.category_id
    INNER JOIN brands b ON b.id = p.brand_id
    INNER JOIN inventory_items i ON p.id = i.product_id
    INNER JOIN stores s ON s.id = i.store_id;

COMMIT;
