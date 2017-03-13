[![CircleCI](https://circleci.com/gh/feliperohdee/map-map.svg?style=svg)](https://circleci.com/gh/feliperohdee/map-map)

## Wht fuck is this

This is a MapMap data structure, is something like:

		const mapMap = new Map('key', new Map());

but better. It takes care to create SETS automatically on set, and remove keys where the SET is empty, it inherits MAP, so all MAP method are available, obviously.

## Usage

		const MapMap = require('map-map');

		const mapMap = new MapMap('parentKey', 'key', 'value'); 
		console.log(mapMap.entries());
		// { [ 'parentKey', Map { 'key' => 'value' } ] }

		mapMap.set('parentKey', 'key-1', 'value-1');
		console.log(mapMap.entries());
		// [ 'parentKey', Map { 'key' => 'value', 'key-1' => 'value-1' } ] }
		
		console.log(mapMap.size()); // 1
		console.log(mapMap.size('parentKey')); // 2

		mapMap.clear('parentKey', 'key-1');
		console.log(mapMap.entries());
		// { [ 'parentKey', Map { 'key' => 'value' } ] }

		mapMap.clear('parentKey');
		console.log(mapMap.entries());
		// {}

		mapMap.clear();
		console.log(mapMap.entries());
		// {}

		console.log(mapMap.has('parentKey')); // true
		console.log(mapMap.has('parentKey-1')); // false
		console.log(mapMap.has('parentKey', 'value')); // true
		console.log(mapMap.has('parentKey', 'value-1')); // false

		mapMap.delete('parentKey');
		console.log(mapMap.entries());
		// {}

		mapMap.delete('parentKey', 'key-1');
		console.log(mapMap.entries());
		// { [ 'parentKey', Map { 'key' => 'value' } ] }

		mapMap.forEach(console.log);
		// Map { 'key' => 'value' }

		mapMap.forEach('parentKey', console.log);
		// 'value'
		// 'value-1'

Cool, no!!?
