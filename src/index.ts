import {Server} from './@core/server';
import {LoaderUtil} from './@core/utils';
import {BaseRoute} from './@core/base';

global.extensionLoader = (process.env.node_env === 'production') ? '.js': (process.env.node_env === 'develop') ? '.ts' : '.ts' ;
global.tempSrcPath = (process.env.node_env === 'production') ? 'dist': (process.env.node_env === 'develop') ? 'src' : 'src' ;
global.BaseRoute = BaseRoute;

//server
let serveObj = new Server();

let httpServer = serveObj.getHttpServer();
let router = serveObj.getRouter();

LoaderUtil.loadAllRoutes(router)

router.get('/', (req, res) => {
  res.send('hola');
})

serveObj.upServer();