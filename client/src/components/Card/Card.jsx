import React from "react";
import {Link} from 'react-router-dom';

export default function Card({id,name, image, temperaments, weight}) {
    const temperamentList = temperaments.map(temperament => <li key={temperament}>{temperament}</li>);
    return (
        <Link to={`/detail/${id}`}><div>
            <h3>{name}</h3>
            {image ? <img src={image} alt={name} width="250px" /> : ''}
            <h5>{weight}</h5>
            <h5>Temperaments:</h5>
            <ul>{temperamentList}</ul>
        </div></Link>
    );
}