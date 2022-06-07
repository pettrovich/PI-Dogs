import React from 'react';
import NavBar from '../NavBar/NavBar';



        import {useEffect,useState} from 'react';
        import {useDispatch, useSelector} from 'react-redux';
        import {getDogs,getTemperaments,filterByTemperament,filterByDataOrigin,orderBy} from '../actions';
        import Card from '../Card/Card';
        import Pagination from '../Pagination/Pagination';

export default function Home() {
            const dispatch = useDispatch();
            const allDogs = useSelector(state => state.dogsView);
            const allTemperaments = useSelector(state => state.temperaments);
            const [order, setOrder] = useState('name-asc');
            const [currentPage, setCurrentPage] = useState(1);
            const [dogsPerPage/*, setDogsPerPage*/] = useState(8);
            const indexOfLast = currentPage*dogsPerPage;
            const indexOfFirst = indexOfLast - dogsPerPage;
            const currentDogs = allDogs.slice(indexOfFirst,indexOfLast);

            const pagination = (pageNumber) => {
                setCurrentPage(pageNumber);
            }

            useEffect(() => {
                dispatch(getDogs());
                dispatch(getTemperaments());},[dispatch]);

            function handleTemperamentFilter (e) {
                dispatch(filterByTemperament(e.target.value));
                setCurrentPage(1);
            }

            function handleDataOriginFilter (e) {
                dispatch(filterByDataOrigin(e.target.value));
                setCurrentPage(1);
            }

            function handleOrdering (e) {
                dispatch(orderBy(e.target.value));
                setOrder(e.target.value);
            }

    return (
            <div>
            <NavBar />
                    <div>
                        <select onChange={e => handleOrdering(e)}>
                            <option value="name-asc">Orden alfabético (ascendente)</option>
                            <option value="name-desc">Orden alfabético (descendente)</option>
                            <option value="weight-asc">Peso (ascendente)</option>
                            <option value="weight-desc">Peso (descendente)</option>
                        </select>
                        <select onChange={e => handleTemperamentFilter(e)}>
                            <option value="all">All Temperaments</option>
                            {allTemperaments?.map(temperament => <option key={temperament} value={temperament}>{temperament}</option>)}
                        </select>
                        <select onChange={e => handleDataOriginFilter(e)}>
                            <option value="all">Todas las Razas</option>
                            <option value="api">Existentes</option>
                            <option value="db">Agregadas</option>
                        </select>
                        <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs} pagination={pagination} />
                        <h5>Ordenado por {order}</h5>
                        {currentDogs?.map(dog => <Card key={dog.id}
                                                    id={dog.id}
                                                    name={dog.name}
                                                    image={dog.image}
                                                    temperaments={dog.temperaments}
                                                    weight={dog.weight}/>)}
                    </div>
            </div>
    );
}