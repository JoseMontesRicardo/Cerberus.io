import {Server} from './@core/server';
import {LoaderUtil} from './@core/utils/';
import {PathHelper} from './@core/helpers';

//definicion server
let serveObj = new Server();

console.log(LoaderUtil.listAllFiles(PathHelper.apiPath));

let httpServer = serveObj.getHttpServer();

httpServer.get('/', (req, res) => {
  res.send('hola');
})