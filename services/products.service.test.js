const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const rewire = require('rewire');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

var productsService = rewire('./products.service');

var sandbox = sinon.sandbox.create();

describe('Test Products service', () => {
	context('Action list', () => {
		let callStub;
		let filterStub;
		let sampleProducts;

		let broker = new ServiceBroker({ logger: false });
		broker.createService(productsService);

		beforeEach(()=>{
			sampleProducts = [
				{
					'store': 'grover-de',
					'category': 'Phones and Tables',
					'brand': 'Samsung',
					'name': 'Galaxy S10e',
					'availability': true,
					'quantity': 31
				},
				{
					'store': 'grover-de',
					'category': 'Phones and Tables',
					'brand': 'Apple',
					'name': 'iPhone Xs Max',
					'availability': true,
					'quantity': 7
				},
				{
					'store': 'grover-de',
					'category': 'Computers',
					'brand': 'HP',
					'name': 'Envy 13',
					'availability': true,
					'quantity': 10
				},
				{
					'store': 'grover-de',
					'category': 'Cameras',
					'brand': 'Canon',
					'name': 'EOS 2000D KIT',
					'availability': true,
					'quantity': 1
				}
			];
			callStub = sinon.stub(broker, 'call').resolves(sampleProducts);
			filterStub = sinon.stub().resolves({ availability: true, store: 'grover-de' })
		});

		afterEach(()=>{
			sandbox.restore();
			productsService = rewire('./products.service');
		});

		it('should call products.list', async () => {
			let result = await broker.call('products.list', filterStub());
			expect(result).to.equal(sampleProducts);

		});

	})


	context('Filter private method', () => {

		filterPrivateMethod = productsService.methods.filter;
		const defaultResult = { availability: true, store: 'grover-de' };

		it('should return default object if arg does not contain needed keys', function() {
			expect(filterPrivateMethod('fake string')).to.deep.equal(defaultResult);
			expect(filterPrivateMethod([1,2,3])).to.deep.equal(defaultResult);
			expect(filterPrivateMethod({})).to.deep.equal(defaultResult);
			expect(filterPrivateMethod({a: 1, b: 2})).to.deep.equal(defaultResult);
		});

		it('should correctly change value by key', function() {
			const params = { unavailable: false };
			const params2 = { store: 'mm-berlin' };
			expect(filterPrivateMethod(params)).to.deep.equal({ availability: false, store: 'grover-de' });
			expect(filterPrivateMethod(params2)).to.deep.equal({ availability: true, store: 'mm-berlin' });
		});
	});
});

