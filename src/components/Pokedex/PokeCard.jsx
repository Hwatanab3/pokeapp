import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import "./styles/pokeCard.css"
import { useNavigate } from 'react-router-dom';

const PokeCard = ({ url }) => {

    const [pokemon, getPokemon, getType, pokeError] = useFetch();

    const navigate = useNavigate();

    useEffect(() => {
        getPokemon(url);
    }, [])

    const handlePoke = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }

    return (
        <div>
            {
                pokeError === true ? (
                    <div>
                        <p>por mientras</p>
                    </div>
                ) : (
                    <article onClick={handlePoke} className={`pokecard pokecard--${pokemon?.types[0].type.name}`}>
                        <div className={`pokecard__back ${pokemon?.types[0].type.name}`}></div>
                        <figure className='pokecard__img'>
                            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                        </figure>
                        <h3 className='pokecard__name'>{pokemon?.name.toUpperCase()}</h3>
                        <ul className='pokecard__types'>
                            {
                                pokemon?.types.map(type => (<li className={`slot${type.slot}`} key={type.type.name}>{type.type.name}</li>))
                            }
                        </ul>
                        <span>Type</span>
                        <hr />
                        <ul className='pokecard__stats'>
                            {
                                pokemon?.stats.map((stat, index) => (
                                    stat.stat.name.includes('-') ||
                                    <li key={index}><span>{stat.stat.name} </span><span>{stat.base_stat}</span>
                                    </li>))
                            }
                        </ul>
                    </article>
                )}
        </div>
    )
}

export default PokeCard