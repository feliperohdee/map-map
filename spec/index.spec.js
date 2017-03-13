const chai = require('chai');
const MapMap = require('../');

const expect = chai.expect;

describe('index.js', () => {
	let mapMap;

	beforeEach(() => {
		mapMap = new MapMap();
	});

	describe('constructor', () => {
		it('should set if key and values provided', () => {
			mapMap = new MapMap('parentKey', 'key', 'value');

			expect(mapMap.get('parentKey')).to.be.a('Map');
			expect(mapMap.get('parentKey', 'key')).to.equal('value');
		});
	});

	describe('onRemoveKey', () => {
		it('should feed onRemoveKey', () => {
			const callback = () => null;

			mapMap.onRemoveKey(callback);

			expect(mapMap._onRemoveKey).to.equal(callback);
		});

		it('should not set onRemoveKey if not function', () => {
			mapMap.onRemoveKey(null);

			expect(mapMap._onRemoveKey).to.be.undefined;
		});
	});

	describe('size', () => {
		beforeEach(() => {
			mapMap.set('parentKey', 'key', 'value');
			mapMap.set('parentKey', 'key-1', 'value-1');
		});

		it('should get set size', () => {
			expect(mapMap.size('parentKey')).to.equal(2);
		});

		it('should get map size', () => {
			expect(mapMap.size()).to.equal(1);
		});
	});

	describe('clear', () => {
		beforeEach(() => {
			mapMap.set('parentKey', 'key', 'value');
			mapMap.set('parentKey', 'key-1', 'value-1');
			mapMap.set('parentKey-1', 'key', 'value');
			mapMap.set('parentKey-1', 'key-1', 'value-1');
		});

		it('should return self', () => {
			expect(mapMap.clear('parentKey')).to.equal(mapMap);
		});

		it('should remove key', () => {
			mapMap.clear('parentKey');

			expect(mapMap.size()).to.equal(1);
			expect(mapMap.get('parentKey')).to.be.undefined;
			expect(mapMap.get('parentKey-1')).to.be.a('Map');
		});

		it('should do nothing if key not found', () => {
			mapMap.clear('_parentKey');

			expect(mapMap.size()).to.equal(2);
			expect(mapMap.get('parentKey')).to.be.a('Map');
			expect(mapMap.get('parentKey-1')).to.be.a('Map');
		});

		it('should clear map', () => {
			mapMap.clear();

			expect(mapMap.size()).to.equal(0);
			expect(mapMap.get('parentKey')).to.be.undefined;
			expect(mapMap.get('parentKey-1')).to.be.undefined;
		});
	});

	describe('has', () => {
		beforeEach(() => {
			mapMap.set('parentKey', 'key', 'value');
		});

		it('should test map', () => {
			expect(mapMap.has('parentKey', 'key')).to.be.true;
			expect(mapMap.has('_parentKey', 'key')).to.be.false;
			expect(mapMap.has('parentKey', '_key')).to.be.false;
		});

		it('should test parentMap', () => {
			expect(mapMap.has('parentKey')).to.be.true;
			expect(mapMap.has('_parentKey')).to.be.false;
		});
	});

	describe('set', () => {
		it('should return self', () => {
			expect(mapMap.set('parentKey', 'key', 'value')).to.equal(mapMap);
		});

		it('should return self if no value', () => {
			expect(mapMap.set('parentKey', 'key')).to.equal(mapMap);
		});

		it('should return self if no key', () => {
			expect(mapMap.set('parentKey')).to.equal(mapMap);
		});

		it('should return self if no parentKey', () => {
			expect(mapMap.set()).to.equal(mapMap);
		});

		it('should create a map if not exists', () => {
			mapMap.set('parentKey', 'key', 'value');

			expect(mapMap.get('parentKey')).to.be.a('Map');
			expect(mapMap.get('parentKey').has('key')).to.be.true;
		});
	});

	describe('delete', () => {
		beforeEach(() => {
			mapMap.set('parentKey', 'key', 'value');
			mapMap.set('parentKey', 'key-1', 'value-1');
		});

		it('should return self', () => {
			expect(mapMap.delete('key')).to.equal(mapMap);
		});

		it('should return self and remove any element if no parentKey', () => {
			expect(mapMap.delete()).to.equal(mapMap);

			expect(mapMap.get('parentKey').has('key')).to.be.true;
			expect(mapMap.get('parentKey').has('key-1')).to.be.true;
		});

		it('should remove one element', () => {
			mapMap.delete('parentKey', 'key');

			expect(mapMap.get('parentKey').has('key')).to.be.false;
			expect(mapMap.get('parentKey').has('key-1')).to.be.true;
		});

		it('should remove all elements and parentKey', () => {
			mapMap.delete('parentKey', 'key');
			mapMap.delete('parentKey', 'key-1');

			expect(mapMap.get('parentKey')).to.be.undefined;
		});

		it('should remove parentKey', () => {
			mapMap.delete('parentKey');

			expect(mapMap.get('parentKey')).to.be.undefined;
		});

		it('should call onRemoveKey', () => {
			const result = [];

			mapMap.onRemoveKey(key => result.push(key));
			mapMap.delete('parentKey', 'key');
			mapMap.delete('parentKey', 'key-1');

			expect(result).to.deep.equal(['parentKey']);
		});
	});

	describe('forEach', () => {
		beforeEach(() => {
			mapMap.set('parentKey', 'key', 'value');
			mapMap.set('parentKey', 'key-1', 'value-1');
		});

		it('should iterate map', () => {
			const result = [];

			mapMap.forEach('parentKey', v => result.push(v));

			expect(result).to.deep.equal([
				'value',
				'value-1'
			]);
		});

		it('should do nothing if no key found', () => {
			const result = [];

			mapMap.forEach('unknownKey', v => result.push(v));

			expect(result).to.deep.equal([]);
		});

		it('should iterate parent map', () => {
			const result = [];

			mapMap.forEach(v => result.push(v));

			expect(result.length).to.equal(1);
			expect(result[0]).to.be.a('Map');
		});
	});
});
