import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";

export class SandboxSpellsController {
  constructor() {
    console.log('⌛📦🎮');
    // NOTE when I log in
    AppState.on('user', this.getMySpells)
  }

  async saveSpell() {
    try {
      await sandboxSpellsService.saveSpell()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
}