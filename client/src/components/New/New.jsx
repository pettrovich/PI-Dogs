import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {getTemperaments, postDog} from "../actions";

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
        runValidation();
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
        let invalidWeight = input.weight_min < 0 || input.weight_max < 0 ||
            (input.weight_min.length === 0 && input.weight_max.length === 0) ||
            (input.weight_max.length > 0 && input.weight_min >= input.weight_max);
        let invalidHeight = input.height_min < 0 || input.height_max < 0 ||
            (input.height_min.length === 0 && input.height_max.length === 0) ||
            (input.height_max.length > 0 && input.height_min >= input.height_max);
        let invalidLifespan = input.lifespan_min < 0 || input.lifespan_max < 0 ||
            (input.lifespan_max.length > 0 && input.lifespan_min >= input.lifespan_max);

        if (invalidName) setError(<p>No se puede crear una raza sin nombre.</p>);
        else if (invalidWeight) setError(<p>No se ingresó un valor válido para el peso.</p>);
        else if (invalidHeight) setError(<p>No se ingresó un valor válido para la altura.</p>);
        else if (invalidLifespan) setError(<p>No se ingresó un valor válido para los años de vida.</p>);
        else setError(false);
    }

    function handleSubmit (e) {
        e.preventDefault();
        const {name, weight, height, lifespan, temperaments} =  input;
        dispatch(postDog({name, weight, height, lifespan, temperaments}).then(alert('¡Nueva raza creada!')));
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
        lifespan = `, Años de Vida: ${input.lifespan}`;
    }
    else if (input.lifespan_max.length === 0) {
        input.lifespan = input.lifespan_min;
        lifespan = `, Años de Vida: ${input.lifespan}`;
    }
    else {
        input.lifespan = `${input.lifespan_min} - ${input.lifespan_max}`;
        lifespan = `, Años de Vida: ${input.lifespan}`;
    }

    let temperaments = "";
    if (input.temperaments.length>0) {
        temperaments = ", Temperamentos: "
        input.temperaments.forEach((temperament, index) => {
             temperaments += (index > 0 ? ', ' : '') + temperament;
        });
    }

    let preview = `Nombre: ${input.name}, Peso: ${input.weight} kg, Altura: ${input.height} cm` +
                  `${lifespan}${temperaments}`;

    let validation = <div id='validation'>{error || preview}</div>;

    return (
        <div>
            <Link to='/home'><button>Regresa a la Página Principal</button></Link>
            <h2>Creación de Nuevas Razas</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Nombre*: </label>
                    <input type='text' id='name' value={input.name} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor='weight'>Peso*: </label>
                    <input type='number' placeholder='min' id='weight_min' value={input.weight_min} onChange={handleChange}></input>
                    <input type='number' placeholder='max' id='weight_max' value={input.weight_max} onChange={handleChange}></input>
                    (kg)
                </div>
                <div>
                    <label htmlFor='height'>Altura*: </label>
                    <input type='number' placeholder='min' id='height_min' value={input.height_min} onChange={handleChange}></input>
                    <input type='number' placeholder='max' id='height_max' value={input.height_max} onChange={handleChange}></input>
                    (cm)
                </div>
                <div>
                    <label htmlFor='lifespan'>Años de Vida: </label>
                    <input type='number' placeholder='min' id='lifespan_min' value={input.lifespan_min} onChange={handleChange}></input>
                    <input type='number' placeholder='max' id='lifespan_max' value={input.lifespan_max} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor='temperaments'>Temperamento: </label>
                    <select name='temperaments' onChange={handleSelect}>
                        <option key='none' value='none'>Ninguno</option>
                        {allTemperaments?.map(temperament => <option key={temperament} value={temperament}>{temperament}</option>)}
                    </select>
                </div>
                <div>
                    <p>(*) Valores obligatorios</p>
                </div>
                <button type='submit' disabled={error}>Crear</button>
            </form>
            {validation}
        </div>
    );
}