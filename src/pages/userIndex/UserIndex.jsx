import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizCard from "../../components/quizcard/QuizCard";
import "./userindex.scss";
import { useParams } from "react-router-dom";

function UserIndex() {
  const [level, setLevel] = useState("");
  const userName = useParams();

  const levels = ["Easy", "Moderate", "Hard"];
  return (
    <>
      <Navbar />
      {level ? (
        <QuizCard level={level} username={userName.username} />
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
