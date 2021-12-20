import { useContext, Fragment } from "react";

import classes from "./Winner.module.css";
import roundContext from "../../store/round";

const Winner = () => {
  const roundCtx = useContext(roundContext);

  return (
    <div className={classes.winnerDiv}>
      {roundCtx.gameState === "STAND" && (
        <Fragment>
          <h2>
            {" "}
            {roundCtx.winner != "DRAW"
              ? `The winner is: ${roundCtx.winner}`
              : "DRAW"}
          </h2>
          <div>
            <h4>
              Computer:{" "}
              {roundCtx.computerPoint.length === 0 && (
                <span style={{ color: "red" }}>BUSTED</span>
              )}
              {roundCtx.computerPoint.length > 1
                ? Math.max(...roundCtx.computerPoint)
                : roundCtx.computerPoint[0]}
            </h4>

            <h4>
              Player:{" "}
              {roundCtx.playerPoint.length === 0 && (
                <span style={{ color: "red" }}>BUSTED</span>
              )}
              {roundCtx.playerPoint.length > 1
                ? Math.max(...roundCtx.playerPoint)
                : roundCtx.playerPoint[0]}
            </h4>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Winner;
