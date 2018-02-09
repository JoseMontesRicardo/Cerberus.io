import * as appRootPath from 'app-root-path';

class PathHelper {

    public static get rootSrcPath(): String {
        return `${appRootPath}/src`;
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

}

export default PathHelper;