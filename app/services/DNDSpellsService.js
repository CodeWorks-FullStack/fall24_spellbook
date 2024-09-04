import { AppState } from "../AppState.js";
import { dndAPI } from "./AxiosService.js"

class DNDSpellsService {
  getSpellByIndex(spellIndex) {
    console.log('spell index!', spellIndex);
  }
  async getDNDSpells() {
    const response = await dndAPI.get('api/spells')
    console.log('GOT SPELLS 🧙🧙‍♂️🪄', response.data);
    // NOTE response.data was an object : {count: 319, results: [...]}
    AppState.dndSpells = response.data.results
    console.log('spells in the appstate', AppState.dndSpells);
  }
}

export const dndSpellsService = new DNDSpellsService()