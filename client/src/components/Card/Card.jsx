import React from "react";
import {Link} from 'react-router-dom';
import "./Card.css";

export default function Card({id,name, image, temperaments, weight}) {
    const temperamentList = temperaments.map(temperament => <button key={temperament}>{temperament}</button>);
    return (
        <Link to={`/detail/${id}`} style={{textDecoration: 'none'}}>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div className='flip-card-front'>
                        <img src={image || './NOPHOTO.jpg'} alt={name} />
                        <h1>{name}</h1>
                    </div>
                    <div className="flip-card-back">
                        <h1>{name}</h1>
                        <h2>Weight: {weight}</h2>
                        <h2>Temperaments:</h2>
                        {temperamentList}
                    </div>
                </div>
            </div>
        </Link>
    );
}