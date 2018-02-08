import * as Express from 'express';
import * as Http from 'http';
import * as cors from 'cors';

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
		this.app.use(cors());
		this.app.set('port', process.env.port);
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


}

export default Server;