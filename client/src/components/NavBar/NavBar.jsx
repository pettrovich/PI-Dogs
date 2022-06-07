import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getDogsByName} from '../actions';
import {Link} from 'react-router-dom';
import "./NavBar.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export default function NavBar () {
    const [name,setName] = useState('');
    const dispatch = useDispatch();

    function handleInputChange (e) {
        setName(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getDogsByName(name));
        document.getElementById('search').value='';
    }

    return (
        <div>
            <div className='topnav'>
                <Link to='/home'><span className='active'>Home</span></Link>
                <Link to='/new_dog'><span>Create New</span></Link>
                <Link to='/detail/1'><span>Detail View</span></Link>
                {/* <h3>Henry Dogs Full Breed Catalog</h3> */}
                {/* <input type='text' placeholder='Search...' />
                <button type='submit'><i className='fa fa-search'></i></button> */}
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