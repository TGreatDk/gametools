import { useState } from 'react'
import './App.css'
import Mission from './missions/mission'
import MissionUtility from './missions/missionUtility'
import { AppBar, Box, Toolbar, IconButton,Drawer } from '@mui/material'
import { Menu } from '@mui/icons-material'
import React from 'react'

function App() {
  const missions = MissionUtility().GetMissions();
  const [activeMission, setActiveMission] = useState<number>(-1)

  const [drawOpen,setDrawOpen] = useState(false);

  const toggleDrawer = (open:boolean) => {
    setDrawOpen(open);
  }

  return (
    <React.Fragment key={'left'}>
    <>
      <Box position={'fixed'} top={0} width={'100%'}>
        <AppBar position='static' >
          <Toolbar>
            <IconButton onClick={() => toggleDrawer(!drawOpen)} >
              <Menu/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor='left' open={drawOpen} onClose={() =>setDrawOpen(false)}>
      {
        missions.map((mission, i) => {
          return <div><a onClick={() => { setActiveMission(i);toggleDrawer(false) }}>{mission.Name}</a></div>
        })
      }
      </Drawer>
      <div id="body" style={{margin:'50px'}}>      
      {activeMission > -1 && <Mission mission={activeMission} />}
      </div>
    </>
    </React.Fragment>
  )
}

export default App
