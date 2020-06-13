// Run this example by adding <%= javascript_pack_tag 'index.jsx' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import JobsIndex from '../components/JobsIndex'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <JobsIndex />,
    document.body.appendChild(document.createElement('div')),
  )
})
