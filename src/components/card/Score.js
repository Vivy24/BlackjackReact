import {useContext} from 'react'

import roundContext from '../../store/round'

const Score = () => {
    const roundCtx = useContext(roundContext);

    const dealScore = () => {
     if(!roundCtx.computerCards[0].point){
         return `1,10`
     }
     return `${roundCtx.computerCards[0].point}`
    };
    const playerScore = () => {
        if (roundCtx.playerPoint.length > 1){
            let result = "";
            for (const point in roundCtx.playerPoint) {
              result += `${roundCtx.playerPoint[point]}`;
              result+=`,`
            }
            return (result.slice(0,-1));
        }
       return `${roundCtx.playerPoint[0]}`
    }

    return (
        <div>
            <h2>Dealer Score: {dealScore()} </h2>
            {<h2>Player Score: {playerScore()} </h2>}
        </div>
    )
}

export default Score
