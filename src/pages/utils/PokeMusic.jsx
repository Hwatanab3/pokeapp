import React, { useEffect, useRef, useState } from 'react';
import "./pokeMusic.css"

const PokeMusic = () => {
    const [playing, setPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const audioRef = useRef(null);

    const tracks = [
        "../../../assets/tracks/poke_song.m4a",
        "../../../assets/tracks/Pokémon Opening Full.opus",
        "../../../assets/tracks/THE POKÉMON THEME - (METAL COVER).m4a",
        "../../../assets/tracks/ALL POKEMON THEME SONGS.m4a",
        "../../../assets/tracks/Pokemon EPIC Medley.m4a",
        "../../../assets/tracks/Pokemon Theme Saxy Style.opus",
        "../../../assets/tracks/POKÉRAP LATINO COVER!.m4a",
        "../../../assets/tracks/Phoenix - Worlds 2019.opus",
        "../../../assets/tracks/Anime Openings & Endings Mega Mix.m4a",

    ];

    const selectRandomTrackIndex = () => {
        if (tracks.length > 0) {
            const randomIndex = Math.floor(Math.random() * tracks.length);
            setCurrentTrackIndex(randomIndex);
        }
    };

    useEffect(() => {
        selectRandomTrackIndex();
    }, []);

    useEffect(() => {
        if (currentTrackIndex !== null) {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    setPlaying(true);
                }).catch(error => {
                    console.log('error', error);
                    setPlaying(false)
                });
            }
        }
    }, [currentTrackIndex])


    const togglePlay = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
                setPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setPlaying(true);
                }).catch(error => {
                    console.error('La reproducción automática fue bloqueada:', error);
                    setPlaying(false);
                });
            }
        }

    };

    const handleEnd = () => {
        selectRandomTrackIndex();
    }

    console.log(tracks[currentTrackIndex]);

    return (
        <div className='poke__music'>
            <audio
                ref={audioRef}
                src={tracks[currentTrackIndex]}
                loop={false}
                preload='auto'
                autoPlay
                onEnded={handleEnd}
            />
            <div className='music__container'>
                <button onClick={togglePlay}>
                    {playing ? <ion-icon name="pause-circle-outline"></ion-icon> : <ion-icon name="play-circle-outline"></ion-icon>}
                </button>
                <button onClick={handleEnd}><ion-icon name="shuffle-outline"></ion-icon></button>
            </div>
        </div>
    );
}

export default PokeMusic;