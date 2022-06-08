import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getDogs,getDogsByName} from '../actions';
import {Link} from 'react-router-dom';
import "./NavBar.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRefresh, faSearch, faCaretDown} from '@fortawesome/free-solid-svg-icons';

export default function NavBar ({pagination}) {
    const [name,setName] = useState('');
    const dispatch = useDispatch();

    function handleInputChange (e) {
        setName(e.target.value);
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

    return (
        <div>
            <div className='topnav'>
                <Link to='/home'><span className='active' onClick={handleRefresh}>
                            Home <FontAwesomeIcon icon={faRefresh} />
                </span></Link>
                <Link to='/new_dog'><span>Create New</span></Link>
                <Link to='/detail/1'><span>
                    Detail View <FontAwesomeIcon icon={faCaretDown} />
                </span></Link>
                <div class='search-container'>
                    <input id='search' name='search' type='text'
                           placeholder='Search..' onChange={handleInputChange}/>
                    <button type='submit' onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>
    );
}