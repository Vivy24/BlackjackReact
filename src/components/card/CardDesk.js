import { useContext, useEffect } from "react";

import ComputerCard from "./ComputerCard";
import Score from "./Score";
import Winner from "./Winner";
import PlayerCard from "./PlayerCard";

import roundContext from "../../store/round";

const CardDesk = () => {
  const roundCtx = useContext(roundContext);
  let initalizeFirst = false;

  useEffect(() => {
    roundCtx.randomCard();
    roundCtx.addResult("C");
    roundCtx.addResult("P");

    initalizeFirst = true;
  }, []);

  useEffect(() => {
    if (initalizeFirst) {
      if (
        Math.max(...roundCtx.computerPoint) >= 21 ||
        Math.max(...roundCtx.playerPoint) >= 21
      ) {
        roundCtx.triggerStand();
        roundCtx.findWinner();
      }
    }
  }, [initalizeFirst]);

  return (
    <div>
      <ComputerCard />
      {roundCtx.gameState === "STAND" ? <Winner /> : <Score />}

      <PlayerCard />
    </div>
  );
};

export default CardDesk;
