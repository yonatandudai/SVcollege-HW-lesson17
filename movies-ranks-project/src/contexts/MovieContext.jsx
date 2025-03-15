import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [ratings, setRatings] = useState({});

    const apiKey = "d12e5df091a5a2c0e1290a34871a73e3";

    // List of default movies
    const movieNames = [
        "The Shawshank Redemption",
        "The Godfather",
        "The Dark Knight",
        "Pulp Fiction",
        "The Matrix",
        "Inception",
        "Goodfellas",
        "Interstellar",
        "Schindler's List",
        "Forrest Gump",
    ];

    // Fetch movies when component mounts
    useEffect(() => {
        const fetchMovies = async () => {
            const moviePromises = movieNames.map(async (movie) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`
                );
                const data = await response.json();

                if (data.results.length > 0) {
                    const movieInfo = data.results[0];
                    return {
                        name: movieInfo.original_title,
                        image: movieInfo.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
                            : null,
                        description: movieInfo.overview,
                        id: movieInfo.id
                    };
                }
                return null;
            });

            const movieData = (await Promise.all(moviePromises)).filter(Boolean);
            setMovies(movieData);

            // Set the default selected movie
            if (movieData.length > 0) {
                setSelectedMovie(movieData[0]);
            }
        };

        fetchMovies();
    }, []); // Run only once when the component mounts

    // Set random movies when movies are updated
    useEffect(() => {
        if (movies.length > 0 && randomMovies.length === 0) { 
            setRandomMovies(
                [...movies]
                    .sort(() => 0.5 - Math.random()) // Shuffle movies
                    .slice(0, 5) // Select 5 movies
                    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            );
        }
    }, [movies]); // Run whenever `movies` change

    const shuffleRandomMovies = () => {
        if (movies.length > 0) {
            setRandomMovies(
                [...movies]
                    .sort(() => 0.5 - Math.random()) // Shuffle movies
                    .slice(0, 5) // Get 5 movies
                    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) // Sort A-Z
            );
        }
    };

    // Update top movies when ratings change
    useEffect(() => {
        if (movies.length > 0) {
            setTopMovies(
                [...movies]
                    .sort((a, b) => getAverageRating(b.id) - getAverageRating(a.id))
                    .slice(0, 3)
            );
        }
    }, [movies, ratings]); // Re-run when ratings or movies change

    // Handle selecting a movie globally
    const selectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    // Handle adding a new movie
    const addNewMovie = (newMovie) => {
        setMovies((prevMovies) => [...prevMovies, newMovie]);
    };

    // Handle rating a movie
    const handleRating = (movieId, rating) => {
        setRatings((prevRatings) => {
            const newRatings = { ...prevRatings };
    
            // Ensure movie rating array exists
            if (!newRatings[movieId]) {
                newRatings[movieId] = [];
            }
    
            // Push the new rating correctly
            newRatings[movieId] = [...newRatings[movieId], rating];
    
            return newRatings;
        });
    };

    // Calculate average rating
    const getAverageRating = (movieId) => {
        if (!ratings[movieId] || ratings[movieId].length === 0) return 0;
        //calculate average rating
        let sum = 0;
        for (let i = 0; i < ratings[movieId].length; i++) {
            sum += ratings[movieId][i];
        }
        const avg = sum / ratings[movieId].length;
        return parseFloat(avg.toFixed(2));;
    };

    const deleteMovie = (movieName) => {
        setMovies((prevMovies) => {
            const updatedMovies = prevMovies.filter(
                (movie) => movie.name.toLowerCase() !== movieName.toLowerCase()
            );
            // If the deleted movie was the selected movie, reset it
            if (selectedMovie && selectedMovie.name.toLowerCase() === movieName.toLowerCase()) {
                setSelectedMovie(updatedMovies.length > 0 ? updatedMovies[0] : null);
            }
            return updatedMovies;
        });
    };

    return (
        <MovieContext.Provider value={{ 
            movies, topMovies, randomMovies, selectedMovie, selectMovie, addNewMovie, deleteMovie, handleRating, getAverageRating, shuffleRandomMovies 
        }}>
            {children}
        </MovieContext.Provider>
    );
}
