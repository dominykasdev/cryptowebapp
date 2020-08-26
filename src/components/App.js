import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import HomePage from './homePageComponents';
import Header from "./headerComponents/header";
import MainMenu from "./MainMenu";
import userProfile from "./userProfileComponents/userProfile";
import userHoldings from './userHoldingsComponents/userHoldings';
import addHoldingForm from './userHoldingsComponents/addHoldingForm';
import pageNotFound from './pageNotFound';
import pieChart from './homePageComponents/pieChart';

const App = () => {
  // console.log(history);
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <MainMenu />
          <Switch>
            <Route path="/projects/crypto_app/" exact component={HomePage} />
            <Route path="/projects/crypto_app/chart" exact component={pieChart} />
            <Route path="/projects/crypto_app/profile" exact component={userProfile} />
            <Route path="/projects/crypto_app/holdings" exact component={userHoldings} />
            <Route path="/projects/crypto_app/holdings/add" exact component={addHoldingForm} />
            <Route component={pageNotFound} />
          </Switch>
        </div>

      </Router>

    </div>
  );
};

export default App;
