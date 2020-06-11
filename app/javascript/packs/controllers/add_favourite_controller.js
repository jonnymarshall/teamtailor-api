import { Controller } from "stimulus"

export default class extends Controller {

  controllerName = "add_favourite_controller"

  static targets = ["button"]

  favouritesPath = null
  csrfToken = null
  favouritesJobIds = []

  async connect() {
    console.log(`${this.controllerName} connected.`)
    this.initializeValues()
    await this.getFavouritesJobIds()
    this.setInitialIconState()
  }

  disconnect() {
    console.log(`${this.controllerName} disconnected.`)
  }

  initializeValues() {
    this.favouritesPath = this.buttonTarget.dataset.url
    this.csrfToken = document.head.querySelector("[name='csrf-token']").content
  }

  setInitialIconState() {
    this.buttonTargets.forEach((button) => {
      if (this.favouritesJobIds.includes(button.dataset.jobId)) {
        button.firstElementChild.classList.toggle("has-text-primary")
      }
    })
  }

  async toggleFavourite(e) {
    if (!e.target.classList.contains("has-text-primary")) {
      this.addOrDeleteFavourite(e, "POST", "?", new URLSearchParams({
        job_id: e.target.parentElement.dataset.jobId
      }))
    } else {
      this.addOrDeleteFavourite(e, "DELETE", "/", e.target.parentElement.dataset.jobId)
    }
    e.target.classList.toggle("has-text-primary")
  }

  async addOrDeleteFavourite(e, method, seperator, params) {
    await fetch(this.favouritesPath + seperator + params,
    {
      method: method,
      headers: { accept: "application/json", "X-CSRF-Token": this.csrfToken }})
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((reason) => {
          console.log(reason)
       })
  }

  async getFavouritesJobIds() {
    await fetch(this.favouritesPath,
    {
      method: "GET",
      headers: { accept: "application/json", "X-CSRF-Token": this.csrfToken }})
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        
          data.data.forEach((favourite) => {
            this.favouritesJobIds.push(favourite.attributes.job_id)
          })
        })
    console.log(this.favouritesJobIds)
    // e.target.classList.toggle("has-text-primary")
  }
}