
function MatchCard({ match, onBook }) {
  return (
    <div className="match-card">
      <h3>{match.team1} VS {match.team2}</h3>

      <p>Date: {match.match_date}</p>
      <p>Venue: {match.venue}</p>
      <p>Available Seats: {match.available_seats}</p>
      <p>Ticket Price: ₹{match.price}</p>

      <button onClick={() => onBook(match)}>
        Book Ticket
      </button>
    </div>
  );
}

export default MatchCard;
