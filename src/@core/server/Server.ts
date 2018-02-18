import * as Express from 'express';
import * as Http from 'http';
import * as cors from 'cors';
import * as Path from 'path';
import { PathHelper } from '../helpers';
import { LoaderUtil } from '../utils';

class Server {

	private app: any;
	private router: any;
	/**
	 * constructor
	 */
	constructor() {
		this.app = Express();
		this.router = Express.Router();
		this.configServer();
		// this.upServer();
	}


	/**
	 * 
	 * config server here.
	 */
	private configServer(): void {
		this.loadDependencies(this.app);
	}


	/**
	 * load config for server.
	 * 
	 * @param {any} app 
	 */
	private loadDependencies(app: any): void {
		try {
			let serverDependecies = LoaderUtil.listAllFiles(PathHelper.configPath);
			let configFileLoaded;

			for (const key in serverDependecies) {
				if (serverDependecies.hasOwnProperty(key)) {
					const file = serverDependecies[key].toString();
					let fileName = Path.basename(file);
					if (file.indexOf('server') !== -1) {
						configFileLoaded = require(file).default(app);
					}
				}
			}
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}

	}


	/**
	 * return app
	 * 
	 * @return {any} this.app 
	 */
	public getHttpServer(): any {
		return this.app;
	}
	

	/**
	 * return router for app
	 * 
	 */
	public getRouter(): any {
		return this.router;
	}


	/**
	 * up and run server.
	 * 
	 */
	public upServer(): void {
		this.app.use(this.router)
		this.app.server = Http.createServer(this.app);
		this.app.server.listen(process.env.port, () => {
			console.log(`Running ${process.env.port}`)
		});
	}


}

export default Server;