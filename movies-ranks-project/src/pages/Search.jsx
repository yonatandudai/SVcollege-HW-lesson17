import React, { useState, useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import MovieSquare from "../components/MovieSquare";

export default function SearchMovie({ setView }) {
    const { movies, selectMovie } = useContext(MovieContext);
    const [query, setQuery] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // 🔹 Handle Search
    const handleSearch = () => {
        if (!query.trim()) {
            alert("❌ Please enter a movie name!");
            return;
        }

        const results = movies.filter(movie =>
            movie.name.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length === 0) {
            alert("❌ No movies found with that name.");
            setFilteredMovies([]);
            setSelectedMovie(null);
        } else if (results.length === 1) {
            setSelectedMovie(results[0]);
            selectMovie(results[0]); // Update the main movie
            setFilteredMovies([]);
        } else {
            setFilteredMovies(results);
            setSelectedMovie(null);
        }
    };

    // 🔹 Handle Movie Selection from Dropdown
    const handleSelectMovie = (movieId) => {
        const movie = movies.find(m => m.id === Number(movieId));
        setSelectedMovie(movie);
        selectMovie(movie);
        // setFilteredMovies([]); // Hide dropdown after selection
    };

    return (
        <>
        <div className="flex w-full justify-between p-8 ">

            {/* 🔹 Search Section (Right Side) */}
            <div className="absolute top-73 right-0 h-190 w-[380px] border-l-2 border-black p-4 overflow-y-auto">
                <input
                    type="text" 
                    placeholder="Movie name" 
                    className="mt-40 mb-8 p-2 rounded w-full h-15 text-center text-xl bg-white placeholder-black"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                
                <button 
                    className="mt-10 bg-white text-xl font-bold px-6 py-2 rounded-full w-50 h-50 hover:bg-blue-700 transition cursor-pointer"
                    onClick={handleSearch}
                >
                    Search
                </button>

                {/* 🔹 Dropdown if multiple results exist */}
                {filteredMovies.length > 1 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-700">Multiple results found:</p>
                        <select 
                            className="p-2 border rounded w-full text-center"
                            onChange={(e) => handleSelectMovie(e.target.value)}
                        >
                            <option value="">-- Select a movie --</option>
                            {filteredMovies.map(movie => (
                                <option key={movie.id} value={movie.id}>{movie.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
