import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getDogsByName} from '../actions'

export default function SearchBar () {
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
            <input id='search' type='text' placeholder='Buscar...' onChange={(e) => handleInputChange(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    );
}