import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async saveSpell() {
    const response = await api.post('api/spells')
    console.log('SAVED SPELL 🧙‍♂️💾', response.data);

  }
}

export const sandboxSpellsService = new SandboxSpellsService()