import React from "react";
import "./MovieModal.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";


const MovieModal = ({show, movie, onClose ,title, poster, rating}) => {

    const [videos, setVideos] = useState(['']);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, 
                    {
                        headers:{
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTgyODQxYThiMTBhZGNiNWVlZTE2MzQ0NTA3OWEwMSIsIm5iZiI6MTc0OTgzODMzNC43MTYsInN1YiI6IjY4NGM2OWZlNWQwZmNmNzczMDVjNzQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G7-mS54v47mBxzyXaLV2rBQfax1lgZpD1odYnBoIjws`,
                            accept: "application/json",
                        },
                    }
                );

                const trailer = data .results.find((video) => video.type === "Trailer" && video.site === "YouTube");
                if (trailer) {
                    setVideos([trailer]);
                } else {
                    setVideos([]);  
                }
            } catch (err) {
                console.error("Error fetching videos: ", err);
            }
        };

        if(movie?.id) {
            fetchVideos();
        }
    }, [movie]);

            
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
                    <iframe width="600" height="315" src={`https://www.youtube.com/embed/${videos[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    
                   
                </div>
            </div>
            
            
        </div>

        </>
    );
};

export default MovieModal;