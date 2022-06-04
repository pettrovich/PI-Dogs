import React from 'react';
import {Link} from 'react-router-dom';

import style from "./Landing.module.css";

export default function LandingPage() {
    return (
        <div className = {style.background}>
            <h1>Bienvenidos a Henry Dogs</h1>
            <Link to='/home'>
                <button>Entrar</button>
            </Link>
        </div>
    );
}