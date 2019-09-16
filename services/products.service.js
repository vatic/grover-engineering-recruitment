module.exports = {
	name: 'products',

	actions: {
		async list(ctx) {
			console.dir(ctx.params);
			return (await ctx.call('products-db.filteredProducts', this.filter(ctx.params)))[0];
		}
	},

	methods: {
		filter(params) {
			let availability = true;
			let store = 'grover-de';
			if(Object.keys(params).includes('unavailable')) {
				availability = false;
			}
			if(Object.keys(params).includes('store')) {
				store =  params.store;
			}
			return { availability, store };
		}
	}
}

