import { Spell } from './models/Spell.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null
  dndSpells = []

  /**@type {Spell}*/
  activeSpell = null
}

export const AppState = createObservableProxy(new ObservableAppState())