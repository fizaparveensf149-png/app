
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {
  const [matches, setMatches] = useState([]);

  // Fetch matches from Supabase
  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*");

    if (error) {
      console.error("Error fetching matches:", error);
    } else {
      setMatches(data);
    }
  }

  // Fetch matches and enable realtime updates
  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches"
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Book ticket
  async function handleBook(match) {
    const customer_name = prompt("Enter your name:");
    if (!customer_name) return;

    const email = prompt("Enter your email:");
    if (!email) return;

    const tickets = Number(
      prompt("Enter number of tickets:")
    );

    if (
      !Number.isInteger(tickets) ||
      tickets <= 0 ||
      tickets > match.available_seats
    ) {
      alert("Invalid ticket quantity or insufficient seats");
      return;
    }

    // Insert booking
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([{
        customer_name,
        email,
        match_id: match.id,
        tickets,
        total_price: tickets * match.price
      }]);

    if (bookingError) {
      alert(bookingError.message);
      return;
    }

    // Update available seats
    const { error: updateError } = await supabase
      .from("matches")
      .update({
        available_seats: match.available_seats - tickets
      })
      .eq("id", match.id);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    alert("Booking successful!");

    fetchMatches();
  }

  return (
    <>
      <Navbar />
      <Hero />

      <section id="matches">
        <h2>Upcoming Matches</h2>

        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onBook={handleBook}
          />
        ))}
      </section>
    </>
  );
}

export default App;
