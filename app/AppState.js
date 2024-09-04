import { Spell } from './models/Spell.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  // REVIEW keep the user and account here in the appstate
  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null
  dndSpells = []

  /**@type {Spell}*/
  activeSpell = null

  /**@type {Spell[]}*/
  mySpells = []
}

export const AppState = createObservableProxy(new ObservableAppState())