import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { MovieCard } from './MovieCard';


const API_URL = 'https://www.omdbapi.com?apikey=85dca204';

const movie1 = {
	"Title": "Italian Spiderman",
	"Year": "2007",
	"imdbID": "tt2705436",
	"Type": "movie",
	"Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
}

const App = () => {

	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const searchMovies = async(title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	}

	useEffect(() => {
		searchMovies('SpiderMan');
	}, []);

	

	return (
	
		<div className='app'>
			<h1>MovieLand</h1>

			<div className='search'>
				<input 
					placeholder='Search for movies' 
					value={searchTerm}
					onChange={(event) => {
						setSearchTerm(event.target.value);
					}}
				/>

				<img 
					src={'https://cdn-icons-png.freepik.com/256/141/141944.png?semt=ais_hybrid'}
					alt='search'
					onClick={() => searchMovies(searchTerm)}
				/> 
			</div>

			{
				movies?.length > 0? (
					<div className='container'>
				{movies.map((movie) => (
					<MovieCard movie={movie} />
				))}
			</div>
				) : (
					<div className='empty'>
						<h2>No movies found!</h2>
					</div>
				)
			}
		</div>
);
}

export default App;