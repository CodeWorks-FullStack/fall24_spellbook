import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndAPI } from "./AxiosService.js"

class DNDSpellsService {
  async getSpellByIndex(spellIndex) {
    // request URL example: https://www.dnd5eapi.co/api/spells/acid-arrow
    const response = await dndAPI.get(`api/spells/${spellIndex}`)
    console.log('GOT SPELL DETAILS 🧙‍♂️📖🔮', response.data);
    const newSpell = new Spell(response.data)
    AppState.activeSpell = newSpell
  }

  async getDNDSpells() {
    // baseURL: 'https://www.dnd5eapi.co'
    // argument to append to baseURL: 'api/spells'
    // full URL: 'https://www.dnd5eapi.co/api/spells'
    const response = await dndAPI.get('api/spells')
    console.log('GOT SPELLS 🧙🧙‍♂️🪄', response.data);
    // NOTE response.data was an object : {count: 319, results: [...]}
    AppState.dndSpells = response.data.results
    console.log('spells in the appstate', AppState.dndSpells);
  }
}

export const dndSpellsService = new DNDSpellsService()