import * as Sequelize from 'sequelize';
import * as Mongorito from 'mongorito';
import * as Lodash from 'lodash';
import LoaderUtil from '../utils/LoaderUtil';
import MessageUtil from '../utils/MessageUtil';

class ConnectionHelper {

    /**
     * constructor
     */
    constructor() {
    }


    /**
     * test connections.
     * 
     * @param connection instance of connection.
     * @param packageConnection database package.
     * @return {Promise} Promise object represents success or fail
     */
    private testConnection(connection, packageConnection): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                switch (packageConnection) {
                    case "sequelize":
                        await connection.authenticate();
                        break;
                    case "mongorito":
                        await connection.connect();
                        break;
                    default:
                        break;
                }
                return resolve(true);
            } catch (error) {
                MessageUtil.errorMsg(error);
                return reject(error);
            }
        })
    }


    /**
     * take all params of connections from .enviroment.yaml and create connections.
     *  
     * @returns {Promise} Promise object represents the successfull connections and default connection
     */
    public startConnections(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let connectionsStarted = [];

                let { arrayOfConnections, connectionDefault } = await this.readConnections();

                if (connectionDefault === null) {
                    if (!arrayOfConnections) MessageUtil.errorMsg('cannot be selected a connection!');
                    let key = Lodash.keys(arrayOfConnections[0])[0];
                }

                for (const key in arrayOfConnections) {
                    if (arrayOfConnections.hasOwnProperty(key)) {
                        const params = arrayOfConnections[key];
                        for (var connectionName in params) {
                            connectionsStarted.push({
                                name: connectionName,
                                package: params[connectionName].package,
                                connection: await this.getConnection(params[connectionName])
                            });
                        }
                    }
                }

                return resolve({ connectionsStarted, connectionDefault });
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    }


    /**
     * create connection with especific params.
     * 
     * @param {json} options params for each connection from .enviroment.yaml
     * @returns {Promise} Promise object represents the instnce of connection
     */
    public getConnection(options): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let dbConnection = null;
                switch (options.package) {
                    case "sequelize":
                        dbConnection = new Sequelize(options['data-base'], options['user'], options['pass'], {
                            host: options['host'],
                            dialect: options['dialect'],
                            timezone: options['timezone'] ? options['timezone'] : 'Europe/London'
                        });
                        await this.testConnection(dbConnection, 'sequelize')
                        break;
                    case "mongorito":
                        dbConnection = new Mongorito(`mongodb://${options['host']}:${options['port']}/${options['data-base']}?connectTimeoutMS=52000000`);
                        await dbConnection.connect();
                        break;

                    default:
                        MessageUtil.errorMsg('Invalid Package!');
                        break;
                }
                return resolve(dbConnection);
            } catch (error) {
                MessageUtil.errorMsg(error);
                reject(error);
            }
        })
    }


    /**
     * Read .enviroment.yaml and return promise with connections
     * and the default connection.
     * 
     * @returns {Promise} Promise object represents the connections and default conection
     */
    public readConnections(): Promise<any> {
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
                MessageUtil.errorMsg(error);
                return reject(error);
            }
        })
    }

}

export default ConnectionHelper;