import { useState, useEffect } from 'react';
import axios from 'axios';
import { rickAndMorty } from '../api/rickAndMorty';

const rickAndMortyApi = rickAndMorty;

// --- Definición de Tipos Corregida ---
interface Character {
    id: number;
    // La API devuelve otros campos útiles, los incluimos para evitar errores de tipado:
    name: string; 
    image: string;
    species: string; 
}

// ⚠️ CORRECCIÓN CLAVE 1: 'character' debe ser nullable en la interfaz
interface UseCharacterResult {
    character: Character | null; 
    loading: boolean; 
    error: string | null;
}
// --- Fin Definición de Tipos ---

export const useSpecificRickAndMortyCharacter = (characterId: number = 1): UseCharacterResult => {
    // ⚠️ CORRECCIÓN CLAVE 2: Inicializar loading y error
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Inicia en true
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true); // Iniciar la carga
            setError(null);    // Limpiar errores

            try {
                // ⚠️ CORRECCIÓN CLAVE 3: USAR EL PARÁMETRO characterId
                // El endpoint debe ser dinámico, no fijo en /5
                const characterResponse = await rickAndMortyApi.get(`/${characterId}`);
                
                // Forzar el tipo de la respuesta
                setCharacter(characterResponse.data as Character);

            } catch (err) {
                console.error(`Error al obtener el personaje con ID ${characterId}:`, err);
                
                // Manejar el error y actualizar el estado
                const errorMessage = axios.isAxiosError(err) 
                    ? `Personaje ID ${characterId} no encontrado.` 
                    : "Ocurrió un error desconocido.";
                
                setError(errorMessage);
                setCharacter(null);

            } finally {
                // Finalizar la carga
                setLoading(false);
            }
        };

        fetchCharacter();
        // El hook se re-ejecuta si el characterId cambia
    }, [characterId]); 

    // ⚠️ CORRECCIÓN CLAVE 4: Devolver los estados dinámicos
    return { character, loading, error };
};