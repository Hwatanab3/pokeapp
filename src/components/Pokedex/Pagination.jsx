import React from 'react'

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate, currentPage }) => {

    const pageNumbers = [];

    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    const handleStart = e => {
        e.preventDefault();
        paginate(1)
    }

    const handlePlus = e => {
        e.preventDefault();
        if (currentPage < totalPages) {
            paginate(currentPage + 1)
        }
    }

    const handleLess = e => {
        e.preventDefault();
        if (currentPage > 1) {
            paginate(currentPage - 1)
        }
    }

    const handleEnd = e => {
        e.preventDefault();
        paginate(totalPages)
    }

    return (
        <nav>
            <ul className='pagination'>
                <button onClick={handleStart} className='pagination__btn'> <ion-icon name="play-back-outline"></ion-icon> </button>
                <button onClick={handleLess} className='pagination__btn'><ion-icon name="play-skip-back-outline"></ion-icon></button>
                {pageNumbers.map(number => (
                    <li key={number} className='pagination__item'>
                        <button onClick={e => {
                            e.preventDefault();
                            paginate(number);
                        }} href="/#/pokedex" className='page__link'>
                            {number}
                        </button>
                    </li>
                ))}
                <button onClick={handlePlus} className='pagination__btn'><ion-icon name="play-skip-forward-outline"></ion-icon></button>
                <button onClick={handleEnd} className='pagination__btn'> <ion-icon name="play-forward-outline"></ion-icon> </button>
            </ul>
        </nav>
    )
}

export default Pagination;