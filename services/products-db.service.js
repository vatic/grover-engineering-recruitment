const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

module.exports = {
	name: 'products-db',

	mixins: [DbService],
	adapter: new SqlAdapter('postgres://vatagin:vat123@localhost:5432/grover_dev'),
	model: {
		name: "categories",
		define: {
			title: Sequelize.STRING
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

		const q1 = 'CREATE TABLE IF NOT EXISTS "products" ("id" SERIAL , "name" VARCHAR(255) NOT NULL, "brand" VARCHAR(255) NOT NULL, "availability" BOOLEAN NOT NULL, "quantity" INTEGER NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "category_id" INTEGER REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"))';
		await this.adapter.db.query(q1);

		const q2 = 'CREATE MATERIALIZED VIEW IF NOT EXISTS inventory AS SELECT p.name, c.title, p.brand, p.availability, p.quantity FROM products p INNER JOIN categories c ON c.id = p.category_id';
		await this.adapter.db.query(q2);
	},
}

