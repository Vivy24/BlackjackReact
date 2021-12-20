import { useContext } from "react";

import roundContext from "../../store/round";

const Score = () => {
  const roundCtx = useContext(roundContext);

  const dealScore = () => {
    if (!roundCtx.computerCards[0].point) {
      return `1,10`;
    }
    return `${roundCtx.computerCards[0].point}`;
  };
  const playerScore = () => {
    if (roundCtx.playerPoint.length > 1) {
      let result = "";
      for (const point in roundCtx.playerPoint) {
        result += `${roundCtx.playerPoint[point]}`;
        result += `,`;
      }
      return result.slice(0, -1);
    }
    return `${roundCtx.playerPoint[0]}`;
  };

  return (
    <div>
      <h2>
        Dealer Score: {roundCtx.gameState === "" && 0}
        {roundCtx.gameState === "DEAL" && dealScore()}
      </h2>
      {
        <h2>
          Player Score:
          {roundCtx.gameState === "" && 0}
          {(roundCtx.gameState === "DEAL" || roundCtx.gameState === "STAND") &&
            roundCtx.playerPoint.length !== 0 &&
            playerScore()}{" "}
        </h2>
      }
    </div>
  );
};

export default Score;

//roundCtx.gameState ==='' && roundCtx.gameState !=='STAND' ? dealScore() : 0
