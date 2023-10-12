import { generateId } from "../utils/GenerateId.js"

export class Gift {
  constructor(data) {
    this.id = data.id || generateId()
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened || false
  }

  get giftCard() {
    if (this.opened) {
      return `
      <div class="col-12 col-md-6 col-lg-4 mb-1">
      <div class="p-1 gift d-flex  align-items-center justify-content-center flex-column card">
        <img class="gift-img"
          src="${this.url}"
          alt="">
        <p class="text-center">${this.tag}</p>
      </div>
      </div>
      `
    }
    return `
    <div class="col-12 col-md-6 col-lg-4 mb-1">
    <div onclick="app.GiftsController.openCloseGift('${this.id}')" role="button" class="p-1 gift d-flex align-items-center justify-content-center card">
      <p>${this.tag}</p>
    </div>
    </div>
    `
  }
}