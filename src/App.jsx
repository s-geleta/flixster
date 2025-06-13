import { useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieList from './Components/MovieList/MovieList'
import MovieCard from './Components/MovieCard/MovieCard'
import Header from './Components/Header/Header'

const App = () => {
  return (
    <>
    <div className="App">
      <Header />
      <MovieList />
    </div>
    </>
  )
}

export default App


