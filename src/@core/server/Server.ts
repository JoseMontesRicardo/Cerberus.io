import * as Express from 'express';
import * as Http from 'http';
import * as cors from 'cors';
import * as Path from 'path';
import { PathHelper } from '../helpers';
import { LoaderUtil } from '../utils';

class Server {

	private app: any;
	/**
	 * constructor
	 */
	constructor() {
		this.app = Express();
		this.upServer();
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
	 * 
	 * config server here.
	 */
	private configServer(): void {
		this.loadDependencies(this.app);
	}

	/**
	 * 
	 * up and run server
	 */
	private upServer(): void {
		this.configServer();
		this.app.server = Http.createServer(this.app);
		this.app.server.listen(process.env.port, () => {
			console.log(`Running ${process.env.port}`)
		});
	}

	/**
	 * 
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
						// configFileLoaded = require(file).default(app);
					}
				}
			}
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}

	}


}

export default Server;