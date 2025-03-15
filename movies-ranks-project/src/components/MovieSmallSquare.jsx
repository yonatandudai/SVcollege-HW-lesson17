import React from 'react'

export default function MovieSquare({name, image, handleClick}) {
  return (
    <div className="relative flex items-center justify- w-20 h-20 cursor-pointer" onClick={handleClick}>
        {/* Movie Poster Image */}
        <img src={image} className="w-full h-full object-cover" />

        {/* Movie Name Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
            <h1 className="text-sm font-bold text-white text-center">{name}</h1>
        </div>
    </div>
  );
}
