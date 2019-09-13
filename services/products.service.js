module.exports = {
	name: 'products',

	actions: {
		async list(ctx) {
			console.dir(ctx.params);
			if(Object.keys(ctx.params).includes('unavailable') || Boolean(ctx.params.unavailable)) {
				return (await ctx.call('products-db.unavailableProducts'))[0];
			}
			return (await ctx.call('products-db.availableProducts'))[0];
		}
	}
}

