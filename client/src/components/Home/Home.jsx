import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getDogs} from '../actions';
import Card from '../Card/Card';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    useEffect(() => dispatch(getDogs()),[dispatch]);
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to='/dog'>Crear nueva raza</Link>
            <h1>Henry Dogs Home</h1>
            <button onClick={e=> handleClick(e)}>refresh</button>
            <div>
                <select>
                    <option value="name-asc">Orden alfabético (ascendente)</option>
                    <option value="name-desc">Orden alfabético (descendente)</option>
                    <option value="weight-asc">Peso (ascendente)</option>
                    <option value="weight-desc">Peso (descendente)</option>
                </select>
                <select>
                    <option value="all">Todas</option>
                    <option value="api">Existentes</option>
                    <option value="db">Agregadas</option>
                </select>
                {/* filtro por temperament */}
                {allDogs?.map(dog => <Card name={dog.name}
                                           image={dog.image}
                                           temperaments={dog.temperaments}
                                           weight={dog.weight}/>)}
            </div>
        </div>
    );
}