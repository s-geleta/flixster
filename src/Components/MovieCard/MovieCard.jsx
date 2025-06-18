
import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import { use } from "react";


const MovieCard = ({ name, onClick, poster, rating }) => {
   
    const [likes, setLikes] = useState(0);
    const [watched, setWatched] = useState(false);

    const heartClick = () => {
        setLikes(likes + 1);
    };



    return (
        <>
        
        <div className="movie-card" >
            <button className="heart-icon" onClick={() => heartClick()}>&#10084;</button>
            <span className = 'like-count'>{likes}</span>
            <div onClick ={onClick}>
                <h1>{name}</h1>
                <img className = "poster" src={`https://image.tmdb.org/t/p/w500${poster}`} alt={name} onError={(e) => e.target.src = "/src/assets/img.jpg"} />
                <p>Rating: {rating}</p>
            </div>
            <input type="checkbox" className="check"/>
            <span className="not-watched"> &#9215;</span>
        </div>

        </>
    );
};

export default MovieCard;