import {Server} from './@core/server';

global.extensionLoader = (process.env.node_env === 'production') ? '.js': (process.env.node_env === 'develop') ? '.ts' : '.ts' ;
global.tempSrcPath = (process.env.node_env === 'production') ? 'dist': (process.env.node_env === 'develop') ? 'src' : 'src' ;

//server
let serveObj = new Server();

let httpServer = serveObj.getHttpServer();

httpServer.get('/', (req, res) => {
  res.send('hola');
})