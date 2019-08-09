import React from 'react';
import { connect } from 'react-redux';
import { resetError } from '../actions/commonActions';
// import { bindActionCreators } from 'redux';

const ErrorBar = (props) => {
    const error = props.error;
    if (!error || !error.message) {
        return null;
    }
    return (
        <div className="error-bar error">
            <span>{error.message}</span>
            <button className="custom-button pull-right" onClick={() => props.resetError()}>&times;</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    // debugger
    return {
       error: state.common.error
    }
}

const mapDispatchToProps = {
    resetError
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ErrorBar);

export default connectedComponent;

