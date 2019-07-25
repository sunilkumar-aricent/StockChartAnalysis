import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Company from './company';
import Loader from './components/loader';

function App({ common }) {
  return (
    <div className="App">
      {common.showLoader && <Loader />} 
      <Company />
    </div>
  );
}

// export default App;

const mapStateToProps = (state) => ({ common: state.common });

export default connect(mapStateToProps, null)(App);
