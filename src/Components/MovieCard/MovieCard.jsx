import React from "react";
import "./MovieCard.css";

const MovieCard = ({ name, onClick, poster, rating }) => {
    return (
        <>
        <div className="movie-card" onClick={onClick}> 
            <h1>{name}</h1>
            <img className = "poster" src={`https://image.tmdb.org/t/p/w500${poster}`} alt={name} onError={(e) => e.target.src = "src/assets/img.jpg"} />
            <p>Rating: {rating}</p>
            
        </div>

        </>
    );
};

export default MovieCard;