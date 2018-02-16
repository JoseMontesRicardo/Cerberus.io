import PathHelper from '../helpers/PathHelper';
import LoaderUtil from '../utils/LoaderUtil';

class BaseRoute {

	router: any;

	constructor(_router: any) {
		this.router = _router
		this.startAllMethods();
	}

	public get(path, controllerWithAction): void {
		let actionLoaded = LoaderUtil.loadAction(controllerWithAction);
		this.router.get(path, actionLoaded);
	}

	public post(path, controllerWithAction): void {
		let actionLoaded = LoaderUtil.loadAction(controllerWithAction);
		this.router.post(path, actionLoaded);
	}

	public put(path, controllerWithAction): void {
		let actionLoaded = LoaderUtil.loadAction(controllerWithAction);
		this.router.put(path, actionLoaded);
	}

	public patch(path, controllerWithAction): void {
		let actionLoaded = LoaderUtil.loadAction(controllerWithAction);
		this.router.patch(path, actionLoaded);
	}

	public delete(path, controllerWithAction): void {
		let actionLoaded = LoaderUtil.loadAction(controllerWithAction);
		this.router.delete(path, actionLoaded);
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