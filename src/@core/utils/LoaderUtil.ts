import * as Fs from 'fs';
import * as Path from 'path';
import * as Lodash from 'lodash';
import BaseUtil from './BaseUtil';
import MessageUtil from './MessageUtil';
import { exec } from 'child_process';
import { PathHelper } from '../helpers';

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
    public static loadAllRoutes(expressRouter: any): void {
        try {
            const ext = global.extensionLoader;
            const routesPath = PathHelper.routesPath;
            let classFiles = BaseUtil.listAllFiles(routesPath);
            let classFilesRequired = {};
            let fileName = '';
            let fileNameWithoutExt = '';
            let pathFile = '';

            for (var index = 0; index < classFiles.length; index++) {
                fileName = Path.basename(classFiles[index]);
                pathFile = classFiles[index];
                fileNameWithoutExt = Path.basename(pathFile, ext);

                if (fileName.indexOf('Route') !== -1) {
                    classFilesRequired[fileNameWithoutExt] = require(pathFile).default;
                    new classFilesRequired[fileNameWithoutExt](expressRouter);
                }
            }

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    /**
	 * 
	 * 
	 * @param {String} pathOfFolder 
	 * @param {any} app
	 */
    public static loadAction(controllerAndAction : string): any {
        try {
            const ext = global.extensionLoader;
            const controllersPath = PathHelper.controllersPath;
            let controller;
            let controllerActions;
            let controllerRequired;
            let actionFound;
            let fileName;
            let fileNameWithoutExt;
            let pathFile;
            let params = controllerAndAction.split('->');
            let nameOfController = params[0];
            let action = params[1];

            if ( params.length !== 2 ) MessageUtil.errorMsg(`Invalid param "${controllerAndAction}"!`)
            
            controller = `${PathHelper.controllersPath}/${nameOfController}${ext}`;
            fileName = Path.basename(controller);
            fileNameWithoutExt = '';
            pathFile = '';

            if ( Fs.existsSync(controller) ) {
                controllerRequired = require(controller).default;
                let instanceOfController = new controllerRequired();
                controllerActions = Object.getOwnPropertyNames(Object.getPrototypeOf(instanceOfController));
                actionFound = Lodash.find(controllerActions, o => {return o === action});

                if ( !actionFound ) MessageUtil.errorMsg(`Action "${action}" not found!`);

                return instanceOfController[actionFound]();

            } else {
                MessageUtil.errorMsg(`Controller "${controller}" not found!`)
            }

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

}

export default LoaderUtil;