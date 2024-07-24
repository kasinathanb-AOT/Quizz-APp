import React, { useState } from "react";
import { quiz } from "../../utils/dataSet";
import "./quizcard.scss";

function QuizCard({ level }) {
  const formattedLevel = level.toLowerCase();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const quizData = quiz.levels[formattedLevel];
  const defaultScore = quizData.perQuestionScore;

  const handleAnswer = (choice) => {
    setSelectedAnswer(choice);
    setDisabled(true);
    const isCorrect = choice === quizData.questions[currentIndex].correctAnswer;

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = {
      chosenAnswer: choice,
    };
    setUserAnswers(newUserAnswers);
    console.log(userAnswers);
    if (isCorrect) {
      setScore((prevScore) => prevScore + defaultScore);
    } else {
      console.log("Wrong answer");
    }
    setTimeout(handleNext, 1000);
  };

  const handleNext = () => {
    if (currentIndex !== quizData.totalQuestions - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setDisabled(false);
      setSelectedAnswer(userAnswers[currentIndex + 1]?.chosenAnswer || "");
    }
  };

  return (
    <div className="quiz-card">
      {quizData ? (
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
      ) : (
        <p>No quiz data available for this level.</p>
      )}
    </div>
  );
}

export default QuizCard;
