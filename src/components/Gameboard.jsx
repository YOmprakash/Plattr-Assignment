import Card from "./Card";
import uniqueCards from "../assets/imgsData";
import { useState, useEffect } from "react";

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const initializedCards = () => {
    const initializedCards = [...uniqueCards, ...uniqueCards].map((card) => ({
      ...card,
      uniqueId: Math.random(),
      flipped: false,
      matched: false,
    }));
    setCards(initializedCards.sort(() => Math.random() - 0.5));
  }
  // Initialize and shuffle cards
  useEffect(() => {
    initializedCards()
resetGame()
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isGameActive) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };
// Card click handler
  const handleCardClick = (clickedCard) => {
    // Prevent flipping more than two cards at a time
    if (choiceOne && choiceTwo) return;

    setMoves((prev) => prev + 1);

    const updatedCards = cards.map((card) =>
      card.uniqueId === clickedCard.uniqueId ? { ...card, flipped: true } : card
    );

    setCards(updatedCards);

    if (!choiceOne) {
      setChoiceOne(clickedCard);
    } else {
      setChoiceTwo(clickedCard);

      if (choiceOne.imgUrl === clickedCard.imgUrl) {
        setScore((prev) => prev + 1);
        const matchedCards = updatedCards.map((card) =>
          card.imgUrl === choiceOne.imgUrl
            ? { ...card, matched: true }
            : card
        );
        setCards(matchedCards);
        resetTurn();
      } else {
        // Flip cards back after a delay if they don't match
        setTimeout(() => {
          const resetCards = updatedCards.map((card) =>
            card.uniqueId === choiceOne.uniqueId ||
            card.uniqueId === clickedCard.uniqueId
              ? { ...card, flipped: false }
              : card
          );
          setCards(resetCards);
          resetTurn();
        }, 1000);
      }
    }
  };

  // Format time
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const resetGame = () => {
    setTimer(0);
    setMoves(0);
    setScore(0);
  }
  const gridColsClass =
  difficulty === "easy" ? "grid-cols-4" : difficulty === "medium" ? "grid-cols-6" : "grid-cols-8";
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-6">
      <h1 className="mb-3 text-3xl font-bold">Memory Game</h1>

      {/* Timer and Moves */}
      <div className="flex gap-6 mb-4 text-lg">
        <span>
          <strong>Timer:</strong> {formatTime(timer)}
        </span>
        <span>
          <strong>Moves:</strong> {moves}
        </span>
        <span>
          <strong>Score:</strong> {score}
        </span>

            {/* Difficulty Options */}
            <div className="mb-6">
        <label htmlFor="difficulty" className="mr-4 text-lg font-medium">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="easy">Easy (4x4)</option>
          <option value="medium">Medium (6x6)</option>
          <option value="hard">Hard (8x8)</option>
        </select>
      </div>
      
      </div>

      {/* Cards Grid */}
      <ul className={`grid gap-2 ${gridColsClass}`}>
        {cards.map((card) => (
          <Card key={card.uniqueId} card={card} onCardClick={handleCardClick} />
        ))}
      </ul>
      <button type="button" className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-md" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default GameBoard;
