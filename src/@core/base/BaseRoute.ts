import PathHelper from '../helpers/PathHelper';
import LoaderUtil from '../utils/LoaderUtil';

class BaseRoute {

	router: any;

	constructor(_router: any) {
		this.router = _router
		this.startAllMethods();
	}

	public get(path: string, cbParam: any): void {
		if ( typeof cbParam === 'string' ) {
			let actionLoaded = LoaderUtil.loadAction(cbParam);
			this.router.get(path, actionLoaded);
		} else if (typeof cbParam === 'function') {
			this.router.get(path, cbParam);
		}
	}

	public post(path: string, cbParam: any): void {
		if ( typeof cbParam === 'string' ) {
			let actionLoaded = LoaderUtil.loadAction(cbParam);
			this.router.post(path, actionLoaded);
		} else if (typeof cbParam === 'function') {
			this.router.post(path, cbParam);
		}
	}

	public put(path: string, cbParam: any): void {
		if ( typeof cbParam === 'string' ) {
			let actionLoaded = LoaderUtil.loadAction(cbParam);
			this.router.put(path, actionLoaded);
		} else if (typeof cbParam === 'function') {
			this.router.put(path, cbParam);
		}
	}

	public patch(path: string, cbParam: any): void {
		if ( typeof cbParam === 'string' ) {
			let actionLoaded = LoaderUtil.loadAction(cbParam);
			this.router.patch(path, actionLoaded);
		} else if (typeof cbParam === 'function') {
			this.router.patch(path, cbParam);
		}
	}

	public delete(path: string, cbParam: any): void {
		if ( typeof cbParam === 'string' ) {
			let actionLoaded = LoaderUtil.loadAction(cbParam);
			this.router.delete(path, actionLoaded);
		} else if (typeof cbParam === 'function') {
			this.router.post(path, cbParam);
		}
	}

	public get nameRoute() {
		return this.constructor.name.toLowerCase();
	}


	public objectForResources(path): Array<any> {
		return [
			{ verb: 'get', route: `/${path}`, action: 'index' },
			{ verb: 'get', route: `/${path}/:id`, action: 'show' },
			{ verb: 'post', route: `/${path}`, action: 'store' },
			{ verb: 'put', route: `/${path}/:id`, action: 'update' },
			{ verb: 'delete', route: `/${path}/:id`, action: 'destroy' }
		]
	}

	public startAllMethods(): void {
		let functions = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
		let cont = 0;

		for (var key in functions) {
		    if (functions.hasOwnProperty(key)) {
		        if (functions[key] !== 'constructor') {
		            if (functions[key].indexOf('Init') !== -1) {
		                this[functions[key]]();
		                cont++;
		            }
		        }
		    }
		}

		if (cont > 0) console.log(`Routes for ${this.constructor.name} loaded!`);

	}


}

export default BaseRoute;