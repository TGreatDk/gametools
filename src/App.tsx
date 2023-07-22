import { Menu } from '@mui/icons-material'
import './App.css'
import { AppBar, Box, Toolbar, IconButton, Drawer, Container, Typography, Stack} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link';
import MissionUtility from './missions/missionUtility';
import { useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import {useTheme} from '@mui/material'


function App() {

  const theme = useTheme();
  const missions = MissionUtility().GetMissions();

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
            <Typography variant='h5'>Missions</Typography>
            {missions.map((mission, i) => <div><Link style={{...theme.typography.button,textDecoration:'none',color:theme.palette.primary.main}} onClick={() => setDrawOpen(false)} to={`missions/${i}`}>{mission.Name}</Link></div>)}
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
