import {useState} from 'react'

import classes from './App.module.css'
import StartDiv from './components/StartDiv'
import CardDesk from './components/card/CardDesk'
import RoundProvider from './store/roundProvider'

function App() {
  const [gameStart, setGameStart] = useState(false);

  const startingHandler = ()=> {
    setGameStart(true);
  }


  return (
    <RoundProvider>
 <div className={classes.app}>
     {gameStart ? <CardDesk /> :<StartDiv onStart={startingHandler}/>}
    </div>
    </RoundProvider>
   
  );
}

export default App;
