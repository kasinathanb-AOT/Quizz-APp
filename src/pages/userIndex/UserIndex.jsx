import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizCard from "../../components/quizcard/QuizCard";
import "./userindex.scss";
import { useParams } from "react-router-dom";
import LeaderBoard from "../../components/leaderBoard/LeaderBoard";
import { getLeaderBoard, updateUserScore } from "../../services/userServices";

function UserIndex() {
  const [level, setLevel] = useState("");
  const [boardStatus, setBoardStatus] = useState(false);
  const [animationClass, setAnimationClass] = useState("hide");
  const levels = ["Easy", "Moderate", "Hard"];
  const userNameParam = useParams();
  const userName = userNameParam.username
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  
  useEffect(() => {
    getLeaderBoard().then((data) => setLeaderBoardData(data));
  }, []);

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
    const userIndex = leaderBoardData.findIndex(
      (item) => item.userName === userName
    );

    if (userIndex !== -1) {
      if (score > leaderBoardData[userIndex].score) {
        updateUserScore(userName, score).then(() => {
          const updatedLeaderBoard = [...leaderBoardData];
          updatedLeaderBoard[userIndex].score = score;
          setLeaderBoardData(updatedLeaderBoard);
        });
      }
    } else {
      updateUserScore(userName, score).then(() => {
        getLeaderBoard().then((data) => setLeaderBoardData(data));
      });
    }
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
