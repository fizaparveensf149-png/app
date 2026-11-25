import { useState } from "react";

const matchesData = [
  {
    id: 1,
    sport: "Cricket",
    title: "Bengaluru Strikers vs Mysore Royals",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    dateTime: "Sat, 28 Nov 2026 • 7:00 PM",
    price: 850,
    seatsLeft: 42,
  },
  {
    id: 2,
    sport: "Football",
    title: "Deccan United vs Southside FC",
    venue: "Sree Kanteerava Stadium, Bengaluru",
    dateTime: "Sun, 29 Nov 2026 • 5:30 PM",
    price: 500,
    seatsLeft: 18,
  },
  {
    id: 3,
    sport: "Badminton",
    title: "Premier Smash League: Finals Night",
    venue: "Koramangala Indoor Arena, Bengaluru",
    dateTime: "Tue, 01 Dec 2026 • 6:30 PM",
    price: 650,
    seatsLeft: 9,
  },
];

function Navbar({ bookedCount, onResetBookings }) {
  return (
    <nav className="navbar">
      <div className="brand">BookMyMatch</div>
      <div className="nav-actions">
        <span className="badge">Booked Matches: {bookedCount}</span>
        {bookedCount > 0 && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetBookings}
          >
            Clear Bookings
          </button>
        )}
      </div>
    </nav>
  );
}

function Hero({ selectedSport, onSelectSport }) {
  const sports = ["All", "Cricket", "Football", "Badminton"];

  return (
    <header className="hero">
      <h1>Book Live Match Tickets</h1>
      <p>
        Pick a fixture, check live seat availability, and lock in your spot in
        seconds.
      </p>

      <div className="filter-group">
        {sports.map((sport) => (
          <button
            key={sport}
            type="button"
            className={selectedSport === sport ? "chip active" : "chip"}
            onClick={() => onSelectSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>
    </header>
  );
}

function MatchCard({ match, isBooked, onBook }) {
  const soldOut = match.seatsLeft === 0 && !isBooked;

  return (
    <article className="card">
      <div className="card-top">
        <span className="sport-tag">{match.sport}</span>
        <span className="price">₹{match.price}</span>
      </div>

      <h2>{match.title}</h2>
      <p className="meta">{match.venue}</p>
      <p className="meta">{match.dateTime}</p>
      <p className="seats">
        {isBooked
          ? "Seat confirmed for this match"
          : soldOut
          ? "Sold out"
          : `${match.seatsLeft} seats left`}
      </p>

      <button
        type="button"
        className={isBooked ? "btn-booked" : "btn-primary"}
        disabled={isBooked || soldOut}
        onClick={() => onBook(match.id)}
      >
        {isBooked ? "Booked ✓" : soldOut ? "Sold Out" : "Book Seat"}
      </button>
    </article>
  );
}

export default function App() {
  const [matches, setMatches] = useState(matchesData);
  const [bookedIds, setBookedIds] = useState([]);
  const [selectedSport, setSelectedSport] = useState("All");

  function handleBookMatch(matchId) {
    if (bookedIds.includes(matchId)) return;

    setMatches((prevMatches) =>
      prevMatches.map((item) =>
        item.id === matchId && item.seatsLeft > 0
          ? { ...item, seatsLeft: item.seatsLeft - 1 }
          : item
      )
    );

    setBookedIds((prevIds) => [...prevIds, matchId]);
  }

  function handleResetBookings() {
    setMatches(matchesData);
    setBookedIds([]);
  }

  const visibleMatches =
    selectedSport === "All"
      ? matches
      : matches.filter((m) => m.sport === selectedSport);

  return (
    <div className="app">
      <Navbar
        bookedCount={bookedIds.length}
        onResetBookings={handleResetBookings}
      />

      <main className="container">
        <Hero
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        <section className="grid">
          {visibleMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isBooked={bookedIds.includes(match.id)}
              onBook={handleBookMatch}
            />
          ))}
        </section>
      </main>
    </div>
  );
}