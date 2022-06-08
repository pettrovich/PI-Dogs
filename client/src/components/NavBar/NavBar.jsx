import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRefresh, faSearch, faCaretDown} from '@fortawesome/free-solid-svg-icons';

import "./NavBar.css";
import {filterByDataOrigin, filterByTemperament, getDogs, getDogsByName, orderBy} from '../actions';

export default function NavBar ({pagination}) {
    const [name,setName] = useState('');
    const [order,setOrder] = useState('');
    const [dataOrigin,setDataOrigin] = useState('all');
    const [temperament,setTemperament] = useState('all');
    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);

    function handleInputChange (e) {
        setName(e.target.value);
        e.target.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') document.getElementById('submit').click();});
    }

    function handleRefresh (e) {
        dispatch(getDogs());
        pagination(1);
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getDogsByName(name));
        document.getElementById('search').value='';
        pagination(1);
    }

    function handleOrder (e) {
        dispatch(orderBy(e.target.getAttribute('value')));
        setOrder(e.target.getAttribute('value'));
        pagination(1);
    }

    
    function handleFilters (e) {
        if (e.target.getAttribute('value') === 'data-origin')
            document.getElementById('dataOriginFilter').style.display = "block";
        else document.getElementById('temperamentFilter').style.display = "block";
    }

    function handleDataOriginFilter (origin) {
        setDataOrigin(origin);
        dispatch(filterByDataOrigin(origin));
        pagination(1);
    }

    function handleTemperamentFilter (temperament) {
        setTemperament(temperament);
        dispatch(filterByTemperament(temperament));
        pagination(1);
    }

    return (
        <div>
            <div className='topnav'>
                <Link to='/home'><span className='active' onClick={handleRefresh}>
                    Home <FontAwesomeIcon icon={faRefresh} />
                </span></Link>
                <span className='dropdown active'>
                    Order By <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown-content" onClick={handleOrder}>
                        <span className={order==="name-asc" ? 'active' : 'inactive'} value="name-asc">Name (A to Z)</span>
                        <span className={order==="name-desc" ? 'active' : 'inactive'} value="name-desc">Name (Z to A)</span>
                        <span className={order==="weight-asc" ? 'active' : 'inactive'} value="weight-asc">Weight (ascending)</span>
                        <span className={order==="weight-desc" ? 'active' : 'inactive'}value="weight-desc">Weight (descending)</span>
                    </div>
                </span>
                <span className='dropdown2 active'>
                    Filter <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown2-content" onClick={handleFilters}>
                        <span value="temperament">By Temperament</span>
                        <span value="data-origin">By Data Origin</span>
                    </div>
                </span>
                <div id='dataOriginFilter' className='modal'>
                    <div className='modal-content'>
                        <button className={dataOrigin==="all" ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleDataOriginFilter('all')
                                }}>Show all</button>
                        <button className={dataOrigin==="api" ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleDataOriginFilter('api');
                                }}>The Dog API</button>
                        <button className={dataOrigin==="db" ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleDataOriginFilter('db');
                                }}>New Database</button>
                        <button
                            className='close'
                            onClick={() => 
                            document.getElementById('dataOriginFilter').style.display = "none"}>
                                X
                        </button>
                    </div>
                </div>
                <div id='temperamentFilter' className='modal2'>
                    <div className='modal-content'>
                        <button className={temperament==='all' ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleTemperamentFilter('all');
                                }}>Show all</button>
                        {allTemperaments?.map(t => (
                            <button key={t}
                                    className={temperament === t ? 'active' : 'inactive'}
                                    onClick={() => {
                                        handleTemperamentFilter(t);
                                    }}>
                                    {t}
                            </button>
                        ))}
                        <button
                            className='close'
                            onClick={() => 
                            document.getElementById('temperamentFilter').style.display = "none"}>
                                X
                        </button>
                    </div>
                </div>

                <Link to='/new_dog'><span>Create New</span></Link>
                <div className='search-container'>
                    <input id='search' name='search' type='text'
                           placeholder='Search..' onChange={handleInputChange}/>
                    <button id='submit' type='submit' onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>
    );
}