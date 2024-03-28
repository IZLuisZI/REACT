function GameRatingCard({ gamerating, icon, descrition, className }) {
  return (
    <div className="general-rating">
      <span className="general-rating-individual-rate">
        {gamerating} <img className={className} src={icon} alt={descrition} />
      </span>
      <span className="rating-description">{descrition}</span>
    </div>
  );
}

export default GameRatingCard;
