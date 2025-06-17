import React from "react";
import "./MovieModal.css";
import axios from "axios";
import { useEffect, useState } from "react";


const MovieModal = ({show, movie, onClose ,title, poster, rating}) => {

    const [videos, setVideos] = useState(['']);

    if(!show) {
        return null;
    }

    if(!movie) {
        return(
            <>
            {/*handles loading screen for modal while fetching movies*/} 
            <div className="modal" onClick={onClose}>
                <div className = "modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Loading Movie...</h2>
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                    <div className="modal-body">
                        <p>Loading Movie...</p>
                    </div>
                </div>
                
            </div>;

            </>

        ) 

    }


    
    return (
        <>
        {/*modal for displaying movie details*/}
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className ="title">{movie.title}</h2>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-body">
                    <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
                    <img src={`src/assets/spotlight.png`} className="spotlight" alt="spotlight" />
                    <h3> Runtime: {movie.runtime} minutes </h3>
                    <h3>Release Date: {movie.release_date}</h3>
                    <p><strong>Overview: </strong>{movie.overview}</p>
                    <h3>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</h3>
                    <iframe width="600" height="315" src='' allowfullscreen></iframe>
                    
                   
                </div>
            </div>
            
            
        </div>

        </>
    );
};

export default MovieModal;