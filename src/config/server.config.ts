//import your modules
import * as Cors from 'cors';
import * as BodyParser from 'body-parser';
import * as CookieParser from 'cookie-parser';


// customze yoru server here
export default (app) => {
	//######### sets ##########
	app.set('port', process.env.port);



	//######### uses ##########
	app.use(Cors());
	app.use(CookieParser());
	app.use(BodyParser.json({limit: '500mb'}));
	
}