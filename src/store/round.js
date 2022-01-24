import React from "react";

const RoundContext = React.createContext({
  cards: [],
  computerCards: [],
  playerCards: [],
  computerPoint: [],
  playerPoint: [],
  gameState: "",
  winner: "",
  addCard: ({ storage, point, addType }) => {},
  randomCard: () => {},
  triggerDeal: () => {},
  triggerStand: () => {},
  addResult: (addType) => {},
  findWinner: () => {},
  resetRound: () => {},
});

export default RoundContext;
