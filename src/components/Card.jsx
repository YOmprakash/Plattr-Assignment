const Card = ({ card, onCardClick }) => {
  const handleClick = () => {
    if (!card.flipped && !card.matched) {
      onCardClick(card);
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`relative w-[120px] h-[120px] m-2 border-2 rounded-md cursor-pointer transition-transform duration-700 ease-in-out shadow-lg ${
        card.matched ? "bg-green-300 border-green-500 border-3" : "border-gray-300"
      } hover:scale-105`}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-700 transform ${
          card.flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute flex items-center justify-center w-full h-full rounded-md bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-2xl font-bold text-white drop-shadow-md">?</span>
        </div>

        {/* Back Side */}
        <div
          className="absolute flex items-center justify-center w-full h-full rounded-md rotate-y-180"
          style={{ backfaceVisibility: "hidden" }}
        >
          {card.flipped && (
            <img
              src={card.imgUrl}
              alt="Card"
              className="object-cover w-full h-full rounded-md"
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default Card;
