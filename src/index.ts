import {Server} from './@core/server';
import Utils from './@core/utils/LoaderUtil';

let serveObj = new Server();
let httpServer = serveObj.getHttpServer();

httpServer.get('/', (req, res) => {
  res.send('hola');
})