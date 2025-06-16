import React from "react";
import "./MovieCard.css";

const MovieCard = ({ name, onClick, poster, rating }) => {
    return (
        <>
        <div className="movie-card" onClick={onClick}> 
            <h1>{name}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={name} />
            <p>Rating: {rating}</p>
            
        </div>

        </>
    );
};

export default MovieCard;