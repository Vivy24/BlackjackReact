import { useContext, Fragment } from "react";

import classes from "./Winner.module.css";
import roundContext from "../../store/round";

import Button from "../UI/button";

const Winner = () => {
  const roundCtx = useContext(roundContext);
  const resetOnHandler = () => {
    roundCtx.resetRound();
    roundCtx.addResult("C");
    roundCtx.addResult("P");
  };

  return (
    <div className={classes.winnerDiv}>
      {roundCtx.gameState === "STAND" && (
        <Fragment>
          <div>
            <h2>
              Dealer Score:{" "}
              {roundCtx.computerPoint.length === 0 && (
                <span style={{ color: "red" }}>BUSTED</span>
              )}
              {roundCtx.computerPoint.length > 1
                ? Math.max(...roundCtx.computerPoint)
                : roundCtx.computerPoint[0]}
            </h2>

            <h2>
              Player Score:{" "}
              {roundCtx.playerPoint.length === 0 && (
                <span style={{ color: "red" }}>BUSTED</span>
              )}
              {roundCtx.playerPoint.length > 1
                ? Math.max(...roundCtx.playerPoint)
                : roundCtx.playerPoint[0]}
            </h2>
            <h3>
              {" "}
              {roundCtx.winner != "DRAW"
                ? `The winner is: ${roundCtx.winner}`
                : "DRAW"}
            </h3>
            <Button onClick={resetOnHandler}>Reset Game!</Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Winner;
