import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";



const MovieList = () => {
    const [movies, setMovies] = useState([]); //initial array of all movies
   
    //setting initial page to 1, state is incremented by 1 when load more button is clicked2
    const [page , setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [input, setInput] = useState('');

    const [sort, setSort] = useState('');
    
    const [dropdown, setDropdown] = useState(false);
    const handleDropdown = () => setDropdown(!dropdown);


 

    
    
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
                let url = '';
                const params = {
                    language: 'en-US',
                    page: page,
                };
                const headers = {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTgyODQxYThiMTBhZGNiNWVlZTE2MzQ0NTA3OWEwMSIsIm5iZiI6MTc0OTgzODMzNC43MTYsInN1YiI6IjY4NGM2OWZlNWQwZmNmNzczMDVjNzQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G7-mS54v47mBxzyXaLV2rBQfax1lgZpD1odYnBoIjws`,
                    accept: "application/json",
                };

                if(searchQuery.trim()){
                    url = "https://api.themoviedb.org/3/search/movie?query=" + searchQuery ;
                    params.query = searchQuery;
                }
                else if(sort){
                    url = "https://api.themoviedb.org/3/discover/movie";
                    params.sort_by = sort;
                    params.include_adult = 'false';
                    params.include_video = 'false'; 
                }
                else{
                    url = "https://api.themoviedb.org/3/movie/now_playing";
                }

                const { data } = await axios.get(url, {
                    params: params, 
                    headers: headers, });
                setMovies(prevMovies=> page === 1 ? data.results : [...prevMovies, ...data.results]);
            }
            catch(err){
                console.error("Error fetching movies: ", err);
            }
        };
        fetchList();
    },[page, searchQuery, sort]);

    

    //sets the input value to the value of the search query when the search query is updated
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    //clears the input and search query when the clear button is clicked
    const handleClear = () => {
        setInput("");
        setSearchQuery("");
        setSort('');
        setPage(1);
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
            onChange={handleChange} onKeyDown={(e) => e.key === "Enter" && handleSearch}/> 
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClear}> Clear</button>
        </div>

        {/*dropdown menu for sorting movies*/}
        <div className = "dropdown">
            <button className="dropbtn" onClick={handleDropdown}>Sort By</button>
            <button className="clearbtn" onClick={()=> {setDropdown(false); setSortAtoZ(''); setSortRating(''); setSortRelease('');}}>X</button> 
            <div className={dropdown ? "dropdown-content show" : "dropdown-content"}>
                <a href="#" onClick={() => {setSort('title.asc'); setDropdown(false);}}>Sort A to Z</a>
                <a href="#" onClick={() => {setSort('release_date.desc'); setDropdown(false);}}>Release Date Descending</a>
                <a href="#" onClick={() => {setSort('vote_average.desc'); setDropdown(false);}}>Rating Descending</a>
                
            </div>
        </div>


        {/* returns list of movies to the app*/}
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
        
        {/*loads more movies by adding a page when load more is pressed*/}
        <button onClick={() => setPage((prev) => prev + 1)} className="load-more">Load More</button>

    
        </>
    );




};

export default MovieList;