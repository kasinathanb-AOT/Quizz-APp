import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizCard from "../../components/quizcard/QuizCard";
import "./userindex.scss";
import { useParams } from "react-router-dom";
import LeaderBoard from "../../components/leaderBoard/LeaderBoard";

function UserIndex() {
  const [level, setLevel] = useState("");
  const [boardStatus, setBoardStatus] = useState(false);
  const [animationClass, setAnimationClass] = useState("hide");
  const levels = ["Easy", "Moderate", "Hard"];
  const [leaderBoardData, setLeaderBoardData] = useState(
    JSON.parse(localStorage.getItem("leaderBoard")) || []
  );

  const handleExit = () => {
    setLevel("");
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
    };

    if (level) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [level]);

  const leaderBoardFn = (score) => {
    console.log("Function calling with score:", score);
    const updatedLeaderBoard = [...leaderBoardData];
    const userIndex = updatedLeaderBoard.findIndex(
      (item) => item.name === userName
    );
    if (userIndex !== -1) {
      if (score > updatedLeaderBoard[userIndex].score) {
        updatedLeaderBoard[userIndex].score = score;
      }
    } else {
      updatedLeaderBoard.push({ name: userName, score: score });
    }
    setLeaderBoardData(updatedLeaderBoard);
    localStorage.setItem("leaderBoard", JSON.stringify(updatedLeaderBoard));
  };

  const toggleLeaderBoard = () => {
    if (boardStatus) {
      setAnimationClass("hide");
      setTimeout(() => setBoardStatus(false), 200);
    } else {
      setBoardStatus(true);
      setAnimationClass("show");
    }
  };

  return (
    <div className="main">
      <Navbar />
      {level ? (
        <QuizCard
          level={level}
          username={userName}
          leaderBoard={leaderBoardFn}
          exit={handleExit}
        />
      ) : (
        <>
          <div className="quiz-card-container">
            <h2>Select your level</h2>
            <ul>
              {levels.map((item, index) => (
                <li
                  className={`quiz-card ${item.toLowerCase()}`}
                  key={index}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {boardStatus && (
            <LeaderBoard
              leaderBoard={leaderBoardData}
              userName={userName}
              animationClass={animationClass}
            />
          )}
        </>
      )}
      {!level && (
        <button className="show-btn" onClick={toggleLeaderBoard}>
          {boardStatus ? "Hide" : "Show"} Leader Board
        </button>
      )}
    </div>
  );
}

export default UserIndex;
