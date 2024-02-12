import React, { useState, useEffect } from "react";

function WatchList() {
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [rating, setRating] = useState(0);
  const [popularity , setPopularity] =useState(0);
  const [searchStr, setSearchStr] = useState("");

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("imdb");

    moviesFromLocalStorage = JSON.parse(moviesFromLocalStorage);

    setFavourites(moviesFromLocalStorage);
    console.log(favourites.length);
  }, []);

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids?.[0] || 'defaultGenreKey']);
    temp = new Set(temp); // imp
    setGenres(["All Genres", ...temp]);
  },[]);

  let filteredArray = [];

  // genre Filter

  filteredArray =
    currGenre === "All Genres"
      ? favourites
      : favourites.filter((movie) => genreids[movie.genre_ids?.[0]] === currGenre);

  // Sorting with Respect to ratings
  if (rating === -1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
  }

  if (rating === 1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
  }

    // Sorting with Respect to ratings
    if (popularity === -1) {
      filteredArray = filteredArray.sort(function (objA, objB) {
        return objB.popularity - objA.popularity;
      });
    }
  
    if (popularity === 1) {
      filteredArray = filteredArray.sort(function (objA, objB) {
        return objA.popularity - objB.popularity;
      });
    }

   filteredArray = filteredArray.filter((movie)=>{
     return movie.title && movie.title.toLowerCase().includes(searchStr.toLowerCase())
   })

  // Sorting with respect to popularity

  const del = (movie) => {
    let newArray = favourites.filter((m) => m.id !== movie.id);
    setFavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  return (
    favourites.length === 0 ? (
      <div className="text-center mt-6">
        Your Watchlist is Empty
      </div>
    ) :
      (<>
           <div className="mt-4 mb-4 ml-4">
          <select
            className="border bg-gray-200 bg-slate-400 p-2 rounded-lg"
            value={currGenre}
            onChange={(e) => setCurrGenre(e.target.value)}
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
        <div className="mt-4 mb-4">
          <input
            type="text"
            className="border bg-slate-200 border-4 text-center p-1 m-2"
            placeholder="Search for Movies"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto mx-auto  shadow-md sm:rounded-lg">
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className= "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="text-xl pl-8 py-1">Name</th>

              <th>
                <div className="flex cursor-pointer">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    className="mr-1"
                    alt="Not found"
                    onClick={() => {
                      setRating(1);
                    }}

                  />
                  <div className="text-xl px-2 py-1">Ratings</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    className="ml-1"
                    alt="Not found"
                    onClick={() => {
                      setRating(-1);
                    }}
                    
                  />
                </div>
              </th>

              <th>
                <div className="flex cursor-pointer">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    className="mr-1 mt-0"
                    alt="Not found"
                    onClick={() => {
                      setPopularity(1);
                    }}
                    
                  />
                  <div className="text-xl px-2 py-1">Popularity</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    className="ml-1"
                    alt="Not found"
                    onClick={() => {
                      setPopularity(-1);
                    }}
                  />
                </div>
              </th>

              <th>
                <div className="flex">
                  <div className="text-xl px-6 py-3">Genre</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {filteredArray.map((movie) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">
                    <img
                      alt=""
                      class="w-[160px] h-[30vh] min-h-[200px]"
                      src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`}
                    />

                    <div class="font-medium text-gray-700  text-xl px-4 py-3">
                      {movie.title}
                    </div>
                  </td>

                  <td className="text-xl  px-10 py-4 items-center">{movie.vote_average}</td>

                  <td className="text-xl px-10 py-4 items-center">{movie.popularity}</td>

                  <td className="text-xl px-10 py-4 items-center">{genreids[movie.genre_ids?.[0] || 'defaultGenreKey']}</td>

                  <td>
                    <button className="text-red-600 text-xl px-6 py-4 items-center" onClick={() => del(movie)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody> 
        </table>
      </div>
    </> )
  );
}

export default WatchList;