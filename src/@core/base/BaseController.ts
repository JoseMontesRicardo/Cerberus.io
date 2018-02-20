class BaseController {

  constructor() {
  }

  public get nameController() {
    return this.constructor.name.toLowerCase();
  }

}

export default BaseController;