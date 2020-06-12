import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom'
import Job from './Job'
import Search from './Search'
import Favourites from './Favourites/Favourites'


class JobsIndex extends Component {
  state = {
    jobsIndexPath: `http://localhost:3000?`,
    teamtailorJobs: [],
    teamtailorJobsFiltered: null,
    search: "",
    searchPlaceholderText: "Search for your dream role"
  };

  componentDidMount() {
    this.executeRequest("jobs")
  }

  async executeRequest(type) {
    await fetch(this.state.jobsIndexPath + new URLSearchParams({
      type: type
    }),
    { headers: { accept: "application/json" }})
      .then((response) => response.json())
      .then(data => this.setState({ teamtailorJobs: data.data.map((job) => ({
        id: job.id,
        title: job.attributes["title"],
        pitch: job.attributes["pitch"],
        email: job.attributes["mailbox"],
        links: {
          careersiteJobUrl: job.links["careersite-job-url"],
          careersiteJobApplyUrl: job.links["careersite-job-apply-url"]
        }
      })) }))
  }

  async filterJobs(event) {
    await this.setState({search: event.target.value})
    // this.setState({teamtailorJobsFiltered: this.state.teamtailorJobs.filter(item => item.title.toLowerCase().includes(`${this.state.search.toLowerCase()}`))})
  }

  render() {
    const { teamtailorJobs} = this.state;
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
                          placeholder={this.state.searchPlaceholderText}
                          value={this.state.search}>
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
                      id={job.id}
                      title={job.title}
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