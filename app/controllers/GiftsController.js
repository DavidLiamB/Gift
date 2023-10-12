import { AppState } from "../AppState.js"
import { giftsService } from "../services/GiftsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"
import { getFormData } from "../utils/FormHandler.js"

function _drawGifts() {
  let content = ''
  AppState.gifts.forEach(gift => content += gift.giftCard)
  setHTML('giftsArea', content)
}
export class GiftsController {
  constructor() {
    this.getGifts()
    AppState.on('gifts', _drawGifts)
  }

  async openCloseGift(id) {
    try {
      await giftsService.openCloseGift(id)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async getGifts() {
    try {
      await giftsService.getGifts()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async createGift(event) {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      await giftsService.createGift(formData)
      form.reset()
      Pop.success('created')
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
}