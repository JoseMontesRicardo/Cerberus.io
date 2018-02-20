import { Server } from './@core/server';
import { LoaderUtil } from './@core/utils';
import { ConnectionHelper } from './@core/helpers';
import { BaseRoute } from './@core/base';

(async () => {
	global.extensionLoader = (process.env.node_env === 'production') ? '.js' : (process.env.node_env === 'develop') ? '.ts' : '.ts';
	global.tempSrcPath = (process.env.node_env === 'production') ? 'dist' : (process.env.node_env === 'develop') ? 'src' : 'src';
	global.BaseRoute = BaseRoute;

	//server
	let serveObj = new Server();

	let connectionHelper = new ConnectionHelper();
	global.Connections = await connectionHelper.startConnections();
	console.log(global.Connections);

	let httpServer = serveObj.getHttpServer();
	let router = serveObj.getRouter();

	LoaderUtil.loadAllRoutes(router)

	serveObj.upServer();
})();