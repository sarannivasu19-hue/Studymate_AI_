import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FlashCard from "../components/FlashCard";
import FlashNavigation from "../components/FlashNavigation";

import { generateFlashcards } from "../services/flashcardApi";

export default function Flashcards() {
  const [topic, setTopic] = useState("");
  const [numberOfCards, setNumberOfCards] = useState(10);

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);

  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateFlashcards(
        topic,
        numberOfCards
      );

      setCards(result.flashcards);
      setCurrentCard(0);
    } catch (err) {
      console.error(err);
      alert("Unable to generate flashcards.");
    }

    setLoading(false);
  }

  function previousCard() {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  }

  function nextCard() {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  }

  function clearCards() {
    setCards([]);
    setTopic("");
    setCurrentCard(0);
  }

  return (
    <div
      style={{
        display: "flex",
        background: "#F3F4F6",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div
          style={{
            padding: "30px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h1
            style={{
              color: "#2563EB",
            }}
          >
            🃏 AI Flashcards
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "30px",
            }}
          >
            Generate interactive flashcards for any topic.
          </p>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <label>
              <strong>Topic</strong>
            </label>

            <br />
            <br />

            <input
              type="text"
              placeholder="Example: Machine Learning"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #D1D5DB",
                fontSize: "16px",
              }}
            />

            <br />
            <br />

            <label>
              <strong>Number of Flashcards</strong>
            </label>

            <br />
            <br />

            <select
              value={numberOfCards}
              onChange={(e) =>
                setNumberOfCards(Number(e.target.value))
              }
              style={{
                width: "220px",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              <option value={5}>5 Cards</option>
              <option value={10}>10 Cards</option>
              <option value={15}>15 Cards</option>
              <option value={20}>20 Cards</option>
            </select>

            <br />
            <br />

            <button
              onClick={handleGenerate}
              style={{
                background: "#2563EB",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loading
                ? "Generating..."
                : "🃏 Generate Flashcards"}
            </button>

            <button
              onClick={clearCards}
              style={{
                marginLeft: "15px",
                background: "#EF4444",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Clear
            </button>
          </div>

          <br />

          {cards.length === 0 ? (
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "60px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <h2>🃏 Study with AI Flashcards</h2>

              <p
                style={{
                  color: "#6B7280",
                }}
              >
                Enter a topic and generate AI-powered flashcards.
              </p>
            </div>
          ) : (
            <>
              <FlashCard
                front={cards[currentCard].front}
                back={cards[currentCard].back}
              />

              <FlashNavigation
                current={currentCard}
                total={cards.length}
                onPrevious={previousCard}
                onNext={nextCard}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}