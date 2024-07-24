import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizCard from "../../components/quizcard/QuizCard";
import "./userindex.scss";

function UserIndex() {
  const [level, setLevel] = useState("");

  const levels = ["Easy", "Moderate", "Hard"];

  return (
    <>
      <Navbar />
      {level ? (
        <QuizCard level={level} />
      ) : (
        <div className="quiz-card-container">
          <h2>Select your level</h2>
          <ul>
            {levels.map((item, index) => {
              return (
                <li
                  className={`quiz-card ${item.toLowerCase()}`}
                  key={index}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default UserIndex;
