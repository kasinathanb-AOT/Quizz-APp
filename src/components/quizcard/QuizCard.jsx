import React, { useState } from "react";
import { quiz } from "../../utils/dataSet";
import "./quizcard.scss";
function QuizCard({ level }) {
  const formattedLevel = level.toLowerCase();
  const [currentIndex, setCurrentIndex] = useState(0);
  const quizData = quiz.levels[formattedLevel];
  // handle next
  const handleNext = () => {
    if (currentIndex != quizData.totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  // handle previous
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
                <li key={i}>{choice}</li>
              ))}
            </ul>
          </div>
          <div className="btn-container">
            <button onClick={() => handlePrev()}>Prev</button>
            <button onClick={() => handleNext()}>Next</button>
          </div>
        </div>
      ) : (
        <p>No quiz data available for this level.</p>
      )}
    </div>
  );
}

export default QuizCard;
