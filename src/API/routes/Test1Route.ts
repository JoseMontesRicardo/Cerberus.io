
import { BaseRoute } from '../../@core/base'
class Test1Route extends BaseRoute {
	/**
	  * construct for TestRoute
	  *
	  * @param {json} router instance of ExpressJS router
	  */
	constructor(router) {
		super(router);
	}

	/**
	* main method, init all routes for TestRoute here!
	*/
	routesInit() {
		this.get(`/${this.nameRoute}`, 'Test1Controller->index');
		this.get(`/${this.nameRoute}/:id`, 'Test1Controller->show');
		this.post(`/${this.nameRoute}`, 'Test1Controller->store');
		this.put(`/${this.nameRoute}/:id`, 'Test1Controller->update');
		this.delete(`/${this.nameRoute}/:id`, 'Test1Controller->destroy');
	}
}

export default Test1Route;