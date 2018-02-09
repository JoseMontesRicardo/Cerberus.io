import * as Glob from 'glob';
import * as Lodash from 'lodash';
import * as Fs from 'fs';
import * as Path from 'path';

class BaseUtil {
	constructor() { }


	/**
	 * return file names of specific path
	 * 
	 * @param {Array<String>} currentPath 
	 * @param {String} array
	 * @return {Array<String>}
	 */
	public static listAllFiles(currentPath: String, array: Array<String> = []) {
		try {
			let files = Glob.sync(currentPath + '/*');

			if (!Lodash.isEmpty(files)) {
				array = BaseUtil.walkDir(files, array);
			}

			return array;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

	/**
	 * enters the folders recursively
	 * NOTE: it ignores empty folders
	 * 
	 * @param {Array<String>} currentPath 
	 * @param {String} array
	 * @return {Array<String>}
	 */
	public static walkDir(currentPath: String, array: Array<String>): Array<String> {
		try {
			const ext = '.ts';

			for (var index = 0; index < currentPath.length; index++) {
				if (Fs.statSync(currentPath[index]).isDirectory()) {
					array = BaseUtil.listAllFiles(currentPath[index], array);
				} else if (Path.extname(currentPath[index]) === ext) {
					array.push(currentPath[index]);
				}

			}
			return array;

		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}
}

export default BaseUtil;