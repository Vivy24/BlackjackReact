import React from 'react'

const RoundContext = React.createContext({
    existCards:[],
    computerCards:[],
    playerCards:[],
    computerPoint:[],
    playerPoint:[],
    isDeal: false,
    addPlayerCard:()=>{},
    randomCard:()=>{},
    triggerDeal:()=>{},
    addResult:(addType)=>{}
    // resetRound:()=>{},
})

export default RoundContext