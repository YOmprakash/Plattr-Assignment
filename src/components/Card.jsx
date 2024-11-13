const Card = ({ card, onCardClick }) => {
  const handleClick = () => {
    if (!card.flipped && !card.matched) {
      onCardClick(card);
    }
  };

  return (
    <li
      onClick={handleClick}
      className="relative w-[150px] h-[150px] cursor-pointer perspective"
    >
      <div
        className={`absolute w-full h-full rounded-md transition-transform duration-500 transform ${
          card.flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of the Card */}
        <div className="absolute flex items-center justify-center w-full h-full bg-blue-500 rounded-md shadow-md">
          {/* Card Back */}
        </div>
        
        {/* Back of the Card (Image) */}
        <div className="absolute flex items-center justify-center w-full h-full transform bg-white rounded-md ">
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
