import React from 'react';
import loaderImg from '../images/loader.gif';
import '../styles/common.css';

export default function() {
    return (
        <div class="loader-container">
            <div class="loader-inner-container">
                This is loader
                <img src={loaderImg} alt="loader" />
            </div>
        </div>
    );
}
