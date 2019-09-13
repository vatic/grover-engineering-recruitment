const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");


module.exports = {
	name: 'products-db',

	mixins: [DbService],
	adapter: new SqlAdapter('postgres://vatagin:vat123@localhost:5432/grover_dev'),
	model: {
		name: "products",
		define: {
			name: Sequelize.STRING,
			brand: Sequelize.STRING,
			category: Sequelize.STRING,
			availability: Sequelize.BOOLEAN,
			quantity: Sequelize.INTEGER,
		}
	},
	actions: {
		availableProducts() {
			return this.adapter.db.query("SELECT * FROM products WHERE availability = true");
		},
		unavailableProducts() {
			return this.adapter.db.query("SELECT * FROM products WHERE availability = false");
		}
	}
}

