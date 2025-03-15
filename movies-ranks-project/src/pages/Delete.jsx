import React from 'react'
import { useContext, useState } from 'react'
import { MovieContext } from '../contexts/MovieContext'

export default function Delete() {
    const { movies, deleteMovie } = useContext(MovieContext);
    const [query, setQuery] = useState("");

    const handleDelete = () => {
        // Check if movie exists (must match fully)
        const movieExists = movies.some(
            (movie) => movie.name.toLowerCase() === query.toLowerCase()
        );

        if (!movieExists) {
            alert(`❌ Movie "${query}" not found!`);
            return;
        }

        // Proceed with deletion if movie exists
        deleteMovie(query);
        alert(`✅ Movie "${query}" deleted successfully!`);
        setQuery(""); // Clear input after deletion
    };

    return (
        <div className="bg-sky-300 p-8 rounded-lg shadow-md w-1/2 flex flex-col items-center mt-8 mb-8">
            <h1 className="text-3xl font-bold mb-4">Delete a Movie :(</h1>
            <input 
                type="text" 
                placeholder="Movie name" 
                className="mb-4 p-2 w-1/2 bg-white placeholder-black font-bold text-center text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                className="bg-white font-bold px-4 py-2 w-30 h-30 rounded-full hover:bg-red-700 transition cursor-pointer"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
}
