module.exports = class MapMap extends Map {
	constructor(parentKey, key, value) {
		super();

		this.set(parentKey, key, value);
	}

	onRemoveKey(callback) {
		if (typeof callback === 'function') {
			this._onRemoveKey = callback;
		}
	}

	size(key) {
		if (key) {
			const currentMap = this.get(key);

			if (currentMap) {
				return currentMap.size;
			}
		}

		return super.size;
	}

	clear(key) {
		if (key) {
			const currentMap = this.get(key);

			if (currentMap) {
				super.delete(key);
			}
		} else {
			super.clear();
		}

		return this;
	}

	has(parentKey, key = null) {
		if (parentKey && key) {
			const currentMap = this.get(parentKey);

			if (currentMap) {
				return currentMap.has(key);
			}
		}

		return super.has(parentKey);
	}

	get(parentKey, key) {
		const currentMap = super.get(parentKey);

		if (currentMap && key) {
			return currentMap.get(key);
		}

		return currentMap;
	}

	set(parentKey, key, value) {
		if (!parentKey || !key || !value) {
			return this;
		}

		const currentMap = this.get(parentKey);

		if (currentMap) {
			currentMap.set(key, value);
		} else {
			super.set(parentKey, new Map([
				[key, value]
			]));
		}

		return this;
	}

	delete(parentKey, key) {
		if (!parentKey) {
			return this;
		}

		const currentMap = this.get(parentKey);

		if (currentMap && key) {
			currentMap.delete(key);

			if (!currentMap.size) {
				super.delete(parentKey);

				if (this._onRemoveKey) {
					this._onRemoveKey(parentKey);
				}
			}
		} else {
			super.delete(parentKey);
		}

		return this;
	}

	forEach(parentKey, callback) {
		if (typeof parentKey === 'function') {
			[callback, parentKey] = [parentKey, null];
		}

		if (parentKey) {
			const currentMap = this.get(parentKey);

			if (currentMap) {
				currentMap.forEach(callback.bind(callback));
			}
		} else {
			super.forEach(callback.bind(callback));
		}
	}
}
