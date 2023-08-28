import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import MovieBox from "./components/MovieBox";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovie from "./components/SelectedMovie";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";

const KEY = "1ade00d2";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const { movies, error, isLoading } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleSelectedIdClose() {
    setSelectedId(null);
  }

  function handleWatchedList(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <div className="App">
      <Header movies={movies}>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResult movies={movies}></NumResult>
      </Header>
      <Main>
        <MovieBox>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </MovieBox>
        <MovieBox>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              KEY={KEY}
              onCloseMovie={handleSelectedIdClose}
              onAddWatchedList={handleWatchedList}
              watched={watched}
              onSelectedIdClose={handleSelectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onRemoveMovie={handleRemoveMovie}
              />
            </>
          )}
        </MovieBox>
      </Main>
    </div>
  );
}
