import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navigation from './common/components/Navigation';
import Company from './company';
import Watchlist from './watchlist';
import Comparision from './comparision';
import Loader from './common/components/loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ErrorBar from './common/components/ErrorBar';
import './common/styles/common.css';
import './common/styles/common.scss';

import { BrowserRouter, Route } from 'react-router-dom';


function App({ common }) {
  return (
    <div className="App">
      {common.showLoader && <Loader />} 
      <BrowserRouter>
        <Navigation />
        <ErrorBar />
        <div class="container">
          <Route exact path="/" component={Company} />
          <Route path="/company" component={Company} />
          <Route path="/watchlist" component={Watchlist} />
          <Route path="/comparision" component={Comparision} />
        </div>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({ common: state.common });

export default connect(mapStateToProps, null)(App);
