import * as Fs from 'fs';
import * as Path from 'path';

class LoaderUtil {

	/**
	 * import all files on folder
	 * 
	 * @param {String} pathOfFolder path of folder 
	 * @return {any} objet with files loaded 
	 */
	public static importFiles(pathOfFolder): any {
		const ext = '.ts';
		let paths = [];
		let moduleExports = {};
		let files = Fs.readdirSync(pathOfFolder);
		let tmpFile;

		for (var key in files) {
			if (files.hasOwnProperty(key)) {
				if (Path.extname(files[key]) === ext) {
					tmpFile = require(`${pathOfFolder}/${files[key]}`);
					moduleExports[Path.basename(files[key], ext)] = ( tmpFile.default ) ? tmpFile.default : tmpFile;
				}
			}
		}

		return moduleExports;
	}

}

export default LoaderUtil;