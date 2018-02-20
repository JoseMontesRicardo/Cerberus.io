import { BaseController } from '../../@core/base'

class Test1Controller extends BaseController {

	constructor() {
		super();
	}

	index() {
		return (req, res) => {
			res.send("Hi i'm a resource index");
		}
	}

	show() {
		return (req, res) => {
			res.send(`Hi i'm a resource show >> ${req.params.id}`);
		}
	}

	store() {
		return (req, res) => {
			res.send(`Hi i'm a resource store ${JSON.stringify(req.body)}`);
		}
	}

	update() {
		return (req, res) => {
			res.send(`Hi i'm a resource update >> ${JSON.stringify(req.params.id)} ${JSON.stringify(req.body)}`);
		}
	}


	destroy() {
		return (req, res) => {
			res.send(`Hi i'm a resource destroy >> ${JSON.stringify(req.params.id)}`);
		}
	}

}

export default Test1Controller;