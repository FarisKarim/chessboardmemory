import React, { useState } from "react";
import "./index.css";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

const getRandomSquare = () => {
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
  return `${randomFile}${randomRank}`;
};

const App = () => {
  const [mode, setMode] = useState("learn");
  const [highlightedSquare, setHighlightedSquare] = useState("");
  const [userGuess, setUserGuess] = useState("");

  const showCoordinates = mode === "learn";

  const handleLearnMode = () => {
    setMode("learn");
    setHighlightedSquare("");
    setUserGuess("");
  };

  const handleStartMode = () => {
    setMode("start");
    setUserGuess("");
    setHighlightedSquare(getRandomSquare());
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const guessNormalized = userGuess.trim().toLowerCase();
    const highlightNormalized = highlightedSquare.toLowerCase();

    if (guessNormalized === highlightNormalized) {
      setUserGuess("");
      setHighlightedSquare(getRandomSquare());
    } else {
      handleLearnMode();
    }
  };

  return (
    <div className="flex flex-col min-h-screen  items-center bg-gray-800 p-4">
      <div className="bg-blue-300 rounded-lg px-4 py-2 flex mb-4 justify-center items-center">
      <div className="text-2xl font-bold">Chessboard Memorization</div>

      </div>

      <div className="mb-4 w-1/4 flex justify-between space-x-2">
        <button
          onClick={handleLearnMode}
          className={`px-4 py-2 transition-transform hover:scale-110 rounded ${
            mode === "learn"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Learn
        </button>
        <button
          onClick={handleStartMode}
          className={`px-4 py-2 hover:scale-110 transition-transform rounded ${
            mode === "start"
              ? "bg-green-600 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Start
        </button>
      </div>

      {mode === "start" && (
        <form onSubmit={handleGuessSubmit} className="mb-4 flex space-x-2">
          <input
            type="text"
            className="border text-white placeholder-gray-400 border-white p-2 rounded"
            placeholder="e.g. f3"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Guess
            <div className="bg-blue-500"></div>
          </button>
        </form>
      )}

      <div className="relative flex flex-col items-center">
        {/* FILE LABELS (top) */}
        {showCoordinates && (
          <div className="grid grid-cols-8 w-7/8 mb-3">
            {files.map((file) => (
              <div key={file} className="text-center text-white font-semibold">
                {file}
                <div className="bg-blue-500"></div>
              </div>
            ))}
          </div>
        )}

        <div className="flex border-gray-400">
          {/* RANK LABELS (left) */}
          {showCoordinates && (
            <div className="flex flex-col justify-between mr-4">
              {ranks.map((rank) => (
                <div
                  key={rank}
                  className="h-12 flex text-white items-center font-semibold"
                  style={{ height: "2rem" }}
                >
                  {rank}
                </div>
              ))}
            </div>
          )}

          {/* 8x8 BOARD */}
          <div className="grid grid-cols-8 grid-rows-8">
            {ranks.map((rank) =>
              files.map((file) => {
                const square = `${file}${rank}`;
                const isDark =
                  (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 1;
                const isHighlighted = square === highlightedSquare;
                return (
                  <div
                    key={square}
                    className={`relative flex items-center justify-center border border-gray-500
                      ${isDark ? "bg-gray-700" : "bg-white"}
                      ${isHighlighted ? "border-4 border-yellow-400" : ""}
                    `}
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    {showCoordinates && (
                      <div className="absolute top-1 left-1 text-xs text-blue-500">
                        {square}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* RANK LABELS (right) */}
          {showCoordinates && (
            <div className="flex flex-col justify-between ml-4">
              {ranks.map((rank) => (
                <div
                  key={rank}
                  className="h-12 flex items-center text-white font-semibold"
                  style={{ height: "3rem" }}
                >
                  {rank}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FILE LABELS (bottom) */}
        {showCoordinates && (
          <div className="grid grid-cols-8 w-7/8 mt-3">
            {files.map((file) => (
              <div key={file} className="text-center text-white font-semibold">
                {file}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
