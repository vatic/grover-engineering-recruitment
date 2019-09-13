const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");


module.exports = {
	name: 'products',

	mixins: [DbService],
	adapter: new SqlAdapter("postgres://vatagin:vat123@localhost:5432/grover_dev"),
	model: {
		name: "products",
		define: {
			name: Sequelize.STRING,
			brand: Sequelize.STRING,
			category: Sequelize.STRING,
			availability: Sequelize.BOOLEAN,
			quantity: Sequelize.INTEGER,
		},
		options: {
			// Options from http://docs.sequelizejs.com/manual/tutorial/models-definition.html
		}
	},
	actions: {
		async list() {
			const result = await this.adapter.db.query("SELECT * FROM products");
			return result[0];
		}
	},
}

