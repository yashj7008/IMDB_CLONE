import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react';
import Pagination from './Pagination';

const Movies = () => {
  const [movies, setMovies] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [err, setError] = useState(null);
  
  // Pagination handlers
  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };


  //fetching the movies data from the api
  async function fetchData(){
       try {
        setLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=cc2c80e4c16567ac20148744f6b599a5&page=${pageNum}`);
        setMovies(response.data.results);
        setLoading(false);
       } catch (error) {
        setError(error);
         console.log(error);
       }
        
  }
 useEffect(() => {
  fetchData();
  console.log(movies)
 }, [pageNum]);
  
  if(loading){
    return <h1 className="text-xl mb-8 font-bold text-center">Loading movies ...</h1>
  }

  return (
    <>
    <div className="text-2xl mb-8 font-bold text-center">Trending Movies</div>
    <div className='flex flex-wrap'>
      {movies.map((movie) => (
        <div
          key={movie.id} // Assuming each movie has a unique `id`
          className="w-[200px] h-[35vh] bg-center bg-cover rounded-xl m-4 md:h-[40vh] md:w-[200px] hover:scale-110 duration-300 relative flex items-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`
          }}
          role="img"
          aria-label={`Poster of the movie ${movie.title}`}
        >
          <div className="text-white font-bold text-center w-full bg-gray-900 bg-opacity-60">
            {movie.title}
          </div>
        </div>
      ))}
    </div>
    <Pagination
        pageNumProp={pageNum}
        onNextProp={onNext}
        onPrevProp={onPrev}
      ></Pagination>
  </>
  );
  
}

export default Movies