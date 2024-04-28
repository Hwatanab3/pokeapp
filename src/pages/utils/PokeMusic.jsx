import React, { useRef, useState } from 'react';
import "./pokeMusic.css"

const PokeMusic = ({ src }) => {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().then(() => {
                    setPlaying(true);
                }).catch(error => {
                    console.error('La reproducción automática fue bloqueada:', error);
                });
            }
        }
    };

    return (
        <div>
            <audio
                ref={audioRef}
                id="audio"
                src={src}
                loop
                preload='auto'
                autoPlay
            />
            <button className='poke__music' onClick={togglePlay}>
                {playing ? 'Pause' : '> Play <'}
            </button>
        </div>
    );
}

export default PokeMusic;