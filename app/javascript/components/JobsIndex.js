import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Job from './Job'
import Favourites from './Favourites/Favourites'


const JobsIndex = () => {
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
                      <input
                        className="input is-primary has-text-centered"
                        placeholder="Search for your dream role"
                        data-target="jobs-index.searchInput"
                        data-request-path="/location_search"
                        data-action="keyup->jobs-index#searchHandler"
                        type="text"
                        name="location"
                        id="location">
                      </input>
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
            <Job />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default JobsIndex