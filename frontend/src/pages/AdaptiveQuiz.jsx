import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import QuizCard from "../components/QuizCard";
import QuizProgress from "../components/QuizProgress";
import QuizResult from "../components/QuizResult";

import { generateQuiz } from "../services/quizApi";

export default function AdaptiveQuiz() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  async function startQuiz() {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const data = await generateQuiz(
        topic,
        difficulty,
        numberOfQuestions
      );

      setQuestions(data.questions);
      setCurrentQuestion(0);
      setAnswers({});
      setQuizFinished(false);
    } catch (error) {
      console.error(error);
      alert("Unable to generate quiz.");
    }

    setLoading(false);
  }

  function selectAnswer(answer) {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    });
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function calculateScore() {
    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correct_answer) {
        score++;
      }
    });

    return score;
  }

  function restartQuiz() {
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizFinished(false);
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

        <div style={{ padding: 30 }}>
          <h1>🧠 Adaptive AI Quiz</h1>

          {questions.length === 0 && (
            <>
              <br />

              <input
                placeholder="Enter Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{
                  width: "60%",
                  padding: 12,
                  fontSize: 16,
                }}
              />

              <br />
              <br />

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                style={{
                  padding: 12,
                  width: 220,
                }}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <br />
              <br />

              <select
                value={numberOfQuestions}
                onChange={(e) =>
                  setNumberOfQuestions(Number(e.target.value))
                }
                style={{
                  padding: 12,
                  width: 220,
                }}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
              </select>

              <br />
              <br />

              <button
                onClick={startQuiz}
                style={{
                  background: "#2563EB",
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                {loading ? "Generating..." : "Generate Quiz"}
              </button>
            </>
          )}

          {questions.length > 0 && !quizFinished && (
            <>
              <br />

              <QuizProgress
                current={currentQuestion + 1}
                total={questions.length}
              />

              <QuizCard
                question={questions[currentQuestion]}
                selectedAnswer={answers[currentQuestion]}
                setSelectedAnswer={selectAnswer}
              />

              <br />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>

                <button onClick={nextQuestion}>
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next"}
                </button>
              </div>
            </>
          )}

          {quizFinished && (
            <QuizResult
              score={calculateScore()}
              total={questions.length}
              restartQuiz={restartQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}