import React, { Component } from 'react';

const Job = (props) => {
  const {jobId,
    title,
    pitch,
    body,
    email,
    toggleFavourite,
    favouriteIconActive,
    careersiteJobUrl,
    careersiteJobApplyUrl,
    image,
  } = props;

  const favouriteIconColor = favouriteIconActive == true ? "primary" : "grey-dark"

  return (
    <div id="c-job-main-section" className="is-flex">
      <figure className="image is-128x128 u-padding-10">
        <img src={image}></img>
      </figure>
      <div id="c-job--right-section" className="is-flex u-padding-10">
        <div id="content" className="is-flex">
          <div id="job-title-and-description">
            <h1 className="title is-size-4 is-size-6-mobile">{title}</h1>
            <h2 className="subtitle is-size-5 is-hidden-touch">{pitch}</h2>
            {/* <p className="subtitle is-6">{body}</p> */}
          </div>
          <div id="icons">
            <span className="icon has-text-grey-dark">
              <a href={`mailto:${email}`} target="_blank">
                <i className="fas fa-lg fa-envelope"></i>
              </a>
            </span>
            <span
              className={`icon has-text-${favouriteIconColor} u-pointer`}
              onClick={() => toggleFavourite(jobId)}
              data-target="add-favourite.button"
              data-job-id="1"
            >
              <i className="fas fa-lg fa-heart"></i>
            </span>
          </div>
        </div>
        <div id="footer" className="is-flex">
          <div className="buttons">
            <a
              href={careersiteJobUrl}
              className="button is-small is-secondary is-rounded"
              target="_blank"
            >Visit</a>
            <a
              href={careersiteJobApplyUrl}
              className="button is-small is-primary is-rounded"
              target="_blank"
            >Apply</a>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Job;