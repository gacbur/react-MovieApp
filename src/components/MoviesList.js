import React from 'react';

const MoviesList = ({ movies, AddFavourites, handleFavouritesClick }) => {

    return (
        <div className="movies-list">
            {movies.map(movie => (
                <div className="img-item">
                    <img src={movie.Poster} key={movie.Title} alt="movie"></img>
                    <div onClick={() => handleFavouritesClick(movie)} className="img-overlay">
                        <AddFavourites />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MoviesList;