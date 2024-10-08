import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class SandboxSpellsController {
  constructor() {
    console.log('⌛📦🎮');
    // NOTE when I log in
    AppState.on('user', this.getMySpells)
    AppState.on('sandboxSpells', this.drawMySpells)
  }

  drawMySpells() {
    const spells = AppState.sandboxSpells
    let spellsHTML = ''
    spells.forEach(spell => spellsHTML += spell.mySpellListItemHTMLTemplate)
    setHTML('my-spells-list', spellsHTML)

    // const preparedSpells = spells.filter(spell => spell.prepared == true)
    const preparedSpells = spells.filter(spell => spell.prepared)
    setHTML('spell-count', `${preparedSpells.length}/${spells.length}`)
  }

  async saveSpell() {
    try {
      await sandboxSpellsService.saveSpell()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async prepareSpell(spellId) {
    try {
      await sandboxSpellsService.prepareSpell(spellId)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  setActiveSpell(spellId) {
    sandboxSpellsService.setActiveSpell(spellId)
  }
}