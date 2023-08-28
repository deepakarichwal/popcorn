import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./components/StarRating";
// import "./index.css";
// import App from "./App";
import "./style.css";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating onSetRating={setMovieRating}></StarRating>
//       <p>This movie got {movieRating} star rating</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={5} color="#def934" size={20} defaultRating={5} />
    <Test></Test> */}
    <TextExpander
      collapsedNumWords={5}
      expandButtonText="Show more"
      collapseButtonText="Show less"
    >
      Space travel is the ultimate adventure! Imagine soaring past the stars and
      exploring new worlds. It's the stuff of dreams and science fiction, but
      believe it or not, space travel is a real thing. Humans and robots are
      constantly venturing out into the cosmos to uncover its secrets and push
      the boundaries of what's possible.
    </TextExpander>

    <TextExpander
      collapsedNumWords={20}
      expandButtonText="Show text"
      collapseButtonText="Collapse text"
      buttonColor="#ff6622"
    >
      Space travel requires some seriously amazing technology and collaboration
      between countries, private companies, and international space
      organizations. And while it's not always easy (or cheap), the results are
      out of this world. Think about the first time humans stepped foot on the
      moon or when rovers were sent to roam around on Mars.
    </TextExpander>

    <TextExpander
      collapsedNumWords={10}
      expandButtonText="Show more"
      collapseButtonText="Show less"
      expanded={true}
      className="box"
    >
      Space missions have given us incredible insights into our universe and
      have inspired future generations to keep reaching for the stars. Space
      travel is a pretty cool thing to think about. Who knows what we'll
      discover next!
    </TextExpander>
  </React.StrictMode>
);

function TextExpander({
  children,
  collapsedNumWords = 10,
  collapseButtonText = "Show less",
  expandButtonText = "Show more",
  buttonColor = "blue",
  expanded = false,
  className = "",
}) {
  const [showText, setShowText] = useState(expanded);
  const style = {
    color: buttonColor,
    cursor: "pointer",
    background: "none",
    border: "none",
  };

  const displayText = showText
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div className={className}>
      <span>{displayText}</span>
      <button style={style} onClick={() => setShowText(!showText)}>
        {showText ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
