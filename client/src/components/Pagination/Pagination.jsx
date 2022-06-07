import React from "react";

export default function Pagination ({dogsPerPage,allDogs,pagination}) {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allDogs.length/dogsPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            {pageNumbers?.map(number => <button onClick={() => pagination(number)}>{number}</button>)}
        </nav>
    )
}