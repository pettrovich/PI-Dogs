import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRefresh, faSearch, faCaretDown} from '@fortawesome/free-solid-svg-icons';

import "./NavBar.css";
import {getDogs,getDogsByName,orderBy} from '../actions';

export default function NavBar ({pagination}) {
    const [name,setName] = useState('');
    const [order,setOrder] = useState('');
    const dispatch = useDispatch();

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
                <Link to='/new_dog'><span>Create New</span></Link>
                {/* <span>
                    Detail View <FontAwesomeIcon icon={faCaretDown} />
                </span>
                <Link to='/detail/1'>
                    <div className="dropdown-content">
                        <span>Link 1</span>
                        <span>Link 2</span>
                        <span>Link 3</span>
                    </div>
                </Link> */}
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