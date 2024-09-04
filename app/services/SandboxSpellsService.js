import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async prepareSpell(spellId) {
    const spells = AppState.sandboxSpells

    // NOTE we find the index of the spell that we want to update. We will use this for two things: pulling the original spell out of the AppState, and splicing the old one out
    const spellIndex = spells.findIndex(spell => spell.id == spellId)

    // pulls the entire spell object out of the AppState using the index from above
    const spell = spells[spellIndex]

    // if the spell in the appstate's prepared status is false: {prepared: true}
    // if the spell in the appstate's prepared status is true: {prepared: false}
    const spellData = { prepared: !spell.prepared }

    // NOTE with a PUT request, you must supply the id of the resource in the request URL.
    // NOTE PUT requests should contain a body. The body should be an object formatted with the properties that you want to change as the key, and the values being what you want to change the resource to
    const response = await api.put(`api/spells/${spellId}`, spellData)
    console.log('UPDATED SPELL ✅🔮🧙‍♂️', response.data);

    // NOTE response.data should be what the updated resource currently is in the database
    const updatedSpell = new Spell(response.data)

    // NOTE splice can take in a third argument, which will replace the old data in our AppState
    spells.splice(spellIndex, 1, updatedSpell)
  }
  setActiveSpell(spellId) {
    // NOTE we have all of the data that we need to display currently in the AppState, no need for a network request
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

    AppState.emit('activeSpell') //redraw active template to hide save button
  }
}

export const sandboxSpellsService = new SandboxSpellsService()