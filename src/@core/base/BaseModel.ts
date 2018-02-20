import Lodash from 'lodash';

abstract class BaseModel {


  /**
   * constructor
   * 
   * @param {Boolean} sync syncronization switch
   */
  constructor(sync = false) {

  }

  public abstract get package(): string;

  public abstract get getSchema(): any;
  
  public abstract setConnection(connDefault): any;

  public abstract syncModel(sync: boolean): void;

}

export default BaseModel;