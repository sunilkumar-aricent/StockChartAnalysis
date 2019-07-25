import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navigation from './components/Navigation';
import Company from './company';
import Loader from './components/loader';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ common }) {
  return (
    <div className="App">
      {common.showLoader && <Loader />} 
      <Navigation />
      <Company />
    </div>
  );
}

// export default App;

const mapStateToProps = (state) => ({ common: state.common });

export default connect(mapStateToProps, null)(App);
