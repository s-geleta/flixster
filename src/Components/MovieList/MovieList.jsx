import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";



const MovieList = () => {
    const [movies, setMovies] = useState([]);

    //setting initial page to 1, state is incremented by 1 when load more button is clicked2
    const [page , setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('')  ;
    
        
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setMovies(movies);
            return;
        }
        const searched = movies.filter(
            (movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMovies(searched);
    };

    const handleClear = () => {
        setSearchQuery("");
        setMovies(movies);
    };
    

    
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
                //appending new fetched movies to the existing movies array when load more button is clicked
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
        <div>
            <input type="text" placeholder="Search for movies" onChange={handleChange}/> 
            <button onClick={handleSearch}>Search</button> 
            <button onClick={handleClear}>Clear</button>
        </div>
        
        <div className ="movie-list">
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                name={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                />

            ))}
            
        </div>
        <button onClick={() => setPage(page + 1)} className="load-more">Load More</button>

    
        </>
    );




};

export default MovieList;