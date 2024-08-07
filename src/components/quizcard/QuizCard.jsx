import React, { useEffect, useState } from "react";
import { fetchQuizData } from "../../services/userServices";
import "./quizcard.scss";
import Loader from "../loader/Loader";

function QuizCard({ level, username, leaderBoard, exit }) {
  const formattedLevel = level.toLowerCase();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [btnText, setBtnText] = useState("Exit");
  const [defaultScore, setDefaultScore] = useState(0);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQuizData(formattedLevel);

        const quiz = response.find((quiz) => quiz.level === formattedLevel);
        if (quiz) {
          setQuizData(quiz);
          setDefaultScore(quiz.perQuestionScore);
        } else {
          console.error("No quiz found for the level:", formattedLevel);
        }
      } catch (error) {
        console.error("Error fetching the quiz:", error);
      }
    };

    fetchData();
  }, [formattedLevel]);

  useEffect(() => {
    setBtnText(currentIndex === 0 ? "Exit" : "Back");
  }, [currentIndex]);

  useEffect(() => {
    if (isQuizComplete) {
      leaderBoard(score);
    }
  }, [isQuizComplete, score]);

  const handleAnswer = (choice) => {
    if (!quizData) return;

    setSelectedAnswer(choice);
    setDisabled(true);
    const isCorrect = choice === quizData.questions[currentIndex].correctAnswer;
    if (isCorrect) setScore((prevScore) => prevScore + defaultScore);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = { chosenAnswer: choice };
    setUserAnswers(newUserAnswers);

    if (currentIndex === quizData.questions.length - 1) {
      setIsQuizComplete(true);
    } else {
      setTimeout(handleNext, 1000);
    }
  };

  const handleExit = () => {
    exit();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setDisabled(false);
    setSelectedAnswer(userAnswers[currentIndex + 1]?.chosenAnswer || "");
  };

  const handleBackOrExit = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setSelectedAnswer(userAnswers[currentIndex - 1]?.chosenAnswer || "");
    } else {
      handleExit();
    }
  };

  if (!quizData) return <Loader />;
  return (
    <div className="quiz-page">
      {isQuizComplete ? (
        <div className="quiz-score">
          <h2 className="username">Hi {username}</h2>
          <h2>Quiz Completed</h2>
          <p>Your Score: {score}</p>
          <p>Wrong Score: {userAnswers.length * defaultScore - score}</p>
          <button className="back-btn" onClick={handleExit}>
            Back Home
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <div className="quiz-card-content">
            <div className="q-no-container">
              <p className="q-no">
                <span className="current-q-no">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                / {quizData.questions.length}
              </p>
            </div>
            <div className="questions">
              <p>{quizData.questions[currentIndex].question}</p>
              <ul>
                {quizData.questions[currentIndex].choices.map((choice, i) => (
                  <li
                    key={i}
                    onClick={() => !isDisabled && handleAnswer(choice)}
                    style={{
                      background:
                        selectedAnswer === choice
                          ? selectedAnswer ===
                            quizData.questions[currentIndex].correctAnswer
                            ? "#0BDA51"
                            : "#FF5733"
                          : "",
                      pointerEvents: isDisabled ? "none" : "auto",
                    }}
                  >
                    {choice}
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn-container">
              <button onClick={handleBackOrExit}>{btnText}</button>
              <button
                onClick={handleNext}
                disabled={currentIndex === quizData.questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
