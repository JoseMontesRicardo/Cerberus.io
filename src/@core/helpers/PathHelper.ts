import * as appRootPath from 'app-root-path';

class PathHelper {

    public static get rootSrcPath(): string {
        return `${appRootPath}/${global.tempSrcPath}`;
    }
    
    public static get apiPath(): string {
        return `${PathHelper.rootSrcPath}/API`;
    }
    
    public static get configPath(): string {
        return `${PathHelper.rootSrcPath}/config`;
    }

    public static get corePath(): string {
        return `${PathHelper.rootSrcPath}/@core`;
    }

    public static get utilsPath(): string {
        return `${PathHelper.corePath}/utils`;
    }

    public static get serverPath(): string {
        return `${PathHelper.corePath}/server`;
    }

    public static get routesPath(): string {
        return `${PathHelper.apiPath}/routes`;
    }


}

export default PathHelper;