import axios from "axios";
import { useState } from "react";


const useFetch = () => {
    const [apiData, setApiData] = useState();
    const [pokeError, setPokeError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const getApi = (url) => {
        axios.get(url)
            .then(res => {
                setApiData(res.data);
                setPokeError(false);
            })
            .catch(err => {
                setPokeError(true);
                console.log(err);
            })
            .finally(() => { setIsLoading(false) })
    }

    const getType = (url) => {
        axios.get(url)
            .then(res => {
                setApiData({
                    results: res.data.pokemon.map(poke => poke.pokemon),
                });
                setPokeError(false)
            })
            .catch(err => console.log(err))
    }

    return [apiData, getApi, getType, pokeError, isLoading]
}

export default useFetch;