import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PokeRadar from './utils/PokeRadar';
import './styles/pokeinfo.css';

const PokeInfo = () => {

    const params = useParams();

    const navigate = useNavigate();

    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`

    const [pokemon, getPokemon] = useFetch();

    const decoration = pokemon?.types[0].type.name;

    useEffect(() => {
        getPokemon(url);
    }, [])

    const handleBack = e => {
        e.preventDefault();
        navigate('/pokedex')
    }

    console.log(decoration);

    return (
        <>
            <header className='poke__header'>
                <img src="../../assets/banner.png" alt="" />
            </header>
            <section className='pokeinfo'>
                <button className='pokeinfo__btn__volver' onClick={handleBack}>volver</button>

                <div className={`pokeinfo__container container--${decoration}`}>
                    <div className={`decoration--${decoration}`}></div>
                    <figure>
                        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
                    </figure>
                    <div className='pokeinfo__description'>
                        <span className={`pokeinfo__number pokename--${decoration}`}># {pokemon?.id}</span>
                        <h2 className={`pokename pokename--${decoration}`}>{pokemon?.name.toUpperCase()}</h2>
                        <ul className='pokeinfo__data'>
                            <li><span className='data__title'>weight </span><span className='data__content'>{pokemon?.weight}</span></li>
                            <li><span className='data__title'>height </span><span className='data__content'>{pokemon?.height}</span></li>
                        </ul>
                        <div className='pokeinfo__content'>
                            <article className='content__type'>
                                <h3 className='pokeinfo__title'>Type</h3>
                                <ul>
                                    {
                                        pokemon?.types.map((type, index) => (<li className={`type--${type.type.name}`} key={index}>{type.type.name}</li>))
                                    }
                                </ul>
                            </article>
                            <article className='content__type'>
                                <h3 className='pokeinfo__title'>Skills</h3>
                                <ul>
                                    {
                                        pokemon?.abilities.map((skill, index) => (<li className='pokeinfo__skill' key={index}>
                                            {skill.ability.name}</li>))
                                    }
                                </ul>
                            </article>
                        </div>
                        <h2 className='pokeinfo__title'>Stats</h2>
                        <PokeRadar
                            pokemon={pokemon}
                        />
                        <h2 className='pokeinfo__title'>Movements</h2>
                        <ul className='pokeinfo__moves'>
                            {
                                pokemon?.moves.map((move, index) => (<li key={index}>{move.move.name}</li>))
                            }
                        </ul>

                    </div>

                </div>
            </section>
        </>
    )
}

export default PokeInfo;