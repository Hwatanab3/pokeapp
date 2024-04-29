import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import "./styles/pokedex.css"
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/Pokedex/PokeCard';
import PokeSelect from '../components/Pokedex/PokeSelect';
import Pagination from '../components/Pokedex/Pagination.jsx';
import PokeLoader from './PokeLoader';
import PokeMusic from './utils/PokeMusic.jsx';

const Pokedex = () => {

    const [selectValue, setSelectValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(14)

    const [pokemons, getPokemons, getType, pokeError, isLoading] = useFetch();
    const trainer = useSelector(store => store.trainer);

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=2000/';

    useEffect(() => {
        if (selectValue) {
            getType(selectValue);
        } else {
            getPokemons(url)
        }
    }, [selectValue]);

    const textInput = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        setInputValue(textInput.current.value.toLowerCase().trim());
        console.log(textInput.current.value);
        setCurrentPage(1);
        textInput.current.value = '';
    };

    const pokeSearch = (poke) => poke.name.includes(inputValue);


    //! ==>> PAGINACIÓN <<==

    const indexOfLasPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLasPokemon - pokemonsPerPage;
    const currentPokemons = pokemons?.results?.slice(indexOfFirstPokemon, indexOfLasPokemon);
    const currentSearchPokemons = pokemons?.results?.filter(pokeSearch).slice(indexOfFirstPokemon, indexOfLasPokemon);

    const paginate = pageNumber => setCurrentPage(pageNumber)

    console.log(pokemons);
    console.log(pokemons?.count);
    console.log(pokemons?.results?.filter(pokeSearch).length);


    return (
        <>
            <header className='poke__header'>
                <img src="../../assets/banner.png" alt="" />
                {/* <PokeMusic
                    src="../../assets/poke_song.m4a"
                /> */}
            </header>
            <section className='pokedex'>
                <div className='pokedex__info'>
                    <h2><span className='pokedex__title'>Welcome {trainer}, </span> Here you can find your favorite pokemon</h2>
                </div>
                <div className='pokedex__form'>
                    <form onSubmit={handleSubmit}>
                        <input ref={textInput} type="text" />
                        <button>Search</button>
                    </form>
                    <PokeSelect
                        setSelectValue={setSelectValue}
                    />
                </div>
                <div className='pokedex__pagination'>
                    {
                        inputValue === '' ?
                            <Pagination
                                pokemonsPerPage={pokemonsPerPage}
                                totalPokemons={selectValue ? pokemons?.results?.filter(pokeSearch).length : pokemons?.count}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                            :
                            <Pagination
                                pokemonsPerPage={pokemonsPerPage}
                                totalPokemons={pokemons?.results?.filter(pokeSearch).length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                    }
                </div>
                <div className='pokedex__container'>
                    {
                        isLoading ?
                            <PokeLoader />
                            :
                            currentSearchPokemons.length > 1 ?
                                inputValue === '' ?
                                    currentPokemons?.map((poke) => (<PokeCard
                                        key={poke.url}
                                        url={poke.url}
                                    />))
                                    :
                                    currentSearchPokemons.map((poke) => (<PokeCard
                                        key={poke.url}
                                        url={poke.url}
                                    />))

                                :
                                <>
                                    <p>No existen coincidencias con tu busqueda</p>
                                    <p>vuelve a intentarlo</p>
                                </>
                    }
                </div>
            </section>

        </>
    )
}

export default Pokedex