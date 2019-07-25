import React from 'react';
import { connect } from 'react-redux';

function Navigation() {
    return (
        <div class="nav-container">
            <div className="navbar navbar-expand-sm navbar-light">
                <span class="navbar-brand">Stock Analysis</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li className="nav-item">
                            <button class="btn nav-link">Company</button>
                        </li>
                        <li className="nav-item">
                            <button class="btn nav-link">Watchlist</button>
                        </li>
                        <li className="nav-item">
                            <button class="btn nav-link">Comparision</button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <div class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
}

const mapStateToProps = (state) => ({
    common: state.common
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);