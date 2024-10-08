import { AppState } from "../AppState.js"
import { dndSpellsService } from "../services/DNDSpellsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class DNDSpellsController {

  constructor() {
    AppState.on('dndSpells', this.drawDNDSpellsList)
    AppState.on('activeSpell', this.drawActiveSpell)
    AppState.on('user', this.drawActiveSpell)

    this.getDNDSpells()
  }

  drawDNDSpellsList() {
    const spells = AppState.dndSpells
    let spellHTML = ''
    // NOTE we just have POJOs stored in this array, so we build the HTML here in the controller
    spells.forEach(spell => {
      spellHTML += `
          <div class="my-1">
            <button onclick="app.DNDSpellsController.getSpellByIndex('${spell.index}')" class="btn btn-info w-100 rounded-pill">
              ${spell.name}
            </button>
          </div>`
    })
    setHTML('dnd-spells-list', spellHTML)
  }

  drawActiveSpell() {
    // if there is no active spell currently
    if (AppState.activeSpell == null) return

    setHTML('spell-details', AppState.activeSpell.detailsHTMLTemplate)
  }

  async getDNDSpells() {
    try {
      // REVIEW make sure you await your asynchronous service calls so we stay inside of the try
      await dndSpellsService.getDNDSpells()
    } catch (error) {
      Pop.error(error) //notify the user
      console.error(error) //notify the dev
    }
  }

  async getSpellByIndex(spellIndex) {
    try {
      await dndSpellsService.getSpellByIndex(spellIndex)
    } catch (error) {
      Pop.error(error) //notify the user
      console.error(error) //notify the dev
    }
  }
}
