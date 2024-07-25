import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizCard from "../../components/quizcard/QuizCard";
import "./userindex.scss";
import { useParams } from "react-router-dom";

function UserIndex() {
  const [level, setLevel] = useState("");
  const userName = useParams();
  const leaderBoard = (
    JSON.parse(localStorage.getItem("leaderBoard")) || []
  ).sort((a, b) => {
    return b.score - a.score;
  });
  const levels = ["Easy", "Moderate", "Hard"];
  const backHome = () => {
    setLevel("");
  };

  const leaderBoardFn = (score) => {
    const newLeaderBoard = [...leaderBoard];
    const userIndex = newLeaderBoard.findIndex(
      (item) => item.name === userName.username
    );
    if (userIndex !== -1) {
      newLeaderBoard[userIndex].score = score;
    } else {
      newLeaderBoard.push({ name: userName.username, score: score });
    }
    console.log(newLeaderBoard);
    localStorage.setItem("leaderBoard", JSON.stringify(newLeaderBoard));
  };

  return (
    <>
      <Navbar />
      {level ? (
        <QuizCard
          level={level}
          username={userName.username}
          backHome={backHome}
          leaderBoard={leaderBoardFn}
        />
      ) : (
        <>
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
          <div className="leader-board">
            <div className="heading">
              <h1>Leader Board</h1>
            </div>
            <div className="content">
              {leaderBoard.length > 0 ? (
                <ul>
                  {leaderBoard.map((item, index) => {
                    return (
                      <li key={index}>
                        <span className="first">
                          <span>
                            #<span className="rank">{index + 1}</span>
                          </span>
                          <p className="leader-name">{item.name}</p>
                        </span>
                        <p>
                          {item.score}
                          <span>pts</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="error leader-error">No data found</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserIndex;
