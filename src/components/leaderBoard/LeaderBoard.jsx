import React from "react";
import "./leaderBoard.scss";

const LeaderBoard = ({ leaderBoard, userName, animationClass }) => {

  
  return (
    <div className={`leader-board ${animationClass}`}>
      <div className="heading">
        <h1>Leader Board</h1>
      </div>
      <div className="content">
        {leaderBoard.length > 0 ? (
          <ul>
            {leaderBoard.map((item, index) => (
              <li
                key={item._id}
                style={{
                  background: userName === item.userName ? "#d3ede8" : "",
                  color: userName === item.userName ? "#000" : "",
                }}
              >
                <span className="first">
                  <span>
                    #<span className="rank">{index + 1}</span>
                  </span>
                  <p className="leader-name">
                    {userName === item.userName ? "You" : item.userName}
                  </p>
                </span>
                <p>
                  {item.score}
                  <span>pts</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="error leader-error">No data found</p>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;