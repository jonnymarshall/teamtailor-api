import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom'
import Job from './Job'
import Search from './Search'
import FavouritesToggle from './FavouritesToggle'


class JobsIndex extends Component {
  state = {
    jobsIndexPath: `http://localhost:3000?`,
    favouritesIndexPath: `/favourites`,
    teamtailorJobs: [],
    teamtailorJobsFiltered: null,
    search: "",
    csrfToken: null,
    searchPlaceholderText: "Search for your dream role",
    favouritedJobIds: [],
    displayingFavouriteJobs: false,
    defaultImageUrl: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80"
  };

  componentDidMount() {
    this.setState({csrfToken: document.head.querySelector("[name='csrf-token']").content})
    this.executeRequest("jobs")
    this.getFavouritesJobIds()
  }

  async executeRequest(type) {
    await fetch(this.state.jobsIndexPath + new URLSearchParams({
      type: type
    }),
    { headers: { accept: "application/json" }})
      .then((response) => response.json())
      .then(data => this.setState({ teamtailorJobs: data.data.map((job) => ({
        id: parseInt(job.id),
        title: job.attributes["title"],
        pitch: job.attributes["pitch"],
        body: job.attributes["body"],
        email: job.attributes["mailbox"],
        picture: job.attributes["picture"],
        links: {
          careersiteJobUrl: job.links["careersite-job-url"],
          careersiteJobApplyUrl: job.links["careersite-job-apply-url"]
        },
        isExpanded: false
      })) }))
  }

  async getFavouritesJobIds() {
    await fetch(this.state.favouritesIndexPath,
    {
      method: "GET",
      headers: { accept: "application/json", "X-CSRF-Token": this.csrfToken }})
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((favourite) => {
            this.setState({favouritedJobIds: [...this.state.favouritedJobIds, parseInt(favourite.attributes.job_id)]})
          })
        })
  }

  async toggleFavourite(jobId) {
    if (!this.checkIfFavouriteExists(jobId)) {
      // Add Favourite
      this.addOrDeleteFavourite("POST", "?", new URLSearchParams({
        job_id: jobId
      }))
      this.setState({favouritedJobIds: [...this.state.favouritedJobIds, jobId]})
    } else {
      // Destroy Favourite
      this.addOrDeleteFavourite("DELETE", "/", jobId)
      const favouritedJobIdsUpdated = this.state.favouritedJobIds.filter(id => id !== jobId);
      this.setState({ favouritedJobIds: favouritedJobIdsUpdated });
    }
  }

  async addOrDeleteFavourite(method, seperator, params) {
    await fetch(this.state.favouritesIndexPath + seperator + params,
    {
      method: method,
      headers: { accept: "application/json", "X-CSRF-Token": this.state.csrfToken }})
  }

  getImage(jobId) {
    let job = this.state.teamtailorJobs.find(job => {
      return job.id === jobId
    })
    return job.picture !== null ? job.picture["thumb"] : this.state.defaultImageUrl
  }

  checkIfFavouriteExists(jobId) {
    return this.state.favouritedJobIds.includes(jobId)
  }

  async filterJobs(event) {
    await this.setState({search: event.target.value})
  }

  toggleShowFavourite(bool) {
    this.setState({displayingFavouriteJobs: bool})
  }

  toggleExpandJob(jobId) {
    console.log("got here")
    const { teamtailorJobs } = this.state

    const job = teamtailorJobs.find(job => {
      return job.id === jobId
    })

    job.isExpanded = !job.isExpanded
    this.setState({ teamtailorJobs })
  }

  render() {
    const { teamtailorJobs, search, searchPlaceholderText, displayingFavouriteJobs} = this.state
    let teamtailorJobsFiltered = teamtailorJobs.filter(job =>
      job.title.toLowerCase().includes(`${search.toLowerCase()}`)
    )
    if (displayingFavouriteJobs) {
      teamtailorJobsFiltered = teamtailorJobsFiltered.filter(job =>
        this.state.favouritedJobIds.includes(job.id)
      )
    }

    return (
      <React.Fragment>
        <section className="hero is-medium hero-image">
          <div className="hero-body">
            <div className="container has-text-centered">
              <img className="hero-logo" src="https://ember.cdn.teamtailor.com/ember-production/assets/images/teamtailor-logo-f442e875406f0a21cddfe9f211283b92.svg"></img>
              <div className="columns">
                <div className="column is-paddingless"></div>
                <div className="column is-8 is-offset-2">
                  <form className="form-group col-xs-6 c-field-has-autocomplete-results" action="/venues" acceptCharset="UTF-8" method="get">
                    <input name="utf8" type="hidden" value="✓"></input>
                    <div className="field has-addons">
                      <p className="control is-expanded">
                        <Search
                          onChange={this.filterJobs.bind(this)}
                          placeholder={searchPlaceholderText}
                          value={search}>
                        </Search>
                      </p>
                    </div>
                    <div
                      className="bu-prev-element-margin-b-counter c-autocomplete-results-container">
                    </div>
                  </form>
                </div>
                <div className="column is-paddingless"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <FavouritesToggle 
                  onClick={this.toggleShowFavourite.bind(this)}
                  displayingFavouriteJobs={displayingFavouriteJobs}
                  />
              </div>
            </div>
          </div>
        </section>

        <section className="section is-paddingless-touch">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="tags">
                  <div className="field is-grouped is-grouped-multiline" data-target="departments.tagsContainer">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                {teamtailorJobsFiltered && teamtailorJobsFiltered.map((job, index) =>
                  <Job
                    key={index}
                    jobId={job.id}
                    title={job.title}
                    pitch={job.pitch}
                    body={job.body}
                    image={this.getImage(job.id)}
                    email={job.email}
                    careersiteJobUrl={job.links.careersiteJobUrl}
                    careersiteJobApplyUrl={job.links.careersiteJobApplyUrl}
                    favouriteIconActive={this.checkIfFavouriteExists(job.id)}
                    toggleFavourite={this.toggleFavourite.bind(this)}
                    isExpanded={job.isExpanded}
                    toggleExpandJob={this.toggleExpandJob.bind(this)}
                  >
                  </Job>
                )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
 
export default JobsIndex;