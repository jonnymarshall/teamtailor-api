import React, { Component } from 'react';

const FavouriteToggle = (props) => {
  const { onClick, displayingFavouriteJobs } = props;


  const activeButtonClass = (bool) => {
    return displayingFavouriteJobs == bool ? "is-primary" : null
  }

  return(
    <div className="buttons is-pulled-right has-addons">
      <button
        className={`button ${activeButtonClass(false)} is-selected`}
        onClick={() => onClick(false)}
        title="View all jobs"
      >
      All
      </button>
      <button
        className={`button ${activeButtonClass(true)}`}
        onClick={() => onClick(true)}
        title="View favourited jobs"
      >
        Favourites
      </button>
    </div>
  )
}
export default FavouriteToggle;