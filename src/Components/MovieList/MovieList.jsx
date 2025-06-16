import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";



const MovieList = () => {
    const [movies, setMovies] = useState([]); //initial array of all movies
    const [filteredMovies, setFilteredMovies] = useState([]); //initial array of filtered movies

    //setting initial page to 1, state is incremented by 1 when load more button is clicked2
    const [page , setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [input, setInput] = useState('');

    const [sortAtoZ, setSortAtoZ] = useState('');
    const [sortRating, setSortRating] = useState('');   
    const [sortRelease, setSortRelease] = useState('');
    
    const [dropdown, setDropdown] = useState(false);
    const handleDropdown = () => setDropdown(!dropdown);


    //renders the movies based on filter chosen
    useEffect(() => {

        //filters the movie data based on the search query
        let movieUpdate = [...movies];
        if(searchQuery.trim()){
            movieUpdate = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        
        //determines how to sort the movie data based on which dropdown item is selected
        movieUpdate.sort((a, b) => {
            if(sortAtoZ === 'Ascending'){
                return a.title.localeCompare(b.title);
            }
            else if (sortRating === 'Descending'){
                return b.vote_average - a.vote_average;
            }
            else if (sortRelease === 'Descending'){
                return b.release_date.localeCompare(a.release_date);
            }
            else{
                return 0;
            }
        });
        setFilteredMovies(movieUpdate);
    }, [movies, sortAtoZ, sortRating, sortRelease, searchQuery]);


    useEffect (() => {
        const searchList = async () => {
            try{
                const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
                params: {language: 'en-US', query: searchQuery, page:page },
                headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTgyODQxYThiMTBhZGNiNWVlZTE2MzQ0NTA3OWEwMSIsIm5iZiI6MTc0OTgzODMzNC43MTYsInN1YiI6IjY4NGM2OWZlNWQwZmNmNzczMDVjNzQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G7-mS54v47mBxzyXaLV2rBQfax1lgZpD1odYnBoIjws`,
                accept: "application/json",
                },
            });
        }catch(err){
            console.error("Error fetching movies: ", err);
        }
        setFilteredMovies(data.results);
        };
        searchList();
    }, [movies]);   
    
    useEffect(() => {   
        //checks if dropdown items were clicked
        const clicked = (e) => {
            if(e.target.closest('.dropdown-content')){
                setDropdown(false);
            }
        };
        
        //adding event listener to document 
        document.addEventListener('click', clicked);
        return () => {
            document.removeEventListener('click', clicked);
        };
    }, []);

    //fetches movies from the API
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
                setMovies(prevMovies=> page === 1 ? data.results : [...prevMovies, ...data.results]);
            }
            catch(err){
                console.error("Error fetching movies: ", err);
            }
            
        };
        fetchList();
    },[page]);

    

    //sets the input value to the value of the search query when the search query is updated
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    //clears the input and search query when the clear button is clicked
    const handleClear = () => {
        setInput("");
        setSearchQuery("");
    };

    //sets the search query to the input value when the search button is clicked for displaying, as well as resets the page to 1
    const handleSearch = () => {
        setPage(1);
        setSearchQuery(input);
    };


    return (
        <>
        {/*search bar for user input */}
        <div>
            <input type="text" placeholder="Search for movies" value={input} 
            onChange={handleChange} onKeyDown={(e) => e.key === "Enter" && searchList}/> 
            <button onClick={searchList}>Search</button>
            <button onClick={handleClear}> Clear</button>
        </div>

        {/*dropdown menu for sorting movies*/}
        <div className = "dropdown">
            <button className="dropbtn" onClick={handleDropdown}>Sort By</button>
            <button className="clearbtn" onClick={()=> {setDropdown(false); setSortAtoZ(''); setSortRating(''); setSortRelease('');}}>X</button> 
            <div className={dropdown ? "dropdown-content show" : "dropdown-content"}>
                <a href="#" onClick={() => {setSortAtoZ('Ascending'); setDropdown(false);}}>Sort A to Z</a>
                <a href="#" onClick={() => {setSortRelease('Descending'); setDropdown(false);}}>Release Date Descending</a>
                <a href="#" onClick={() => {setSortRating('Descending'); setDropdown(false);}}>Rating Descending</a>
                
            </div>
        </div>


        {/* returns list of movies to the app*/}
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
        
        {/*loads more movies by adding a page when load more is pressed*/}
        <button onClick={() => setPage(page + 1)} className="load-more">Load More</button>

    
        </>
    );




};

export default MovieList;