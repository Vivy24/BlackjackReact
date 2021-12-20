import {useContext} from 'react'

import roundContext from '../../store/round'

const Winner = () => {
    const roundCtx = useContext(roundContext)
    
    return (
        <div>
            {roundCtx.gameState === 'STAND' && <h3>The winner is: </h3>  }
        </div>
    )
}

export default Winner
