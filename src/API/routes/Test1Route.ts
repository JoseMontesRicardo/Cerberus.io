
import {BaseRoute} from '../../@core/base'
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
	changolesInit() {
		this.get('/' + this.nameRoute, async (req, res) => { res.send({ 'route': 'Hi from ' + this.nameRoute + '' }); });
		// this.get('/'+this.nameRoute,async (req, res) => {res.send({ 'route':  'Hi from ' + this.nameRoute + '' });});
		this.post('/' + this.nameRoute, async (req, res) => { res.send({ 'route': 'Hi from ' + this.nameRoute + '' }); });
		this.put('/' + this.nameRoute, async (req, res) => { res.send({ 'route': 'Hi from ' + this.nameRoute + '' }); });
		this.patch('/' + this.nameRoute, async (req, res) => { res.send({ 'route': 'Hi from ' + this.nameRoute + '' }); });
		this.delete('/' + this.nameRoute, async (req, res) => { res.send({ 'route': 'Hi from ' + this.nameRoute + '' }); });
	}
}

export default Test1Route;