const fs = require('fs');
const path = require('path');
const DbService = require('moleculer-db');
const SqlAdapter = require('moleculer-db-adapter-sequelize');
const Sequelize = require('sequelize');

const dbHost = process.env.NODE_ENV === 'production'? 'db':'localhost';

module.exports = {
	name: 'products-db',

	mixins: [DbService],
	adapter: new SqlAdapter(`postgres://postgres:postgres@${dbHost}:5432/grover_dev`),
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
		filteredProducts(ctx) {
			const { availability, store } = ctx.params;
			return this.adapter.db.query(
				'SELECT store, category, brand, name, availability, quantity FROM inventory WHERE availability = :availability AND store = :store',
				{ replacements: { availability, store } }
			);
		}
	},

	async afterConnected() {
		this.logger.info('Database connected successfully...');

		const dbSchema = fs.readFileSync(path.join(__dirname, 'db', 'sql', 'schema.sql'), 'utf8');
		const dbSeeds = fs.readFileSync(path.join(__dirname, 'db', 'sql', 'seeds.sql'), 'utf8');

		await this.adapter.db.query(dbSchema);
		await this.adapter.db.query(dbSeeds);
	},
};

