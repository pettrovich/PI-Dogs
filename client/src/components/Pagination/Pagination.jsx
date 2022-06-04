import React from "react";

export default function Pagination ({dogsPerPage,allDogs,pagination}) {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allDogs.length/dogsPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            <ul>
                {pageNumbers?.map(number => (
                    <li key={'page_'+number}>
                        <button onClick={() => pagination(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}