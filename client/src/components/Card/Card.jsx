import React from "react";

export default function Card({name, image, temperaments, weight}) {
    const temperamentList = temperaments.map(temperament => <li key={temperament}>{temperament}</li>);
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name} width="250px" />
            <h5>{weight}</h5>
            <h5>Temperaments:</h5>
            <ul>{temperamentList}</ul>
        </div>
    );
}