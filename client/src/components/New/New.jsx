import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import {getTemperaments, postDog} from "../actions";
import NavBar from "../NavBar/NavBar";

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
    const [error, setError] = useState (true);
    const allTemperaments = useSelector(state => state.temperaments);

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
    }

    function runValidation() {
        const invalidName = input.name.length === 0;
        let invalidWeight = parseInt(input.weight_min) < 0 || parseInt(input.weight_max) < 0 ||
            (input.weight_min.length === 0 && input.weight_max.length === 0) ||
            (input.weight_max.length > 0 && parseInt(input.weight_min) >= parseInt(input.weight_max));
        let invalidHeight = parseInt(input.height_min) < 0 || parseInt(input.height_max) < 0 ||
            (input.height_min.length === 0 && input.height_max.length === 0) ||
            (input.height_max.length > 0 && parseInt(input.height_min) >= parseInt(input.height_max));
        let invalidLifespan = parseInt(input.lifespan_min) < 0 || parseInt(input.lifespan_max) < 0 ||
            (input.lifespan_max.length > 0 && parseInt(input.lifespan_min) >= parseInt(input.lifespan_max));

        if (invalidName) setError(<p>The name field can't be empty.</p>);
        else if (invalidWeight) setError(<p>The value for Weight is not valid.</p>);
        else if (invalidHeight) setError(<p>The value for Height is not valid.</p>);
        else if (invalidLifespan) setError(<p>The value for Lifespan is not valid.</p>);
        else setError(false);
    }

    function handleSubmit (e) {
        e.preventDefault();
        const {name, weight, height, lifespan, temperaments} =  input;
        dispatch(postDog({name, weight, height, lifespan, temperaments}));
        alert('¡New breed added to the database!');
        navigate("/home");
    }

    if (input.weight_min.length === 0) input.weight = `${input.weight_max}`;
    else if (input.weight_max.length === 0) input.weight = `${input.weight_min}`;
    else input.weight = `${input.weight_min} - ${input.weight_max}`;

    if (input.height_min.length === 0) input.height = `${input.height_max}`;
    else if (input.height_max.length === 0) input.height = `${input.height_min}`;
    else input.height = `${input.height_min} - ${input.height_max}`;

    let lifespan = "";
    if (input.lifespan_min.length === 0 && input.lifespan_max.length === 0) lifespan = "";
    else if (input.lifespan_min.length === 0) {
        input.lifespan = input.lifespan_max;
        lifespan = `, Lifespan: ${input.lifespan} years`;
    }
    else if (input.lifespan_max.length === 0) {
        input.lifespan = input.lifespan_min;
        lifespan = `, Lifespan: ${input.lifespan} years`;
    }
    else {
        input.lifespan = `${input.lifespan_min} - ${input.lifespan_max}`;
        lifespan = `, Lifespan: ${input.lifespan} years`;
    }

    let temperaments = "";
    if (input.temperaments.length>0) {
        temperaments = ", Temperaments: "
        input.temperaments.forEach((temperament, index) => {
             temperaments += (index > 0 ? ', ' : '') + temperament;
        });
    }

    let preview = `Name: ${input.name},
                   Weight: ${input.weight} kg,
                   Height: ${input.height} cm` +
                  `${lifespan}${temperaments}`;

    let validation = <div id='validation'>{error || <div><h3>Preview: </h3><p>{preview}</p></div>}</div>;

    return (
        <div>
            <NavBar page={'new'} />
            <div className='details2'>
                <div className='box0'>
                {validation}
                </div>
                <div className='box2'>
                    <h1>Create a new breed</h1>
                    <form onClick={handleChange} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name*: </label>
                        <input type='text' id='name' value={input.name} onChange={handleChange} onBlur={runValidation}></input>
                    </div>
                    <div>
                        <label htmlFor='weight'>Weight*: </label>
                        <input type='number' placeholder='min' id='weight_min' value={input.weight_min} onChange={handleChange} onBlur={runValidation}></input>
                        <input type='number' placeholder='max' id='weight_max' value={input.weight_max} onChange={handleChange} onBlur={runValidation}></input>
                        (kg)
                    </div>
                    <div>
                        <label htmlFor='height'>Height*: </label>
                        <input type='number' placeholder='min' id='height_min' value={input.height_min} onChange={handleChange} onBlur={runValidation}></input>
                        <input type='number' placeholder='max' id='height_max' value={input.height_max} onChange={handleChange} onBlur={runValidation}></input>
                        (cm)
                    </div>
                    <div>
                        <label htmlFor='lifespan'>Lifespan: </label>
                        <input type='number' placeholder='min' id='lifespan_min' value={input.lifespan_min} onChange={handleChange} onBlur={runValidation}></input>
                        <input type='number' placeholder='max' id='lifespan_max' value={input.lifespan_max} onChange={handleChange} onBlur={runValidation}></input>
                    </div>
                    <div>
                        <label htmlFor='temperaments'>Temperament: </label>
                        <select name='temperaments' onChange={handleSelect}>
                            <option key='none' value='none'>None</option>
                            {allTemperaments?.map(temperament => <option key={temperament} value={temperament}>{temperament}</option>)}
                        </select>
                    </div>
                    <p>(*) Required fields</p>
                    <button type='submit' disabled={error}>Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
}