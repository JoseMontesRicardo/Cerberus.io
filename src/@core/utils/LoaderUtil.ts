import * as Fs from 'fs';
import * as Path from 'path';
import BaseUtil from './BaseUtil';

class LoaderUtil extends BaseUtil {

	/**
	 * load all files on folder
	 * 
	 * @param {String} pathOfFolder path of folder 
	 * @return {any} objet with files loaded 
	 */
	public static loadFiles(pathOfFolder): any {
		const ext = global.extensionLoader;
		let paths = [];
		let moduleExports = {};
		let files = Fs.readdirSync(pathOfFolder);
		let tmpFile;

		for (var key in files) {
			if (files.hasOwnProperty(key)) {
				if (Path.extname(files[key]) === ext) {
					tmpFile = require(`${pathOfFolder}/${files[key]}`);
					moduleExports[Path.basename(files[key], ext)] = (tmpFile.default) ? tmpFile.default : tmpFile;
				}
			}
		}

		return moduleExports;
	}


	/**
	 * load all routes on folder src/API/routes
	 * 
	 * @param {String} pathOfFolder 
	 * @param {any} app
	 */
	public static loadAllRoutes(routesPath: String, app: any): void {
		try {
			// const ext = '.ts';
			// let classFiles = Util.listAllFiles(path);
			// let classFilesRequired = {};
			// let fileName = '';
			// let fileNameWithoutExt = '';
			// let pathFile = '';

			// for (var index = 0; index < classFiles.length; index++) {
			// 	fileName = Path.basename(classFiles[index]);
			// 	pathFile = classFiles[index];
			// 	fileNameWithoutExt = Path.basename(pathFile, ext);

			// 	if (fileName.indexOf('Route') !== -1) {
			// 		classFilesRequired[fileNameWithoutExt] = require(pathFile).default;
			// 		new classFilesRequired[fileNameWithoutExt](app);
			// 	}
			// }

		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

}

export default LoaderUtil;