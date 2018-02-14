
class BaseRoute {

	router: any;

	constructor(_router: any) {
		this.router = _router
		this.startAllMethods();
	}

	public get(path, callBack): void {
		this.router.get(path, callBack);
	}

	public post(path, callBack): void {
		this.router.post(path, callBack);
	}

	public put(path, callBack): void {
		this.router.put(path, callBack);
	}

	public patch(path, callBack): void {
		this.router.patch(path, callBack);
	}

	public delete(path, callBack): void {
		this.router.delete(path, callBack);
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

	public startAllMethods() {
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