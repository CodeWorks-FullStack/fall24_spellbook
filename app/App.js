import { AuthController } from './controllers/AuthController.js';
import { DNDSpellsController } from './controllers/DNDSpellsController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  // REVIEW do not remove this controller if you are dealing with the sandbox API
  AuthController = new AuthController()
  DNDSpellsController = new DNDSpellsController()

  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
