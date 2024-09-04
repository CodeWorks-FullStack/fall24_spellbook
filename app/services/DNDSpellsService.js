import { dndAPI } from "./AxiosService.js"

class DNDSpellsService {
  async getSpells() {
    const response = await dndAPI.get('api/spells')
    console.log('GOT SPELLS 🧙🧙‍♂️🪄', response.data);

  }
}

export const dndSpellsService = new DNDSpellsService()