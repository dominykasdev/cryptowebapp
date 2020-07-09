import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import CryptoList from "./cryptoList";
import Header from "./headerComponents/header";
import MainMenu from "./MainMenu";
import userProfile from "./userProfileComponents/userProfile";
import userHoldings from './userHoldingsComponents/userHoldings';
import addHoldingForm from './userHoldingsComponents/addHoldingForm';
import pageNotFound from './pageNotFound';

const App = () => {
  // console.log(history);
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <MainMenu />
          <Switch>
            <Route path="/projects/crypto_app/" exact component={CryptoList} />
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
