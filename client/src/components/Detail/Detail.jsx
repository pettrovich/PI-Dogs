import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";

import {getDogById} from '../actions';
import NavBar from "../NavBar/NavBar";
import './Detail.css';

export default function Detail() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const dog = useSelector(state => state.dog);

    useEffect(() => dispatch(getDogById(id)),[dispatch,id]);

    return (
        <div>
            <NavBar page={'detail'} />
            {dog.length > 0 ?
            <div className='details'>
                {dog[0].image ? <img src={dog[0].image} alt={dog[0].name}/> : ''}
                <div className='box'>
                    <h1>{dog[0].name}</h1>
                    <h5>Weight: {dog[0].weight}</h5>
                    <h5>Height: {dog[0].height}</h5>
                    <h5>Lifespan: {dog[0].lifespan}</h5>
                    <h5>Temperaments:</h5>
                    {dog[0].temperaments.map(temperament => (
                        <span className='temperament' key={temperament}>
                            {temperament}
                        </span>
                    ))}
                </div>
            </div> : <div className="loader"></div>}
        </div>
    );
}