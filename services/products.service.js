const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");


module.exports = {
	name: 'products',

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
		},
	},
	actions: {
		async list(ctx) {
			if(!Object.keys(ctx.params).includes('available') || ctx.params.available) {
				return (await this.availableProducts())[0];
			}
			return (await this.unavailableProducts())[0];
		}
	},
	methods: {
		availableProducts() {
			return this.adapter.db.query("SELECT * FROM products WHERE availability = true");
		},
		unavailableProducts() {
			return this.adapter.db.query("SELECT * FROM products WHERE availability = false");
		},
	}
}

