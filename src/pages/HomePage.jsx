import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setTrainer } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import './styles/homePage.css'
import PokeMusic from './utils/PokeMusic';

const HomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const textInput = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setTrainer(textInput.current.value.trim()));
        textInput.current.value = '';
        navigate('/pokedex')
    }


    return (
        <section className='pokeHome'>
            <img className='pokeHome__banner' src="../../assets/banner.png" alt="Title banner" />
            <div className='pokeHome__decoration'>
                <div className='pokeHome__container'>
                    <h1>Hi Trainer!</h1>
                    <span>To begin, give me your name</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input ref={textInput} type="text" />
                    <button className='pokeHome__btn'>START</button>
                </form>
            </div>
            <footer className='poke__footer'>
                {/* <PokeMusic
                   src="../../assets/poke_song.m4a" 
                /> */}
                <span>by HWdev </span>
            </footer>
        </section>
    )
}

export default HomePage