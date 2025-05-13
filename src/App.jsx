import React, { useState } from "react";
import "./index.css";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"]; // left→right from White POV
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]; // top→bottom from White POV

// ---------- tweak this to scale the entire board ----------
const SQUARE_SIZE_REM = 4; // one square = 4.5 rem
// ----------------------------------------------------------

const getRandomSquare = () => {
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
  return `${randomFile}${randomRank}`;
};

const App = () => {
  const [mode, setMode] = useState("learn"); // "learn" | "start"
  const [highlightedSquare, setHighlightedSquare] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [flipped, setFlipped] = useState(false); // false = White POV, true = Black POV

  const showCoordinates = mode === "learn";

  // arrays to render, reversed when flipped
  const filesDisplay = flipped ? [...files].reverse() : files;
  const ranksDisplay = flipped ? [...ranks].reverse() : ranks;

  const boardWidth = `${SQUARE_SIZE_REM * 8}rem`; // used for file‑label rows

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
    if (userGuess.trim().toLowerCase() === highlightedSquare.toLowerCase()) {
      setUserGuess("");
      setHighlightedSquare(getRandomSquare());
    } else {
      handleLearnMode(); // wrong → back to learn mode
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-800 p-4">
      {/* ── Title ───────────────────────────────────────────── */}
      <div className="bg-pink-400 rounded-lg px-4 py-2 mb-4">
        <h1 className="text-2xl text-white font-bold">
          Chessboard Memorization
        </h1>
      </div>

      {/* ── Mode / Flip buttons ─────────────────────────────── */}
      <div className="mb-4 w-1/3 flex justify-around space-x-2">
        {mode == "start" && (
          <button
            onClick={handleLearnMode}
            className={`px-4 py-2 hover:scale-110 w-24 transition rounded bg-blue-400 text-white
            }`}
          >
            Learn
          </button>
        )}
        <button
          onClick={handleStartMode}
          className={`px-4 py-2 hover:scale-110 w-24 font-bold text-white transition rounded ${
            mode === "start"
              ? "bg-green-600 text-white"
              : "bg-orange-700 hover:bg-gray-400"
          }`}
        >
          Start
        </button>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="px-4 py-2 hover:scale-110 transition w-24 rounded bg-purple-600 text-white"
        >
          Flip
        </button>
      </div>

      {/* ── Guess box (Start mode) ──────────────────────────── */}
      {mode === "start" && (
        <form onSubmit={handleGuessSubmit} className="mb-4 flex space-x-2">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="e.g. f3"
            className="border border-white p-2 rounded text-white placeholder-gray-400"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Guess
          </button>
        </form>
      )}

      {/* ── Board & coordinates ─────────────────────────────── */}
      <div className="relative flex flex-col items-center">
        {/* File labels (top) */}
        {showCoordinates && (
          <div className="grid grid-cols-8 mb-3" style={{ width: boardWidth }}>
            {filesDisplay.map((f) => (
              <div key={f} className="text-center text-white font-semibold">
                {f}
              </div>
            ))}
          </div>
        )}

        <div className="flex">
          {/* Rank labels (left) */}
          {showCoordinates && (
            <div className="flex flex-col justify-between mr-4">
              {ranksDisplay.map((r) => (
                <div
                  key={r}
                  className="flex items-center text-white font-semibold"
                  style={{ height: `${SQUARE_SIZE_REM}rem` }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}

          {/* 8×8 board */}
          <div className="grid grid-cols-8 grid-rows-8">
            {ranksDisplay.map((rank) =>
              filesDisplay.map((file) => {
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
                    style={{
                      width: `${SQUARE_SIZE_REM}rem`,
                      height: `${SQUARE_SIZE_REM}rem`,
                    }}
                  >
                    {showCoordinates && (
                      <div className="absolute top-1 left-1 text-sm text-blue-500">
                        {square}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Rank labels (right) */}
          {showCoordinates && (
            <div className="flex flex-col justify-between ml-4">
              {ranksDisplay.map((r) => (
                <div
                  key={r}
                  className="flex items-center text-white font-semibold"
                  style={{ height: `${SQUARE_SIZE_REM}rem` }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* File labels (bottom) */}
        {showCoordinates && (
          <div className="grid grid-cols-8 mt-3" style={{ width: boardWidth }}>
            {filesDisplay.map((f) => (
              <div key={f} className="text-center text-white font-semibold">
                {f}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
