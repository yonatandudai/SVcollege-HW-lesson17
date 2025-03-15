import { useState, useContext } from "react";
import AddMovie from "./AddMovie";
import Search from "./Search";
import Delete from "./Delete";
import MovieSquare from "../components/MovieSquare";
import Navbar from "../components/NavBar";
import { MovieContext } from "../contexts/MovieContext";

export default function HomePage() {
    const { 
        topMovies, 
        randomMovies, 
        setRandomMovies, 
        movies, 
        selectedMovie, 
        selectMovie, 
        handleRating, 
        getAverageRating,
        shuffleRandomMovies 
    } = useContext(MovieContext);
    const [view, setView] = useState("home");  // Controls Current Page View

    // Go back to Home Page and Shuffle Random Movies
    const handleHome = () => {
        shuffleRandomMovies(movies);
        setView("home");
    };

    //handle the add movie button
    const handleAddMovie = () => setView("addMovie");
    //handle the search button
    const handleSearch = () => setView("search");
    //handle the delete button
    const handleDelete = () => setView("delete");

    return (
            <>
            <style>{`
                body, html { background-color: #d1d5db; min-height: 100vh; margin: 0; }
            `}</style>

            <div className="text-center bg-gray-300 h-auto min-h-screen w-full flex flex-col justify-start items-center">
                <h1 className="text-7xl">Best Movie</h1>
                <Navbar 
                    handleAdd={handleAddMovie}  
                    handleSearch={handleSearch}  
                    handleDelete={handleDelete} 
                    handleHome={handleHome}
                />

                {/* Always Show Top 3 Movies */}
                <div className="flex justify-around w-full h-31 border-2 border-black">
                    {topMovies.map((movie, index) => (
                        <MovieSquare key={index} name={movie.name} image={movie.image} handleClick={() => selectMovie(movie)} />
                    ))}
                </div>

                {/* Conditional Rendering */}
                {view === "home" && (
                    <>
                        {/* Main Movie Display */}
                        {selectedMovie && (
                            <div className="w-2/3 bg-purple-800 px-10 py-4 mt-6 border-2 border-black flex flex-col items-start">
                                <h2 className="text-xl font-bold text-white">Movie Name: {selectedMovie.name}</h2>
                                <img src={selectedMovie.image} alt={selectedMovie.name} className="w-64 mt-4"/>
                                <p className=  "mt-4 text-justify leading-relaxed px-6">Description: {selectedMovie.description}</p>

                                {/* Rating System */}
                                <div className="mt-4 flex items-center">
                                    <p className="text-white mr-4">Rate:</p>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button 
                                                key={num} 
                                                className="bg-blue-400 px-3 py-1 text-white font-bold cursor-pointer"
                                                onClick={() => handleRating(selectedMovie.id, num)}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="ml-4 text-white">Avg: {getAverageRating(selectedMovie.id)}</p>
                                </div>
                            </div>
                        )}

                        {/* Right Section - Random Movies */}
                        <div className="absolute top-73 right-4 w-[180px] border-l-2 border-black p-2">
                            <h2 className="text-2xl mb-4 ml-10">All Movies</h2>
                            <div className="flex flex-col gap-2 items-end">
                                {randomMovies.map((movie, index) => (
                                    <MovieSquare key={index} name={movie.name} image={movie.image} handleClick={() => selectMovie(movie)} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {/* Conditional Rendering */}
                {/* add movie page */}
                {view === "addMovie" && <AddMovie setView={setView} />}
                {/* search page */}
                {view === "search" && (
                    <div className="flex w-full justify-center mt-6">
                    {/* Main Movie Display */}
                    {selectedMovie && (
                        <div className="w-750 bg-purple-700 p-6 mt-6 border-2 border-black">
                            <h2 className="text-xl font-bold text-white">Movie Name: {selectedMovie.name}</h2>
                            <img src={selectedMovie.image} alt={selectedMovie.name} className="w-64 mx-auto mt-4"/>
                            <p className="text-white mt-4">Description: {selectedMovie.description}</p>

                            {/* Rating System */}
                            <div className="mt-4 flex items-center">
                                <p className="text-white mr-4">Rate:</p>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button 
                                            key={num} 
                                            className="bg-blue-400 px-3 py-1 text-white font-bold cursor-pointer"
                                            onClick={() => handleRating(selectedMovie.id, num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <p className="ml-4 text-white">Avg: {getAverageRating(selectedMovie.id)}</p>
                            </div>
                        </div>
                    )}
                    <Search
                    setView={setView} />
                </div>
            )}
                
                {view === "delete" && <Delete setView={setView} />}
            </div>
        </>
    );
}
