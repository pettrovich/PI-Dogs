import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import {getTemperaments, postDog} from "../../actions";
import NavBar from "../NavBar/NavBar";
import "./New.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaw} from '@fortawesome/free-solid-svg-icons';

export default function New() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState ({
        name: '',
        weight_min: '',
        weight_max: '',
        weight: '',
        height_min: '',
        height_max: '',
        height: '',
        lifespan_min: '',
        lifespan_max: '',
        lifespan: '',
        temperaments: []
    });
    const [error, setError] = useState ([' ']);
    const allTemperaments = useSelector(state => state.temperaments);
    const [update, setUpdate] = useState(0);

    useEffect(() => dispatch(getTemperaments()),[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }

    function handleSelect(e) {
        if (input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: input.temperaments.filter(temperament => temperament !== e.target.value)
            });
        }
        else setInput({
            ...input,
            temperaments: [...input.temperaments,e.target.value]
        });
        setUpdate (update => update+1);
    }

    function runValidation() {
        const err = []; 
        if (input.name.length === 0) err.push(<span className='required' key="name"> The name field can't be empty.</span>);
        if (parseInt(input.weight_min) < 0 || parseInt(input.weight_max) < 0 ||
            (input.weight_min.length === 0 && input.weight_max.length === 0) ||
            (input.weight_max.length > 0 && parseInt(input.weight_min) >= parseInt(input.weight_max)))
            err.push(<span className='required' key="weight"> The value for Weight is not valid.</span>);
        if (parseInt(input.height_min) < 0 || parseInt(input.height_max) < 0 ||
            (input.height_min.length === 0 && input.height_max.length === 0) ||
            (input.height_max.length > 0 && parseInt(input.height_min) >= parseInt(input.height_max)))
            err.push(<span className='required' key="height"> The value for Height is not valid.</span>);
        if (parseInt(input.lifespan_min) < 0 || parseInt(input.lifespan_max) < 0 ||
            (input.lifespan_max.length > 0 && parseInt(input.lifespan_min) >= parseInt(input.lifespan_max)))
            err.push(<span className='required' key="lifespan"> The value for Lifespan is not valid.</span>);
        setError(err.length>0 ? err : false);
    }

    function handleSubmit (e) {
        e.preventDefault();
        const {name, weight, height, lifespan, temperaments} =  input;
        dispatch(postDog({name, weight, height, lifespan, temperaments}));
        alert('¡New breed added to the database!');
        navigate("/home");
    }

    if (input.weight_min.length === 0) input.weight = `${input.weight_max} kg`;
    else if (input.weight_max.length === 0) input.weight = `${input.weight_min} kg`;
    else input.weight = `${input.weight_min} - ${input.weight_max} kg`;

    if (input.height_min.length === 0) input.height = `${input.height_max} cm`;
    else if (input.height_max.length === 0) input.height = `${input.height_min} cm`;
    else input.height = `${input.height_min} - ${input.height_max} cm`;

    if (input.lifespan_min.length === 0 && input.lifespan_max.length === 0) input.lifespan = '';
    else if (input.lifespan_min.length === 0) input.lifespan = `${input.lifespan_max} years`;
    else if (input.lifespan_max.length === 0) input.lifespan = `${input.lifespan_min} years`;
    else input.lifespan = `${input.lifespan_min} - ${input.lifespan_max} years`;
    console.log(update);

    return (
        <div>
            <NavBar page={'new'} />
            <div className='box2'>
                <h1>Create a new breed</h1>
                <form className='form1' onClick={handleChange} onSubmit={handleSubmit}>
                <div className='formdiv'>
                    <label htmlFor='name'>Name <span className='required'>*</span>: </label>
                    <input type='text' id='name' value={input.name} onChange={handleChange} onBlur={runValidation}></input>
                </div>
                <div>
                    <label htmlFor='weight'>Weight <span className='required'>*</span>(kg): </label>
                    <input type='number' placeholder='min' id='weight_min' value={input.weight_min} onChange={handleChange} onBlur={runValidation}></input>
                    <input type='number' placeholder='max' id='weight_max' value={input.weight_max} onChange={handleChange} onBlur={runValidation}></input>
                    
                </div>
                <div>
                    <label htmlFor='height'>Height <span className='required'>*</span>(cm): </label>
                    <input type='number' placeholder='min' id='height_min' value={input.height_min} onChange={handleChange} onBlur={runValidation}></input>
                    <input type='number' placeholder='max' id='height_max' value={input.height_max} onChange={handleChange} onBlur={runValidation}></input>
                </div>
                <div>
                    <label htmlFor='lifespan'>Lifespan (years): </label>
                    <input type='number' placeholder='min' id='lifespan_min' value={input.lifespan_min} onChange={handleChange} onBlur={runValidation}></input>
                    <input type='number' placeholder='max' id='lifespan_max' value={input.lifespan_max} onChange={handleChange} onBlur={runValidation}></input>
                </div>
                <div>
                    <label>Temperaments:</label>{
                        input.temperaments.length > 0 ?
                        input.temperaments.map(t => <button key={t} onClick={e => e.preventDefault()}>{t}</button>)
                        : ' None'
                    }
                </div>
                <div>
                    <label htmlFor='temperaments'>Add/Remove a Temperament: </label>
                    <select name='temperaments' value={0} onChange={handleSelect}>
                        <option key='none' value='none'>None</option>
                        {allTemperaments?.map(temperament => <option key={temperament} value={temperament}>{temperament}</option>)}
                    </select>
                </div>
                <p>(<span className='required'>*</span>) Required fields</p>
                {error || <button type='submit'>Crear</button>}
                <div><FontAwesomeIcon icon={faPaw} /> <FontAwesomeIcon icon={faPaw} /> <FontAwesomeIcon icon={faPaw} />
                </div>
                </form>
            </div>
        </div>
    );
}