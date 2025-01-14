import { useState } from "react";
import "./App.css";

function Cellule({ param, click }) {
  // const [valeur, setValeur] = useState(null);
  //var [compteur, setCompteur] = useState(0);
  return (
    <button className="croix" onClick={click}>
      {param}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Tableau({ squares, onPlay }) {
  const [tableau, setTableau] = useState(Array(9).fill(null));
  let [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (tableau[i] || calculateWinner(tableau)) {
      return;
    }

    const nextCellule = tableau.slice();

    if (nextCellule[i] === "X") {
      return;
    }
    if (nextCellule[i] === "O") {
      return;
    } else {
      if (xIsNext === true) {
        nextCellule[i] = "X";
        setTableau(nextCellule);
        setXIsNext((xIsNext = false));
      } else {
        nextCellule[i] = "O";
        setTableau(nextCellule);
        setXIsNext((xIsNext = true));
      }
      onPlay(nextCellule);
    }
  }

  const winner = calculateWinner(tableau);
  let status;
  if (winner) {
    status = winner + " a gagné";
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="ligne">
        <Cellule param={tableau[0]} click={() => handleClick(0)} />
        <Cellule param={tableau[1]} click={() => handleClick(1)} />
        <Cellule param={tableau[2]} click={() => handleClick(2)} />
      </div>

      <div className="ligne">
        <Cellule param={tableau[3]} click={() => handleClick(3)} />
        <Cellule param={tableau[4]} click={() => handleClick(4)} />
        <Cellule param={tableau[5]} click={() => handleClick(5)} />
      </div>

      <div className="ligne">
        <Cellule param={tableau[6]} click={() => handleClick(6)} />
        <Cellule param={tableau[7]} click={() => handleClick(7)} />
        <Cellule param={tableau[8]} click={() => handleClick(8)} />
      </div>
    </>
  );
}

//fonction principale
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Tableau
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
