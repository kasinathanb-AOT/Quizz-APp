import React, { useState } from "react";
import { quiz } from "../../utils/dataSet";
import "./quizcard.scss";

function QuizCard({ level, username, backHome, leaderBoard }) {
  const formattedLevel = level.toLowerCase();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const quizData = quiz.levels[formattedLevel];
  const defaultScore = quizData.perQuestionScore;

  const handleAnswer = (choice) => {
    setSelectedAnswer(choice);
    setDisabled(true);
    const isCorrect = choice === quizData.questions[currentIndex].correctAnswer;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = { chosenAnswer: choice };
    setUserAnswers(newUserAnswers);
    if (isCorrect) setScore((prevScore) => prevScore + defaultScore);
    setTimeout(handleNext, 1000);
  };

  const handleNext = () => {
    if (currentIndex < quizData.totalQuestions - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setDisabled(false);
      setSelectedAnswer(userAnswers[currentIndex + 1]?.chosenAnswer || "");
    } else {
      setIsQuizComplete(true);
      leaderBoard(score);
    }
  };

  return (
    <div className="quiz-page">
      {isQuizComplete ? (
        <>
          <div className="quiz-score">
            <h2 className="username">Hi {username}</h2>
            <h2>Quiz Completed</h2>
            <p>Your Score: {score}</p>
            <p>Correct Score: {score}</p>
            <p>Wrong Score: {userAnswers.length * defaultScore - score}</p>
            <button className="back-btn" onClick={backHome}>
              Back Home
            </button>
          </div>
        </>
      ) : (
        quizData && (
          <div className="quiz-card">
            <div className="quiz-card-content">
              <div className="q-no-container">
                <p className="q-no">
                  <span className="current-q-no">
                    {String(currentIndex + 1).padStart(2, 0)}
                  </span>
                  / {quizData.totalQuestions}
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
                <button
                  onClick={handleNext}
                  disabled={currentIndex === quizData.totalQuestions - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default QuizCard;
