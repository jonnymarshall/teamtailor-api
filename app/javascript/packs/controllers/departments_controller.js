import { Controller } from "stimulus"

export default class extends Controller {

  controllerName = "departments_controller"

  static targets = ["tagsContainer"]

  departmentsData = null
  departmentHTMLComponents = []

  async connect() {
    console.log(`${this.controllerName} connected.`)
    await this.executeRequest("departments")
    await this.jobsData.map((job) => this.createDepartment(job))
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

  createDepartment(department) {
    this.tagsContainerTarget.insertAdjacentHTML("afterbegin", `
      <div class="control">
        <div class="tags has-addons">
          <a class="tag" data-target="tags.tag" data-action="click->tags#activateTag">${department.attributes["name"]}</a>
        </div>
      </div>
    `);
  }
}