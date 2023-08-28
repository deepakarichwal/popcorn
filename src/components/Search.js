import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function Search({ query, setQuery }) {
  // console.log(query);

  // useEffect(function () {
  //   const inputEl = document.querySelector(".search");
  //   console.log(inputEl);
  //   inputEl.focus();
  // }, []);

  const inputEl = useRef(null);
  useKey("Enter", "keydown", function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
