import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from "react-router-dom";
import {getDogById} from '../actions';

export default function Detail() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const dog = useSelector(state => state.dog);

    useEffect(() => dispatch(getDogById(id)),[dispatch,id]);

    return (
        <div>
            <Link to='/home'><button>Regresa a la Página Principal</button></Link>
            {dog.length > 0 ?<div>
            <h1>{dog[0].name}</h1>
            {dog[0].image ? <img src={dog[0].image} alt={dog[0].name} width="400px" /> : ''}
            <h5>Weight: {dog[0].weight}</h5>
            <h5>Height: {dog[0].height}</h5>
            <h5>Lifespan: {dog[0].lifespan}</h5>
            <h5>Temperaments:</h5>
            <ul>
                {dog[0].temperaments.map(temperament => <li key={temperament}>{temperament}</li>)}
            </ul>
        </div> : <div>Loading...</div>}</div>
    );
}