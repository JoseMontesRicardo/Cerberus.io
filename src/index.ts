import {Server} from './@core/server';
import Utils from './@core/utils/LoaderUtil';
import PathHelper from './@core/helpers/PathHelper';

//definicion server
let serveObj = new Server();

console.log(PathHelper.rootSrcPath)
console.log(PathHelper.corePath)
// console.log(PathHelper.serverPath)
// console.log(PathHelper.utilsPath)


let httpServer = serveObj.getHttpServer();

httpServer.get('/', (req, res) => {
  res.send('hola');
})