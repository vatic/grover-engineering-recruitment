module.exports = {
	name: 'products',

	actions: {
		async list(ctx) {
			if(!Object.keys(ctx.params).includes('available') || ctx.params.available) {
				return (await ctx.call('products-db.availableProducts'))[0];
			}
			return (await ctx.call('products-db.unavailableProducts'))[0];
		}
	}
}

