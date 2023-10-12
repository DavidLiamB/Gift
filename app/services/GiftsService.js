import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Gift } from "../models/Gift.js"

class GiftsService {
  async createGift(formData) {
    const newGift = new Gift(formData)
    const res = await api.post(`api/gifts`, newGift)
    await this.getGifts()
  }
  async openCloseGift(id) {
    const change = { opened: true }
    const res = await api.put(`api/gifts/${id}`, change)
    const gifts = AppState.gifts
    const unopenedIndex = gifts.findIndex(gift => gift.id == id)
    gifts.splice(unopenedIndex, 1, new Gift(res.data))
    AppState.emit('gifts')
  }
  async getGifts() {
    const res = await api.get('api/gifts')
    AppState.gifts = res.data.map(giftPOJO => new Gift(giftPOJO))
    // console.log('cool', res.data)
    // console.log('cool', AppState.gifts)
  }

}

export const giftsService = new GiftsService()