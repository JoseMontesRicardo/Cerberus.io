import * as Sequelize from 'sequelize';
import * as Mongorito from 'mongorito';
import * as Lodash from 'lodash';
import LoaderUtil from './LoaderUtil';
import MessageUtil from './MessageUtil';

class ConnectionUtil {
    
    /**
     * constructor
     */
    constructor() {
    }
    
    
    /**
     * take all params of connections from .enviroment.yaml and create connections.
     *  
     * @returns {Promise} Promise object represents the successfull connections and default connection
     */
    public startConnections(): any {
        return new Promise(async (resolve, reject) => {
            try {
                let connectionsStarted = [];
                
                let { arrayOfConnections, connectionDefault } = await this.readConnections();
                if (connectionDefault === null) {
                    for (var key in arrayOfConnections[0]) {
                        connectionDefault = key;
                    }
                }

                for (let key in arrayOfConnections) {
                    if (arrayOfConnections.hasOwnProperty(key)) {
                        let params = arrayOfConnections[key];
                        for (var connectionName in params) {
                            connectionsStarted.push({ 
                                name: connectionName, 
                                package: params[connectionName].package,
                                connection: await this.getConnections(params[connectionName]) 
                            });
                        }
                    }
                }
                return resolve({connectionsStarted, connectionDefault});
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    }

    
    /**
     * create connection for each config in .enviroment.yaml 
     * 
     * @param {json} options params for each connection from .enviroment.yaml
     * @returns {Promise} Promise object represents the connection for each config
     */
    public getConnections(options) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbConnection = null;
                switch (options.package) {
                    case "sequelize":
                        dbConnection = new Sequelize(options['data-base'], options['user'], options['pass'], {
                            host: options['host'],
                            dialect: options['dialect'],
                            timezone: options['timezone']? options['timezone'] : 'Europe/London'
                        });
                        break;
                    case "mongorito":
                        dbConnection = new Mongorito(`mongodb://${options['host']}:${options['port']}/${options['data-base']}?connectTimeoutMS=52000000`);
                        await dbConnection.connect();
                        break;

                    default:
                        console.log('Invalid Package!')
                        break;
                }
                return resolve(dbConnection);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }


    /**
     * Read and return all connection configs from .enviroment.yaml 
     * and the default connection.
     * 
     * @returns {Promise} Promise object represents the connections and default conection
     */
    public readConnections(): any {
        return new Promise(async (resolve, reject) => {
            try {
                let envFile = await LoaderUtil.loadEnviroment();
                let connectionDefault = null;

                if (Lodash.has(envFile, 'db')) {
                    if (Lodash.has(envFile['db'], 'connections')) {

                        if (Lodash.has(envFile['db'], 'default')) {
                            connectionDefault = envFile['db']['default'];
                        }

                        let arrayOfConnections = envFile['db']['connections'];
                        return resolve({ arrayOfConnections, connectionDefault });
                    } else {
                        MessageUtil.errorMsg('Property Connections not found!');
                    }
                } else {
                    MessageUtil.errorMsg('Property db not found!');
                }
            } catch (error) {
                console.error(error);
                return reject(error);
            }
        })
    }

}

export default ConnectionUtil;