import {useReducer} from 'react'

import {cardDesk} from './cardDeck'

import RoundContext from './round'

const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * 52)
    const randomizedCard = cardDesk[randomIndex];
  
    return randomizedCard
};

const defaultRoundContext = {
    cards:cardDesk,
    computerCards:[],
    playerCards:[],
    computerPoint:[0],
    playerPoint:[0],
    isDeal:false,
}

const roundReducer = (state, action) => {
  if (action.type === "RANDOM") {
    const cards = [...state.cards];
    const updatedComputerCards = [];
    const computerCard1 = randomCard();
    const computerCard1Index = cards.indexOf(computerCard1)
    updatedComputerCards.push(computerCard1);
    cards.splice(computerCard1Index,1);

    const computerCard2 = randomCard();
    const computerCard2Index = cards.indexOf(computerCard2)
    updatedComputerCards.push(computerCard2);
    cards.splice(computerCard2Index,1);

    const updatedPlayerCards = [];
    const playerCard1 = randomCard();
    const playerCard1Index = cards.indexOf(playerCard1)
    cards.splice(playerCard1Index,1);
    updatedPlayerCards.push(playerCard1);

    const playerCard2 = randomCard();
    const playerCard2Index = cards.indexOf(playerCard2)
    updatedPlayerCards.push(playerCard2);
    cards.splice(playerCard2Index,1);

    
    return {
      cards:cards,
      computerCards: updatedComputerCards,
      playerCards: updatedPlayerCards,
      computerPoint: state.computerPoint,
      playerPoint: state.playerPoint,
      isDeal: false,
    };
  }
   else if(action.type ==='ADD-PCARD'){
       const cards = [...state.cards];
       const updatedPlayerCards = [...state.playerCards]
       const playerScoring = [...state.playerPoint];
       let updatedPlayerScore = []

       const newCard = randomCard();
       updatedPlayerCards.push(newCard);
       cards.splice(updatedPlayerCards,1);

       if (!newCard.point){
        const point1 = playerScoring.map(point=>{
            return point+=1;
        })

        const point2 = playerScoring.map(point=>{
          return point+=10;
       })

       updatedPlayerScore = point1.concat(point2)
       console.log(updatedPlayerScore);
      }
       else {
        updatedPlayerScore = playerScoring.map((score)=>{
          return score+=newCard.point
        })
       }
       return {
        cards:cards,
        computerCards: state.computerCards,
        playerCards: updatedPlayerCards,
        computerPoint: state.computerPoint,
        playerPoint: updatedPlayerScore,
        isDeal: state.isDeal,
       }  

   }
   else if (action.type==='ADD-RESULTS'){
     if (action.cardtype === 'C'){
       const computerCards = [...state.computerCards]
       let computerPoints = [...state.computerPoint]
       computerCards.forEach(card => {
         if (!card.point){
           const computerPoint1 = computerPoints.map(point=>{
             console.log(point);
               return point+=1;
           })
  
           const computerPoint2 = computerPoints.map(point=>{
             return point+=10;
           })

           computerPoints = computerPoint1.concat(computerPoint2);

         }
         else {
           const computerPoint = computerPoints.map(point=>{
             return point+=card.point
           })
           computerPoints = computerPoint;
         }
       })

       return {
       cards:state.cards,
       computerCards: state.computerCards,
       playerCards: state.playerCards,
       computerPoint: computerPoints,
       playerPoint: state.playerPoint,
       isDeal: state.isDeal,
       }
     }
    else{
      const playerCards = [...state.playerCards]
      let playerPoints = [...state.playerPoint]

      playerCards.forEach(card => {
        if (!card.point){
          const playerPoint1 = playerPoints.map(point=>{
              return point+=1;
          })
 
          const playerPoint2 = playerPoints.map(point=>{
            return point+=10;
          })

          playerPoints = playerPoint1.concat(playerPoint2);

        }
        else {
          const playerPoint = playerPoints.map(point=>{
            return point+=card.point
          })
          playerPoints = playerPoint;
        }
      })

      return {
      cards:state.cards,
      computerCards: state.computerCards,
      playerCards: state.playerCards,
      computerPoint: state.computerPoint,
      playerPoint: playerPoints,
      isDeal: state.isDeal,
      }
    }
  
   }
  else if (action.type==="DEAL"){
      return {
        cards:state.cards,
        computerCards: state.computerCards,
        playerCards: state.playerCards,
        computerPoint: state.computerPoint,
        playerPoint: state.playerPoint,
        isDeal: true,
      }
  }
  return defaultRoundContext;
};

const RoundProvider = props =>{
    const [roundState, dispatchRoundAction] = useReducer(roundReducer,defaultRoundContext);

    const randomCardToStart = ()=> {
        dispatchRoundAction({type:'RANDOM'})
    }

    const triggerDeal = ()=>{
        dispatchRoundAction({type:'DEAL'})
    }

    const addResult = (addType) => {
      dispatchRoundAction({type:'ADD-RESULTS', cardtype:addType})
    }
    
    const addPlayerCard = () => {
      dispatchRoundAction({type:'ADD-PCARD'})
    }
 
    const roundContext = {
      cards: roundState.cards,
        computerCards: roundState.computerCards,
        playerCards: roundState.playerCards,
        computerPoint:roundState.computerPoint,
        playerPoint:roundState.playerPoint,
        isDeal: roundState.isDeal,
        randomCard: randomCardToStart,
        triggerDeal: triggerDeal,
        addResult: addResult,
        addPlayerCard: addPlayerCard
    }

    return <RoundContext.Provider value={roundContext}>
        {props.children}
    </RoundContext.Provider>
}

export default RoundProvider;