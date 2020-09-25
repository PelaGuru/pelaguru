import * as functions from 'firebase-functions';

export class Logger {
  public static log(message: string, ...args: any[]) {
    functions.logger.log(message, ...args);
  }

  public static debug(message: string, ...args: any[]) {
    functions.logger.debug(message, args);
  }

  public static info(message: string, ...args: any[]) {
    functions.logger.info(message, ...args);
  }

  public static warn(message: string, ...args: any[]) {
    functions.logger.warn(message, ...args);
  }

  public static error(message: string, ...args: any[]) {
    functions.logger.error(message, ...args);
  }
}
