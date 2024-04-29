import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import "./styles/pokedex.css"
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/Pokedex/PokeCard';
import PokeSelect from '../components/Pokedex/PokeSelect';
import PokeLoader from './PokeLoader';

const Pokedex = () => {

    const [selectValue, setSelectValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [pokemons, getPokemons, getType, pokeError, isLoading] = useFetch();
    const trainer = useSelector(store => store.trainer);

    useEffect(() => {
        if (selectValue) {
            getType(selectValue);
        } if (inputValue === '') {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=20/';
            getPokemons(url);
        } if (inputValue) {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000/';
            getPokemons(url);
        } else {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=100/';
            getPokemons(url);
        }
    }, [selectValue, inputValue])

    console.log(inputValue);

    const textInput = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        setInputValue(textInput.current.value.toLowerCase().trim());
        textInput.current.value = '';
    };

    const pokeSearch = (poke) => {
        const perName = poke.name.includes(inputValue);
        return perName;
    }

    return (
        <>
            <header className='poke__header'>
                <img src="../../assets/banner.png" alt="" />
            </header>
            <section className='pokedex'>
                <div className='pokedex__info'>
                    <h2><span className='pokedex__title'>Welcome {trainer}<br /></span> Here you can find your favorite pokemon</h2>
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
                <div className='pokedex__container'>
                    {
                        isLoading ?
                            <PokeLoader />
                            :
                            pokemons?.results.filter(pokeSearch).map((poke) => (<PokeCard
                                key={poke.url}
                                url={poke.url}
                            />))
                    }
                </div>
            </section>
        </>
    )
}

export default Pokedex