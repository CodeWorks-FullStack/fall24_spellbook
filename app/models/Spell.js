import { AppState } from "../AppState.js"

export class Spell {
  constructor(data) {
    this.id = data.id
    this.index = data.index
    this.name = data.name
    // NOTE it's important to check the description first, or else we might still drill into undefined here
    this.description = data.description || data.desc.join('<br><br>')

    // this.damage = data.damage == undefined ? data.damage.damage_type.name : ''
    // NOTE this is gross
    // if (data.damage == undefined) {
    //   this.damage = ''
    // }
    // else if (data.damage.damage_type == undefined) {
    //   this.damage = data.damage
    // }
    // else {
    //   this.damage = data.damage.damage_type.name
    // }
    // NOTE this is also gross
    this.damage = data.damage == undefined ? '' : data.damage.damage_type == undefined ? data.damage : data.damage.damage_type.name
    this.level = data.level
    this.range = data.range
    this.material = data.material || ''
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.casting_time
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared || false
  }

  get detailsHTMLTemplate() {
    return `
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h1>${this.name}</h1>
        ${this.saveSpellButton}
      </div>
      <h2>Level ${this.level} ${this.damage} Spell</h2>
      <p>Cast time of ${this.castingTime} with a range of ${this.range} with a duration of ${this.duration}</p>
      <p>This ${this.ritual ? '<i>is</i> a' : 'is not a'} ritual spell${this.material ? ' that will require ' + this.material.toLowerCase() : ''}${this.concentration ? ' and you must concentrate while performing' : ''}</p>
      <p>Components: ${this.componentSpans}</p>
      <p>${this.description}</p>
    </div>
    `
  }

  get mySpellListItemHTMLTemplate() {
    return `
    <div class="my-1 d-flex">
        <input onchange="app.SandboxSpellsController.prepareSpell('${this.id}')" type="checkbox" ${this.prepared ? 'checked' : ''}>
        <button onclick="app.SandboxSpellsController.setActiveSpell('${this.id}')" class="btn btn-info flex-grow-1 rounded-pill">
          ${this.name}
        </button>
      </div>
    `
  }

  get componentSpans() {
    let titles = {
      V: 'Verbal',
      S: 'Somatic',
      M: 'Material'
    }
    let spanHTML = ''
    this.components.forEach(component => spanHTML += `<span class="me-2" title="${titles[component]}">${component}</span>`)
    return spanHTML
  }

  get saveSpellButton() {
    if (AppState.user == null) return ''

    const foundSavedSpell = AppState.sandboxSpells.find(spell => spell.name == this.name)

    if (foundSavedSpell) return ''

    if (this.material.length > 100) return ''

    return '<button onclick="app.SandboxSpellsController.saveSpell()" class="btn btn-outline-info">Save Spell</button>'
  }
}

// NOTE this is just used as a reference when building the model
// const spellData = {
//   "index": "acid-arrow",
//   "name": "Acid Arrow",
//   "desc": [
//     "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."
//   ],
//   "higher_level": [
//     "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."
//   ],
//   "range": "90 feet",
//   "components": [
//     "V",
//     "S",
//     "M"
//   ],
//   "material": "Powdered rhubarb leaf and an adder's stomach.",
//   "ritual": false,
//   "duration": "Instantaneous",
//   "concentration": false,
//   "casting_time": "1 action",
//   "level": 2,
//   "attack_type": "ranged",
//   "damage": {
//     "damage_type": {
//       "index": "acid",
//       "name": "Acid",
//       "url": "/api/damage-types/acid"
//     },
//     "damage_at_slot_level": {
//       "2": "4d4",
//       "3": "5d4",
//       "4": "6d4",
//       "5": "7d4",
//       "6": "8d4",
//       "7": "9d4",
//       "8": "10d4",
//       "9": "11d4"
//     }
//   },
//   "school": {
//     "index": "evocation",
//     "name": "Evocation",
//     "url": "/api/magic-schools/evocation"
//   },
//   "classes": [
//     {
//       "index": "wizard",
//       "name": "Wizard",
//       "url": "/api/classes/wizard"
//     }
//   ],
//   "subclasses": [
//     {
//       "index": "lore",
//       "name": "Lore",
//       "url": "/api/subclasses/lore"
//     },
//     {
//       "index": "land",
//       "name": "Land",
//       "url": "/api/subclasses/land"
//     }
//   ],
//   "url": "/api/spells/acid-arrow"
// }