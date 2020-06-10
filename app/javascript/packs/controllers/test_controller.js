import { Controller } from "stimulus"

export default class extends Controller {

  controllerName = "test_controller"

  static targets = []

  jobsData = null

  connect() {
    console.log(`${this.controllerName} connected.`)
    this.executeAjaxRequest()
  }

  async executeAjaxRequest() {
    let self = this
    let urlString = `http://localhost:3000`

    await fetch(urlString, { headers: { accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => {
        self.jobsData = data.data
        console.log(self.jobsData);
      })
  }
}