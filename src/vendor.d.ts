declare module NodeJS  {
    interface Global {
        extensionLoader: string,
        tempSrcPath: string,
        BaseRoute: any,
    }
}