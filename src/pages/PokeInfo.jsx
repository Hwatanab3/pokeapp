import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PokeRadar from './utils/PokeRadar';
import './styles/pokeinfo.css';

const PokeInfo = () => {

    const params = useParams();


    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`

    const [pokemon, getPokemon] = useFetch();

    useEffect(() => {
        getPokemon(url);
    }, [])


    return (
        <>
            <header className='poke__header'>
                <img src="../../assets/banner.png" alt="" />
            </header>
            <section className='pokeinfo'>
                <div className='pokeinfo__container'>
                    <figure>
                        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
                    </figure>
                    <span># {pokemon?.id}</span>
                    <h2>{pokemon?.name}</h2>
                    <ul className='pokeinfo__data'>
                        <li><span>weight </span><span>{pokemon?.weight}</span></li>
                        <li><span>height </span><span>{pokemon?.height}</span></li>
                    </ul>
                    <div className='pokeinfo__content'>
                        <article className='content__type'>
                            <h3>Type</h3>
                            <ul>
                                {
                                    pokemon?.types.map((type, index) => (<li key={index}>{type.type.name}</li>))
                                }
                            </ul>
                        </article>
                        <article className='content__type'>
                            <h3>Skills</h3>
                            <ul>
                                {
                                    pokemon?.abilities.map((skill, index) => (<li key={index}>{skill.ability.name}</li>))
                                }
                            </ul>
                        </article>
                    </div>
                    <h2>Stats</h2>
                    <PokeRadar
                        pokemon={pokemon}
                    />
                    {/* <ul>
                        {
                            pokemon?.stats.map((stat, index) => (<li key={index}><span>{stat.stat.name} </span><span>{stat.base_stat}/150</span><div><div></div></div></li>))
                        }
                    </ul> */}
                    <h2>Movements</h2>
                    <ul className='pokeinfo__moves'>
                        {
                            pokemon?.moves.map((move, index) => (<li key={index}>{move.move.name}</li>))
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default PokeInfo;