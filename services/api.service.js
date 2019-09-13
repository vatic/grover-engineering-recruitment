'use strict';

const ApiGateway = require('moleculer-web');

module.exports = {
	name: 'api',
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		routes: [{
			path: '/api',
			whitelist: [
				'**'
			],
			aliases: {
				'GET products': 'products.list',
			}
		}],

		assets: {
			folder: 'public'
		}
	}
};
