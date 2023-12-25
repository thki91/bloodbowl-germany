const FlipCard = ({ front, back }) => {
  return (
    <div className="flip-card flex-1">
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
};
export default FlipCard;
