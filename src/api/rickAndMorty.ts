import axios from "axios"

export const rickAndMorty = axios.create({
    baseURL: "https://rickandmortyapi.com/api/character"
})