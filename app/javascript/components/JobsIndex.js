import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom'
import Job from './Job'
import Search from './Search'
import Favourites from './Favourites/Favourites'


class JobsIndex extends Component {
  state = {
    jobsIndexPath: `http://localhost:3000?`,
    favouritesIndexPath: `/favourites`,
    teamtailorJobs: [],
    teamtailorJobsFiltered: null,
    search: "",
    csrfToken: null,
    searchPlaceholderText: "Search for your dream role",
    favouritedJobIds: []
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
        email: job.attributes["mailbox"],
        links: {
          careersiteJobUrl: job.links["careersite-job-url"],
          careersiteJobApplyUrl: job.links["careersite-job-apply-url"]
        }
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
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
  }

  checkIfFavouriteExists(jobId) {
    return this.state.favouritedJobIds.includes(jobId)
  }

  async filterJobs(event) {
    await this.setState({search: event.target.value})
  }

  render() {
    const { teamtailorJobs, search, searchPlaceholderText} = this.state;
    const teamtailorJobsFiltered = teamtailorJobs.filter(job =>
      job.title.toLowerCase().includes(`${this.state.search.toLowerCase()}`)
    )

    return (
      <React.Fragment>
        <section className="hero is-medium hero-image">
          <div className="hero-body">
            <div className="container has-text-centered u-transition-all-1s" data-controller="homepage-search-position" data-target="homepage-search-position.centralContainer">
              <img className="hero-logo" src="https://ember.cdn.teamtailor.com/ember-production/assets/images/teamtailor-logo-f442e875406f0a21cddfe9f211283b92.svg"></img>
              <div className="columns">
                <div className="column is-paddingless"></div>
                <div className="column is-two-fifths" data-controller="algolia-places">
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
                      className="bu-prev-element-margin-b-counter c-autocomplete-results-container"
                      data-target="algolia-places.resultsContainer homepage-search-position.resultsContainer ">
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
                <div className="column is-three-fifths is-offset-one-fifth">
                  <div className="tags" data-controller="tags departments">
                    <div className="field is-grouped is-grouped-multiline" data-target="departments.tagsContainer">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container"  data-controller="add-favourite" data-target="jobs-index.container add-favourite.container" data-url="favourites_path">
              <div className="columns">
                <div className="column is-three-fifths is-offset-one-fifth">
                  {teamtailorJobsFiltered && teamtailorJobsFiltered.map((job, index) =>
                    <Job
                      key={index}
                      jobId={job.id}
                      title={job.title}
                      pitch={job.pitch}
                      email={job.email}
                      favouriteIconActive={this.checkIfFavouriteExists(job.id)}
                      toggleFavourite={this.toggleFavourite.bind(this)}
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