import React from 'react'
import NavBar from '../components/NavBar'
import MovieSquare from '../components/MovieSquare'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { MovieContext } from '../contexts/MovieContext'

// ToDO: check if the description is in English and under 200 characters,
//  whether its accepted or not, show an alert to the user

export default function AddMovie() {
    const navigate = useNavigate();
    const { topMovies, addNewMovie } = useContext(MovieContext);
    const [movieName, setMovieName] = useState("");
    const [movieImage, setMovieImage] = useState("");
    const [description, setDescription] = useState("");

    // Function to capitalize movie name properly
    const formatMovieName = (name) => {
        return name
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Validate description (English letters only and numbers, max 200 chars)
    const isValidDescription = (desc) => {
        return /^[A-Za-z0-9.,!?'\- ]{0,200}$/
.test(desc);
    };

    // Handle Movie Submission
    const handleAddMovie = () => {
        if (!movieName.trim()) {
            alert("❌ Movie name cannot be empty!");
            return;
        }


        if (!/^[A-Za-z\s]+$/.test(movieName)) {
            alert("❌ Movie name must be in English only!");
            return;
        }

        if (!isValidDescription(description)) {
            alert("❌ Description must be in English and under 200 characters.");
            return;
        }

        // Convert movie name to title case
        const formattedName = formatMovieName(movieName);

        // Create new movie object
        const newMovie = {
            name: formattedName,
            image: movieImage || "https://via.placeholder.com/150", // Default placeholder
            description: description,
            id: Date.now(),
        };

        // Add to movie list
        addNewMovie(newMovie);

        console.log(newMovie);

        alert(`✅ Movie "${formattedName}" added successfully!`);
        
        // Clear inputs
        setMovieName("");
        setMovieImage("");
        setDescription("");
    };

    return (
        <div className="bg-sky-300 p-8 rounded-lg shadow-md w-1/2 flex items-center mt-8 mb-8">
            {/* Add Movie Button - Left Side */}
            <button 
                className="bg-white font-bold w-30 h-30 px-4 py-2 rounded-full hover:bg-blue-700 mr-6 transition cursor-pointer"
                onClick={handleAddMovie}
            >
                Add Movie!
            </button>

            {/* Input Fields - Right Side */}
            <div className="flex flex-col w-1/2 justify-center align-center">
                <div className='text-2xl font-bold mb-4'>Add a new Movie!</div>
                <input 
                    type="text" 
                    placeholder="Movie Name" 
                    className="mb-4 p-2 w-full bg-white placeholder-black font-bold text-center text-sm"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Movie picture URL" 
                    className="mb-4 p-2 w-full bg-white placeholder-black font-bold text-center text-sm"
                    value={movieImage}
                    onChange={(e) => setMovieImage(e.target.value)}
                />

                <textarea 
                    placeholder="Description" 
                    className="mb-4 p-2 w-full bg-white placeholder-black font-bold text-center text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
}
