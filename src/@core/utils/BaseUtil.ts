import * as Glob from 'glob';
import * as Lodash from 'lodash';
import * as Fs from 'fs';
import * as Path from 'path';
import * as Yaml from 'js-yaml';
import { PathHelper } from '../helpers';

class BaseUtil {
	constructor() { }


	/**
	 * return file names of specific path
	 * 
	 * @param {Array<String>} currentPath 
	 * @param {String} array
	 * @return {Array<String>}
	 */
	public static listAllFiles(currentPath: string, array: Array<string> = []) {
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
	public static walkDir(currentPath: String, array: Array<string>): Array<string> {
		try {
			const ext = global.extensionLoader;

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

	/**
     * get enviroment params from .enviroment.json
     * 
     * @return {Promise} promise with enviroment.json.
     */
    public static loadEnviroment(): any {
			return new Promise((resolve, reject) => {
					try {
							const file = Yaml.safeLoad(Fs.readFileSync(`${PathHelper.rootOfProject}/.dbenviroment.yaml`, 'utf8'));
							const json = JSON.parse(JSON.stringify(file));
							return resolve(json);
					} catch (error) {
							console.error(error);
							reject(error);
					}
			})
	}
}

export default BaseUtil;