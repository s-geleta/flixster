import React from "react";
import "./MovieModal.css";


const MovieModal = ({show, movie, onClose ,title, poster, rating}) => {
    if(!show) {
        return null;
    }

    if(!movie) {
        return(
            <>
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
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className ="title">{movie.title}</h2>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-body">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
                    <h3> Runtime: {movie.runtime} minutes </h3>
                    <h3>Release Date: {movie.release_date}</h3>
                    <h3>Overview: {movie.overview}</h3>
                    <h3>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</h3>
                    <video width="320" height="240" controls>
                        <source src={`${movie.video}`} type="video/mp4" />
                    </video>    
                </div>
            </div>
            
            
        </div>

        </>
    );
};

export default MovieModal;