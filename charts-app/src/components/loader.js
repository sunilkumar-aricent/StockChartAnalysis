import React from 'react';
import loaderImg from '../images/loader.gif';
import '../styles/common.css';

export default function() {
    return (
        <div class="loader-container">
            <img src={loaderImg} alt="loader" />
        </div>
    );
}
