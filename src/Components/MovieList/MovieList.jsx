import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";
import MovieModal from "../MovieModal/MovieModal";



const MovieList = () => {
    const [movies, setMovies] = useState([]); //initial array of all movies
   
    //setting initial page to 1, state is incremented by 1 when load more button is clicked2
    const [page , setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [input, setInput] = useState('');

    const [sort, setSort] = useState('');
    
    const [dropdown, setDropdown] = useState(false);
    const handleDropdown = () => setDropdown(!dropdown);

    const [show, setShow] = useState(false);
    const [movie, setMovie] = useState(null);


 

    
    
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
                //begins with empty url
                let url = '';
                const params = {
                    language: 'en-US',
                    page: page,
                };
                const headers = {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTgyODQxYThiMTBhZGNiNWVlZTE2MzQ0NTA3OWEwMSIsIm5iZiI6MTc0OTgzODMzNC43MTYsInN1YiI6IjY4NGM2OWZlNWQwZmNmNzczMDVjNzQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G7-mS54v47mBxzyXaLV2rBQfax1lgZpD1odYnBoIjws`,
                    accept: "application/json",
                };
                //variable to check if user is searching
                let searching = false;
            
                //sets url and params based on search query and sets searching to true
                if(searchQuery.trim()){
                    url = "https://api.themoviedb.org/3/search/movie?query=" + searchQuery ;
                    params.query = searchQuery;
                    searching = true;
                }
                //sets fetching url based on sort and updates parms
                else if(sort){
                    url = "https://api.themoviedb.org/3/discover/movie";
                    params.sort_by = sort;
                    params.include_adult = 'false';
                    params.include_video = 'true'; 
                }
                //if not searching or sorting, sets url to movies now playing
                else{
                    url = "https://api.themoviedb.org/3/movie/now_playing";
                }

                //fetches data based on state of site, allows for manual sorting if also searching
                const { data } = await axios.get(url, {
                    params: params, 
                    headers: headers, 
                });

                    let results = [...data.results];
                setMovies(prevMovies=> page === 1 ? data.results : [...prevMovies, ...data.results]);
            }
            catch(err){
                console.error("Error fetching movies: ", err);
            }
        };
        fetchList();
    },[page, searchQuery, sort]);

    // handles modal pop up based ono if movie card is clicked
    const handleCardClick = async (movie) => {
        setShow(true);
        setMovie(null);

        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTgyODQxYThiMTBhZGNiNWVlZTE2MzQ0NTA3OWEwMSIsIm5iZiI6MTc0OTgzODMzNC43MTYsInN1YiI6IjY4NGM2OWZlNWQwZmNmNzczMDVjNzQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G7-mS54v47mBxzyXaLV2rBQfax1lgZpD1odYnBoIjws`,
                    accept: "application/json",
                },
            });
            

            setMovie(data);
            setShow(true);
        } catch (err) {
            console.error("Error fetching movie: ", err);
        }
    };

    const handleClose = () => {
        setShow(false);
        setMovie(null);
    };

    

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
        <div className="sort">
            {/*search bar for user input */}
            <div>
                <input type="text" placeholder="Search for movies..." value={input} 
                onChange={handleChange} onKeyDown={(e) => e.key === "Enter" && handleSearch()}/> 
                <button className="search-button" onClick={handleSearch}>Search</button>
                <button className="clear-button" onClick={handleClear}> Now Playing</button>
            </div>

            {/*dropdown menu for sorting movies*/}
            <div className = "dropdown">
                <button className="dropbtn" onClick={handleDropdown}>Sort By</button>
                <button className="clearbtn" onClick={()=> {setDropdown(false); setSort('');}}>X</button>
                <div className={dropdown ? "dropdown-content show" : "dropdown-content"}>
                    <a href="#" onClick={() => {setSort('title.asc'); setDropdown(false);}}>Sort A to Z</a>
                    <a href="#" onClick={() => {setSort('release_date.desc'); setDropdown(false);}}>Release Date Descending</a>
                    <a href="#" onClick={() => {setSort('vote_average.desc'); setDropdown(false);}}>Rating Descending</a>
                    
                </div>
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
                onClick={() => handleCardClick(movie)}
                />
            ))}
            
        </div>
        
        {/*loads more movies by adding a page when load more is pressed*/}
        <button onClick={() => setPage((prev) => prev + 1)} 
        className="load-more">Load More</button>


        <MovieModal show={show} movie={movie} onClose={handleClose} />

    
        </>
    );




};

export default MovieList;