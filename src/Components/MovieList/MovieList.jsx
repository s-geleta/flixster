import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";



const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page , setPage] = useState(1);
    
    useEffect(() => {
        const fetchList = async () => {
            try{
                const { data } = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
                params: {language: 'en-US', page:page },
                headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTgyODQxYThiMTBhZGNiNWVlZTE2MzQ0NTA3OWEwMSIsIm5iZiI6MTc0OTgzODMzNC43MTYsInN1YiI6IjY4NGM2OWZlNWQwZmNmNzczMDVjNzQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G7-mS54v47mBxzyXaLV2rBQfax1lgZpD1odYnBoIjws`,
                accept: "application/json",
                },
            });
                setMovies((prevMovies)=>[...prevMovies, ...data.results]);

            }
            catch(err){
                console.error("Error fetching movies: ", err);
            }
            
        };
        
        
        fetchList();
    },[page]);

    return (
        <>
        <div className ="movie-list">
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                name={movie.title}
                poster={movie.poster_path}
                />

            ))}
        </div>
        <button onClick={() => setPage(page + 1)}>Next Page</button>

    
        </>
    );




};

export default MovieList;