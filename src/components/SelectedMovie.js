import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loading from "./Loading";
import { useKey } from "./useKey";

export default function SelectedMovie({
  selectedId,
  KEY,
  onCloseMovie,
  onAddWatchedList,
  watched,
  onSelectedIdClose,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movieRating, setMovieRating] = useState(0);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (movieRating) countRef.current = countRef.current + 1;
    },
    [movieRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const isRated = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Released: released,
    Year: year,
    Runtime: runtime,
    Actors: actors,
    Genre: genre,
    Poster: poster,
    Plot: plot,
    Director: director,
    imdbRating,
  } = movieDetails;

  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      userRating: movieRating,
      runtime: runtime.split(" ").at(0),
      poster,
      title,
      userRatingDecision: countRef.current,
    };
    onAddWatchedList(newWatchedMovie);
    onCloseMovie();

    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + movieRating) / 2);
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useKey("Escape", "keydown", onSelectedIdClose);

  // useEffect(
  //   function () {
  //     function callBack(e) {
  //       if (e.key === "Escape") {
  //         onSelectedIdClose();
  //       }
  //     }
  //     document.addEventListener("keydown", callBack);

  //     return function () {
  //       document.removeEventListener("keydown", callBack);
  //     };
  //   },
  //   [onSelectedIdClose]
  // );

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetails(data);
        setIsLoading(false);
      }
      fetchMovieDetails();
    },
    [KEY, selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You have rated this movie {isRated} <span>🌟</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setRating={setMovieRating}
                  ></StarRating>

                  {movieRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
