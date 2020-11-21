import React, { useState, useEffect } from 'react';
import './App.css';
import MoviesList from './components/MoviesList'
import SearchBar from './components/SearchBar'
import AddFavourites from './components/AddFavourites'
import RemoveFavourites from './components/RemoveFavourites'

const App = () => {

  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleGetMovies = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8fa3b031`

    const response = await fetch(url)
    const responseJson = await response.json()

    console.log(searchValue)


    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    handleGetMovies(searchValue)
    console.log(searchValue + " useEffect")
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    setFavourites(movieFavourites)

  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const AddFavouriteMovie = (movie) => {
    const newFavouritesList = [...favourites, movie]
    setFavourites(newFavouritesList)
    saveToLocalStorage(newFavouritesList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouritesList = favourites.filter(favourite => favourite.Title !== movie.Title)
    setFavourites(newFavouritesList)

    saveToLocalStorage(newFavouritesList)
  }

  return (
    <div className="App" >
      <header>
        <SearchBar header={'Movies'} searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      <section>
        <MoviesList
          AddFavourites={AddFavourites}
          handleFavouritesClick={AddFavouriteMovie}
          movies={movies} />
      </section>
      {movies.length > 0 ? null : <div className="noMovies">You are not searching for any movies!</div>}
      <header>
        <SearchBar header={'Favourites'} searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      <section>
        {favourites.length > 0 ? null : <div className="noMovies">You don't have any movie in your favourites yet.</div>}
        <MoviesList
          AddFavourites={RemoveFavourites}
          handleFavouritesClick={removeFavouriteMovie}
          movies={favourites} />
      </section>
    </div >
  );
}

export default App;
