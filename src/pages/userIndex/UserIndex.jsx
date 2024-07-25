import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizCard from "../../components/quizcard/QuizCard";
import "./userindex.scss";
import { useParams } from "react-router-dom";

function UserIndex() {
  const [level, setLevel] = useState("");
  const userNamePara = useParams();
  const userName = userNamePara.username;
  const [boardStatus, setBoardStatus] = useState(false);

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
    const userIndex = leaderBoard.findIndex((item) => item.name === userName);
    if (userIndex !== -1) {
      if (score > leaderBoard[userIndex].score) {
        leaderBoard[userIndex].score = score;
      }
    } else {
      leaderBoard.push({ name: userName, score: score });
    }
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  };

  const toggleLeaderBoard = () => {
    setBoardStatus(!boardStatus);
  };
  return (
    <div className="main">
      <Navbar />
      {level ? (
        <QuizCard
          level={level}
          username={userName}
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
          {boardStatus ? (
            <div className={`leader-board ${boardStatus ? "show" : "hide"}`}>
              <div className="heading">
                <h1>Leader Board</h1>
              </div>
              <div className="content">
                {leaderBoard.length > 0 ? (
                  <ul>
                    {leaderBoard.map((item, index) => {
                      return (
                        <li
                          key={index}
                          style={{
                            background: userName === item.name ? "#d3ede8" : "",
                            color: userName === item.name ? "#000" : "",
                          }}
                        >
                          <span className="first">
                            <span>
                              #<span className="rank">{index + 1}</span>
                            </span>
                            <p className="leader-name">
                              {userName === item.name ? "You" : item.name}
                            </p>
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
          ) : (
            ""
          )}
        </>
      )}
      {!level ? (
        <button className="show-btn" onClick={() => toggleLeaderBoard()}>
          Show Leader Board
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserIndex;
