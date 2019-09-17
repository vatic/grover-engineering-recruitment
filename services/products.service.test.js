const chai = require('chai');
const expect = chai.expect;
const rewire = require('rewire');

var productsService = rewire('./products.service');

describe('Test Products service', () => {
	context("Filter private method", () => {
		it('should return default object if arg does not contain needed keys', function() {
			const fakeString = 'fake_str';
			const defaultResult = { availability: true, store: 'grover-de' };
			const filterPrivateMethod = productsService.methods.filter;
			expect(filterPrivateMethod('fake string')).to.deep.equal(defaultResult);
		});
		
	});
});

