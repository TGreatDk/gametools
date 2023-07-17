import { useState } from 'react'
import './App.css'
import Mission from './missions/mission'
import MissionGenerator from './missions/missionGenerator'

function App() {
  
  return (
    <>    
    <Mission mission={MissionGenerator().GetMission()} />
    </>
  )
}

export default App
