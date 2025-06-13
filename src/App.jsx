import { useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieList from './Components/MovieList/MovieList'
import MovieCard from './Components/MovieCard/MovieCard'

const App = () => {
  return (
    <>
    <div className="App">
      <MovieList />
    </div>
    </>
  )
}

export default App


