import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async prepareSpell(spellId) {
    const spellData = { prepared: true }
    const response = await api.put(`api/spells/${spellId}`, spellData)
    console.log('UPDATED SPELL ✅🔮🧙‍♂️', response.data);

  }
  setActiveSpell(spellId) {
    const foundSpell = AppState.sandboxSpells.find(spell => spell.id == spellId)
    AppState.activeSpell = foundSpell
  }
  async getMySpells() {
    const response = await api.get('api/spells')
    console.log('GOT MY SPELLS 🧙‍♂️🔮🔮🔮', response.data);
    const spells = response.data.map(spellData => new Spell(spellData))
    AppState.sandboxSpells = spells
  }
  async saveSpell() {
    const spellToSave = AppState.activeSpell
    const response = await api.post('api/spells', spellToSave)
    console.log('SAVED SPELL 🧙‍♂️💾', response.data);
    const spell = new Spell(response.data)
    AppState.sandboxSpells.push(spell)

    AppState.emit('activeSpell')
  }
}

export const sandboxSpellsService = new SandboxSpellsService()