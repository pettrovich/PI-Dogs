import React from 'react';
import {Link} from 'react-router-dom';
import "./Landing.css";

export default function LandingPage() {
    return (
        <div className='splash'>
            <h1>Welcome to Henry Dogs</h1>
            <Link to='/home'>
                <button className='button'>START</button>
            </Link>
        </div>
    );
}