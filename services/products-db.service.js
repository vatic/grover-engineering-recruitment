const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

module.exports = {
	name: 'products-db',

	mixins: [DbService],
	adapter: new SqlAdapter('postgres://vatagin:vat123@localhost:5432/grover_dev'),
	model: {
		name: "categories",
		timestamps: false,
		define: {
			id: { type: Sequelize.INTEGER, primaryKey: true },
			title: { type: Sequelize.STRING },
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		}
	},

	actions: {
		availableProducts() {
			return this.adapter.db.query("SELECT * FROM inventory WHERE availability = true");
		},
		unavailableProducts() {
			return this.adapter.db.query("SELECT * FROM inventory WHERE availability = false");
		}
	},

	async afterConnected() {
		this.logger.info("Connected successfully");

		const q1 = 'CREATE TABLE IF NOT EXISTS "brands" ("id" INTEGER PRIMARY KEY, "title" VARCHAR(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL)';
		await this.adapter.db.query(q1);

		const q2 = 'CREATE TABLE IF NOT EXISTS "stores" ("id" INTEGER PRIMARY KEY, "title" VARCHAR(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL)';
		await this.adapter.db.query(q2);

		const q3 = 'CREATE TABLE IF NOT EXISTS "products" ("id" INTEGER PRIMARY KEY, "name" VARCHAR(255) NOT NULL, "availability" BOOLEAN NOT NULL, "quantity" INTEGER NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "category_id" INTEGER REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "brand_id" INTEGER REFERENCES "brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE)';
		await this.adapter.db.query(q3);

		const q4 = 'CREATE TABLE IF NOT EXISTS "inventory_items" ("id" SERIAL, "product_id" INTEGER REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "store_id" INTEGER REFERENCES "stores" ("id") ON DELETE CASCADE ON UPDATE CASCADE)';
		await this.adapter.db.query(q4);

		const q5 = 'CREATE MATERIALIZED VIEW IF NOT EXISTS inventory AS SELECT s.title as store, p.name, c.title as category, b.title as brand, p.availability, p.quantity FROM products p INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN inventory_items i ON p.id = i.product_id INNER JOIN stores s ON s.id = i.store_id';
		await this.adapter.db.query(q5);

		const q6 = `insert into categories(id, title, "createdAt", "updatedAt") values (1, 'Phones and Tables', current_timestamp, current_timestamp), (2, 'Computers', current_timestamp, current_timestamp), (3, 'Cameras', current_timestamp, current_timestamp)`;
		await this.adapter.db.query(q6);

		const q7 = 'insert into brands(id, title, "created_at", "updated_at") values (1, "Apple", current_timestamp, current_timestamp), (2, "Samsung", current_timestamp, current_timestamp), (3, "HP", current_timestamp, current_timestamp), (4, "Acer", current_timestamp, current_timestamp), (5, "Canon", current_timestamp, current_timestamp), (6, "Sony", current_timestamp, current_timestamp)';
		await this.adapter.db.query(q7);

		const q8 = 'insert into stores(id, title, "created_at", "updated_at") values (1, "grover-de", current_timestamp, current_timestamp), (2, "mm-berlin", current_timestamp, current_timestamp)';
		await this.adapter.db.query(q8);

		const q9 = 'insert into products (id, name, brand_id, category_id, availability, quantity, "created_at", "updated_at") values (1, "Galaxy S10e", 2, 1, true, 10, current_timestamp, current_timestamp), (2, "iPhone Xs Max", 1, 1, true, 10, current_timestamp, current_timestamp), (3, "Envy 13", 3, 2, true, 10, current_timestamp, current_timestamp), (4, "Swift 7", 4, 2, true, 10, current_timestamp, current_timestamp), (5, "EOS 2000D KIT", 5, 3, true, 10, current_timestamp, current_timestamp), (6, "Alpha 6000", 6, 3, true, 10, current_timestamp, current_timestamp)';
		await this.adapter.db.query(q9);
	},


}

