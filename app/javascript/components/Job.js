import React, { Component } from 'react';

const Job = (props) => {
  const {title} = props;
  return (
    <div className="c-job-main-section is-flex">
      <figure className="image is-128x128 u-padding-10">
        <img src="https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80"></img>
      </figure>
      <div id="c-job--right-section" className="is-flex u-padding-10">
        <div id="content" className="is-flex">
          <div id="job-title-and-description">
            <h1 className="title is-4">{title}</h1>
            <h2 className="subtitle is-5">Pitch</h2>
          </div>
          <div id="icons">
            <span className="icon has-text-grey-dark">
              <a href = "mailto:abc@example.com">
                <i className="fas fa-lg fa-envelope"></i>
              </a>
            </span>
            <span
              className="icon has-text-grey-dark u-pointer"
              data-action="click->add-favourite#toggleFavourite"
              data-target="add-favourite.button"
              data-job-id="1"
            >
              <i className="fas fa-lg fa-heart"></i>
            </span>
          </div>
        </div>
        <div id="footer" className="is-flex">
          <div className="buttons">
            <button className="button is-small is-primary is-rounded">View</button>
            <button className="button is-small is-secondary is-rounded">Visit</button>
            <button className="button is-small is-link is-rounded">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Job;