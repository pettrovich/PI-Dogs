import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRefresh, faSearch, faCaretDown, faPaw} from '@fortawesome/free-solid-svg-icons';

import "./NavBar.css";
import {filter, getDogs, getDogsByName, orderBy} from '../../actions';

export default function NavBar ({pagination,page}) {
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
        setDataOrigin('all');
        setTemperament('all');
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

    function changeFilters () {
        document.getElementById('FilterMenu').style.display = "block";
    }

    function handleFilter (origin, temperament) {
        setDataOrigin(origin);
        setTemperament(temperament);
        dispatch(filter(origin,temperament));
        pagination(1);
    }

    return (
        <div>
            <div className='topnav'>
                <Link to='/home'>
                {page==='home' ?
                <span className='active' onClick={handleRefresh}>
                    Home <FontAwesomeIcon icon={faRefresh} />
                </span> :
                <span>Home</span> 
                }</Link>
                {page==='home' && <span className='dropdown active'>
                    Order By <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown-content" onClick={handleOrder}>
                        <span className={order==="name-asc" ? 'active' : 'inactive'} value="name-asc">Name (A to Z)</span>
                        <span className={order==="name-desc" ? 'active' : 'inactive'} value="name-desc">Name (Z to A)</span>
                        <span className={order==="weight-asc" ? 'active' : 'inactive'} value="weight-asc">Weight (ascending)</span>
                        <span className={order==="weight-desc" ? 'active' : 'inactive'}value="weight-desc">Weight (descending)</span>
                    </div>
                </span>}
                {page==='home' && <span className='dropdown2 active'>
                    Filter <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown2-content" onClick={changeFilters}>
                        <span value="temperament">By Temperament</span>
                        <span value="data-origin">By Data Origin</span>
                    </div>
                </span>}
                {page==='home' && <div id='FilterMenu' className='modal'>
                    <div className='modal-content'>
                        <div>
                        <button
                            className='close'
                            onClick={() => 
                            document.getElementById('FilterMenu').style.display = "none"}>
                                X
                        </button>
                        <label>Data Origin: </label>
                        <button className={dataOrigin==="all" ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleFilter('all',temperament)
                                }}>Show all</button>
                        <button className={dataOrigin==="api" ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleFilter('api',temperament);
                                }}>The Dog API</button>
                        <button className={dataOrigin==="db" ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleFilter('db',temperament);
                                }}>New Database</button>
                        </div><div><FontAwesomeIcon icon={faPaw} /> <FontAwesomeIcon icon={faPaw} /> <FontAwesomeIcon icon={faPaw} /></div><div>
                        <label>Temperament: </label>
                        <button className={temperament==='all' ? 'active' : 'inactive'}
                                onClick={() => {
                                    handleFilter(dataOrigin,'all');
                                }}>Show all</button>
                        {allTemperaments?.map(t => (
                            <button key={t}
                                    className={temperament === t ? 'active' : 'inactive'}
                                    onClick={() => {
                                        handleFilter(dataOrigin,t);
                                    }}>
                                    {t}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>}
                {page==='detail' && <span className='active'>Detail View</span>}
                <Link to='/new_dog'><span className={page==='new' ? 'active' : 'inactive'}>Create New</span></Link>
                {page==='home' && <div className='search-container'>
                    <input id='search' name='search' type='text'
                           placeholder='Search..' onChange={handleInputChange}/>
                    <button id='submit' type='submit' onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>}
            </div>
        </div>
    );
}