const fs = require('fs');
const path = require('path');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

module.exports = {
	name: 'products-db',

	mixins: [DbService],
	adapter: new SqlAdapter('postgres://vatagin:vat123@localhost:5432/grover_dev'),
	model: {
		name: 'flags',
		timestamps: false,
		define: {
			id: { type: Sequelize.INTEGER, primaryKey: true },
			schema_loaded: { type: Sequelize.BOOLEAN},
			seeds_loaded: { type: Sequelize.BOOLEAN}
		}
	},

	actions: {
		availableProducts() {
			return this.adapter.db.query('SELECT store, category, brand, name, availability, quantity, created_at, updated_at FROM inventory WHERE availability = true');
		},
		unavailableProducts() {
			return this.adapter.db.query('SELECT store, category, brand, name, availability, quantity, created_at, updated_at FROM inventory WHERE availability = false');
		}
	},

	async afterConnected() {
		this.logger.info('Connected successfully');

		const dbSchema = fs.readFileSync(path.join(__dirname, 'db', 'sql', 'schema.sql'), 'utf8');
		const dbSeeds = fs.readFileSync(path.join(__dirname, 'db', 'sql', 'seeds.sql'), 'utf8');

		await this.adapter.db.query(dbSchema);
		await this.adapter.db.query(dbSeeds);
	},
};

