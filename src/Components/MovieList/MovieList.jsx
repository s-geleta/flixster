import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";



const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    //setting initial page to 1, state is incremented by 1 when load more button is clicked2
    const [page , setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    
    
    

    
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
                setMovies(prevMovies=> page ===1 ? data.results : [...prevMovies, ...data.results]);
            }
            catch(err){
                console.error("Error fetching movies: ", err);
            }
            
        };
        fetchList();
    },[page]);

    useEffect(() => {
       if(!searchQuery.trim()){
           setFilteredMovies(movies);
       } else {
        const toLower = searchQuery.toLowerCase();  
        setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(toLower)));
       }
    }, [movies, searchQuery]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClear = () => {
        setSearchQuery("");
    };

    const handleSearch = () => {
        setPage(1);
    };


    return (
        <>
        <div>
            <input type="text" placeholder="Search for movies" value={searchQuery} onChange={handleChange}/> 
            <button onClick={handleSearch}>Search</button> 
            <button onClick={handleClear}> Clear</button>
        </div>
        
        <div className ="movie-list">
            {filteredMovies.map((movie) => (
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