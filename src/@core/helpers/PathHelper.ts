import * as appRootPath from 'app-root-path';

class PathHelper {

    public static get rootSrcPath(): String {
        return `${appRootPath}/${global.tempSrcPath}`;
    }
    
    public static get apiPath(): String {
        return `${PathHelper.rootSrcPath}/API`;
    }
    
    public static get configPath(): String {
        return `${PathHelper.rootSrcPath}/config`;
    }

    public static get corePath(): String {
        return `${PathHelper.rootSrcPath}/@core`;
    }

    public static get utilsPath(): String {
        return `${PathHelper.corePath}/utils`;
    }

    public static get serverPath(): String {
        return `${PathHelper.corePath}/server`;
    }

    public static get routesPath(): String {
        return `${PathHelper.apiPath}/routes`;
    }


}

export default PathHelper;