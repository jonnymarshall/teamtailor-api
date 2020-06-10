import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Jobs from './Jobs/Jobs'
import Job from './Job/Job'
import Favourites from './Favourites/Favourites'


const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Jobs }></Route>
      <Route exact path="/jobs/:id" component={ Job }></Route>
      <Route exact path="/favourites" component={Favourites}></Route>
    </Switch>
  );
}

export default App