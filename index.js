module.exports = class MapMap extends Map {
	constructor(firstKey, secondKey, value) {
		super();

		this.set(firstKey, secondKey, value);
	}

	onRemoveKey(callback) {
		if (typeof callback === 'function') {
			this._onRemoveKey = callback;
		}
	}

	size(secondKey) {
		if (secondKey) {
			const currentMap = this.get(secondKey);

			if (currentMap) {
				return currentMap.size;
			}
		}

		return super.size;
	}

	clear(secondKey) {
		if (secondKey) {
			const currentMap = this.get(secondKey);

			if (currentMap) {
				super.delete(secondKey);
			}
		} else {
			super.clear();
		}

		return this;
	}

	has(firstKey, secondKey = null) {
		if (firstKey && secondKey) {
			const currentMap = this.get(firstKey);

			if (currentMap) {
				return currentMap.has(secondKey);
			}
		}

		return super.has(firstKey);
	}

	get(firstKey, secondKey) {
		const currentMap = super.get(firstKey);

		if (currentMap && secondKey) {
			return currentMap.get(secondKey);
		}

		return currentMap;
	}

	set(firstKey, secondKey, value) {
		if (!firstKey || !secondKey || !value) {
			return this;
		}

		const currentMap = this.get(firstKey);

		if (currentMap) {
			currentMap.set(secondKey, value);
		} else {
			super.set(firstKey, new Map([
				[secondKey, value]
			]));
		}

		return this;
	}

	delete(firstKey, secondKey) {
		if (!firstKey) {
			return this;
		}

		const currentMap = this.get(firstKey);

		if (currentMap && secondKey) {
			currentMap.delete(secondKey);

			if (!currentMap.size) {
				super.delete(firstKey);

				if (this._onRemoveKey) {
					this._onRemoveKey(firstKey);
				}
			}
		} else {
			super.delete(firstKey);
		}

		return this;
	}

	forEach(firstKey, callback) {
		if (typeof firstKey === 'function') {
			[callback, firstKey] = [firstKey, null];
		}

		if (firstKey) {
			const currentMap = this.get(firstKey);

			if (currentMap) {
				currentMap.forEach(callback.bind(callback));
			}
		} else {
			super.forEach(callback.bind(callback));
		}
	}
}
