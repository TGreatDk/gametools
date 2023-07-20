import { Menu } from '@mui/icons-material'
import './App.css'
import { AppBar, Box, Toolbar, IconButton, Drawer, Container, Typography, Stack} from '@mui/material'
import MissionUtility from './missions/missionUtility';
import { useState } from 'react';
import { Outlet,Link } from 'react-router-dom';


function App() {
  const missions = MissionUtility().GetMissions();
  const [activeMission, setActiveMission] = useState<number>(-1)

  const [drawOpen, setDrawOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawOpen(open);
  }

  return (
    <Container maxWidth={false} sx={{ padding: '0 !important' }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={() => toggleDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant='h6' component={'div'} sx={{ flexGrow: 1 }}>
            Conquest - The last argument of kings scenario tracker.
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={drawOpen} onClose={() => setDrawOpen(false)}>
        <Container maxWidth='xs'>
          <Stack>
            {missions.map((mission, i) => <Link to={`missions/${i}`}>{mission.Name}</Link>)}
          </Stack>
        </Container>
      </Drawer>
      <Stack direction='row' justifyContent='center'>
        <Box sx={{ m: 4,width:'100%' }}>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  )
}

export default App
