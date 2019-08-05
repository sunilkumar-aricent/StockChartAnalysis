import React from 'react';
// import loaderImg from '../images/loader.gif';
import loaderImg from '../images/logo.svg';
import '../styles/common.css';

export default function() {
    return (
        <div class="loader-container">
            <div class="loader-inner-container">
                <img className="img-spinner" src={loaderImg} alt="loader" />
            </div>
        </div>
    );
}
