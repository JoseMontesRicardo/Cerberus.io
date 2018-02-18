import Chalk from 'chalk';

class MessageUtil {

    constructor(){}

    public static successMsg (message) {
        console.log( Chalk.green.bold( `[OK] ${message}!` ) );
    }

    public static warningMsg (message) {
        console.log( Chalk.yellow.bold( `[WARNING] ${message}!` ) );
    }

    public static errorMsg (message) {
        console.error( Chalk.red.bold( `[ERROR] ${message}`), message );
        throw new Error(message);
    }

}

export default MessageUtil;