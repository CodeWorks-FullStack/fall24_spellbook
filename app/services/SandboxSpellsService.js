import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async getMySpells() {
    const response = await api.get('api/spells')
    console.log('GOT MY SPELLS 🧙‍♂️🔮🔮🔮', response.data);
  }
  async saveSpell() {
    const spellToSave = AppState.activeSpell
    const response = await api.post('api/spells', spellToSave)
    console.log('SAVED SPELL 🧙‍♂️💾', response.data);

  }
}

export const sandboxSpellsService = new SandboxSpellsService()