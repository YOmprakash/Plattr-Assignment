import Card from "./Card";
import uniqueCards from "../assets/imgsData";
import { useState, useEffect } from "react";

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
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
  };

  // Initialize and shuffle cards
  useEffect(() => {
    initializedCards();
    resetGame();
  }, []);

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
        if (matchedCards.every((card) => card.matched)) {
          setIsGameActive(false); // Stop the timer
        }
      } else {
        setScore((prev) => prev - 1);
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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const resetGame = () => {
    setTimer(0);
    setMoves(0);
    setScore(0);
    setIsGameActive(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    initializedCards();
    setIsGameActive(true);
  };

 

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
    <h1 className="mb-3 text-4xl font-extrabold text-gray-800 drop-shadow-lg">Memory Game</h1>
  
    {/* Timer and Moves */}
    <div className="flex gap-6 mb-4 text-lg font-semibold text-gray-800">
      <span>
        <strong>Timer:</strong> {formatTime(timer)}
      </span>
      <span>
        <strong>Moves:</strong> {moves}
      </span>
      <span>
        <strong>Score:</strong> {score}
      </span>
    </div>
  
    {/* Cards Grid */}
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.uniqueId} card={card} onCardClick={handleCardClick} />
      ))}
    </ul>
  
    <button
      type="button"
      className="px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded-md shadow-lg hover:bg-red-400 hover:shadow-xl"
      onClick={resetGame}
    >
      Reset Game
    </button>
  </div>
  
  );
};

export default GameBoard;
