import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';

import "./Home.css";
import {getDogs} from '../actions';
        
        import {getTemperaments,filterByTemperament,filterByDataOrigin} from '../actions';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogsView);
    useEffect(() => {
        dispatch(getDogs());
        setCurrentPage(1);
        dispatch(getTemperaments());},[dispatch]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [update, setUpdate] = useState(0);
    const [cardsPerPage/*, setCardsPerPage*/] = useState(8);
    const lastIndex = currentPage*cardsPerPage;
    const firstIndex = lastIndex - cardsPerPage;
    const currentDogs = allDogs.slice(firstIndex,lastIndex);

    function pagination (pageNumber) {
        setCurrentPage(pageNumber);
        setUpdate(update => update+1);
    }

            const allTemperaments = useSelector(state => state.temperaments);

            function handleTemperamentFilter (e) {
                dispatch(filterByTemperament(e.target.value));
                setCurrentPage(1);
            }

            function handleDataOriginFilter (e) {
                dispatch(filterByDataOrigin(e.target.value));
                setCurrentPage(1);
            }

    return (
            <div>
            {console.log(update)}
            <NavBar pagination={pagination}/>
            <div className='cards'>
                {currentDogs?.map(dog => <Card key={dog.id}
                                            id={dog.id}
                                            name={dog.name}
                                            image={dog.image}
                                            temperaments={dog.temperaments}
                                            weight={dog.weight}/>)}
            </div>
            <Pagination cardsPerPage={cardsPerPage} allDogs={allDogs} pagination={pagination} activePage={currentPage}/>

                        <select onChange={e => handleTemperamentFilter(e)}>
                            <option value="all">All Temperaments</option>
                            {allTemperaments?.map(temperament => <option key={temperament} value={temperament}>{temperament}</option>)}
                        </select>
                        <select onChange={e => handleDataOriginFilter(e)}>
                            <option value="all">Todas las Razas</option>
                            <option value="api">Existentes</option>
                            <option value="db">Agregadas</option>
                        </select>
            </div>
    );
}