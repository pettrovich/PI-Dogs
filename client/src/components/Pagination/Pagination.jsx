import React from "react";

export default function Pagination ({cardsPerPage,allDogs,pagination,activePage}) {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allDogs.length/cardsPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            {pageNumbers?.map(number => {
                let active = (activePage === number);
                return (
                    <button className={active ? 'active' : 'inactive'} onClick={() => pagination(number)}>
                        {number}
                    </button>
                )})}
        </nav>
    )
}