import { Controller } from "stimulus"

export default class extends Controller {

  controllerName = "jobs_index_controller"

  static targets = ["container"]

  jobsData = null
  jobsHTMLComponents = []

  async connect() {
    console.log(`${this.controllerName} connected.`)
    await this.executeRequest("jobs")
    await this.jobsData.map((job) => this.createJob(job))
  }

  async executeRequest(type) {
    let self = this
    let urlString = `http://localhost:3000?`

    await fetch(urlString + new URLSearchParams({
      type: type
    }),
    { headers: { accept: "application/json"}})
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
          <div>${job.id}</div>
          <div>${job.attributes["title"]}</div>
          <div>${job.attributes["pitch"]}</div>
          <div>${job["attributes"].body}</div>

          <div>${job.links["careersite-job-url"]}</div>
          <div>${job.links["careersite-job-apply-url"]}</div>
          <div>${job.attributes["mailbox"]}</div>
        </div>
      </div>
    `);
  }
}