import React, { Fragment } from 'react'

const Search = (props) => {
  const {onChange, placeholder, value} = props;
  
  return (
    <Fragment>
      <input
        className="input is-primary has-text-centered"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      >
      </input>
    </Fragment>
  )
}

export default Search