import { DataClient } from 'eris-boiler'

import {
  DMGCards,
  DMGDecks,
  DMGPlayer,
  cardsEmbed,
} from '../wrappers'

export class Magician extends DataClient {

  public readonly decks = new DMGDecks()
  public readonly cards = new DMGCards()
  public readonly players = new DMGPlayer()
  public readonly constructCardEmbed = cardsEmbed

}
