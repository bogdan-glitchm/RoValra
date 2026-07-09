import 'zone.js';

export class AsyncLocalStorage {
	constructor() {
		this.key = Symbol('als_key');
	}

	run(store, callback, ...args) {
		const nextZone = Zone.current.fork({
			name: 'AsyncLocalStorageZone',
			properties: { [this.key]: store }
		});
		return nextZone.run(callback, null, args);
	}

	getStore() {
		return Zone.current.get(this.key);
	}

	enterWith(store) {
		const nextZone = Zone.current.fork({
			name: 'AsyncLocalStorageZone_EnterWith',
			properties: { [this.key]: store }
		});
		nextZone.run(() => {});
	}
}
