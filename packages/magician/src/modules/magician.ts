import { DataClient } from 'eris-boiler'

import {
  DMGCards,
  DMGDecks,
  DMGPlayer,
  cardsEmbed,
} from '../wrappers'

export class Magician extends DataClient {

  public readonly decksWrapper = new DMGDecks()
  public readonly cardsWrapper = new DMGCards()
  public readonly playerWrapper = new DMGPlayer()
  public readonly constructCardEmbed = cardsEmbed

}
