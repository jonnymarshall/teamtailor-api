import { Controller } from "stimulus"

export default class extends Controller {

  controllerName = "jobs_index_controller"

  static targets = ["container"]

  jobsData = null
  jobsHTMLComponents = []

  async connect() {
    console.log(`${this.controllerName} connected.`)
    await this.executeRequest("jobs")
    await this.populateList(this.jobsData)
  }

  clearResults() {
    this.containerTarget.innerHTML = ""
  }

  populateList(data) {
    data.map((job) => this.createJob(job))
  }

  searchHandler(e) {
    let filteredJobs = this.jobsData.filter(job => job.attributes["title"].toLowerCase().includes(e.target.value.toLowerCase()))
    this.clearResults()
    this.populateList(filteredJobs)
  }

  async executeRequest(type) {
    let self = this
    let urlString = `http://localhost:3000?`

    await fetch(urlString + new URLSearchParams({
      type: type
    }),
    { headers: { accept: "application/json" }})
      .then((response) => response.json())
      .then((data) => {
        self.jobsData = data.data
        console.log(self.jobsData);
      })
  }

  createJob(job) {
    // job["attributes"].picture["original"]

    this.containerTarget.insertAdjacentHTML("afterbegin", `
      <div class="columns">
        <div class="column is-three-fifths is-offset-one-fifth">
          



        <div class="c-job-main-section is-flex">
          <figure class="image is-128x128 u-padding-10">
            <img src="https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80">
          </figure>
          <div id="c-job--right-section" class="is-flex u-padding-10">
            <div id="content" class="is-flex">
              <div id="job-title-and-description">
                <h1 class="title is-4">${job.attributes["title"]}</h1>
                <h1 class="subtitle is-5">${job.attributes["pitch"]}</h2>
              </div>
              <div id="icons">
                <span class="icon has-text-grey-dark">
                  <a href = "${job.attributes["mailbox"]}">
                    <i class="fas fa-lg fa-envelope"></i>
                  </a>
                </span>
                <span
                  class="icon has-text-grey-dark u-pointer"
                  data-action="click->add-favourite#toggleFavourite"
                  data-target="add-favourite.button"
                  data-job-id="${job.id}"
                  data-url=""
                >
                  <i class="fas fa-lg fa-heart"></i>
                </span>
              </div>
            </div>
            <div id="footer" class="is-flex">
              <div class="buttons">
                <button class="button is-small is-primary is-rounded">View</button>
                <button class="button is-small is-secondary is-rounded">Visit</button>
                <button class="button is-small is-link is-rounded">Apply</button>
              </div>
            </div>
          </div>
        <div>

        </div>
      </div>
    `);
  }
}