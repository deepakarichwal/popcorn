import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, onRemoveMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onRemoveMovie={onRemoveMovie}
        ></WatchedMovie>
      ))}
    </ul>
  );
}
