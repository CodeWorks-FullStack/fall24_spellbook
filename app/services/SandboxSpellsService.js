import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async saveSpell() {
    const spellToSave = AppState.activeSpell
    const response = await api.post('api/spells', spellToSave)
    console.log('SAVED SPELL 🧙‍♂️💾', response.data);

  }
}

export const sandboxSpellsService = new SandboxSpellsService()