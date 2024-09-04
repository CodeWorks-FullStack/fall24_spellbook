import { dndSpellsService } from "../services/DNDSpellsService.js"
import { Pop } from "../utils/Pop.js"

export class DNDSpellsController {

  constructor() {
    console.log('DND Spells Controller loaded')
    this.getSpells()
  }

  async getSpells() {
    try {
      // REVIEW make sure you await your asynchronous service calls so we stay inside of the try
      await dndSpellsService.getSpells()
    } catch (error) {
      Pop.error(error) //notify the user
      console.error(error) //notify the dev
    }
  }
}