import { Menu, LightMode, DarkMode, Close } from '@mui/icons-material'
import './App.css'
import { AppBar, Box, Toolbar, IconButton, Drawer, Container, Typography, Stack, ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import MissionUtility from './missions/missionUtility';
import { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '@mui/material'

function App() {

  const theme = useTheme();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const missions = MissionUtility().GetMissions();

  const [drawOpen, setDrawOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawOpen(open);
  }

  const darkTheme = createTheme({
    palette: {
      mode: colorMode
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ padding: '0 !important' }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton onClick={() => toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Typography variant='h6' component={'div'} sx={{ flexGrow: 1 }}>
              Conquest - The last argument of kings scenario tracker.
            </Typography>
            <IconButton sx={{ alignSelf: 'end', bottom: '10px' }} color='inherit' onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>
              {colorMode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={drawOpen} onClose={() => setDrawOpen(false)}>
          <Container maxWidth='xs'>
            <Stack>
              <Typography variant='h5'>Missions</Typography>
              {missions.map((mission, i) => <div key={i}><Link style={{ ...theme.typography.button, textDecoration: 'none', color: theme.palette.primary.main }} onClick={() => setDrawOpen(false)} to={`missions/${i}`}>{mission.Name}</Link></div>)}
              <Typography variant='h5'>Other?</Typography>
              <Link style={{ ...theme.typography.button, textDecoration: 'none', color: theme.palette.primary.main }} onClick={() => setDrawOpen(false)} to={`about`}>
                About</Link>
            </Stack>
          </Container>
        </Drawer>
        <Stack direction='row' justifyContent='center'>
          <Box sx={{ m: 4, width: '100%' }}>
            <Outlet />
          </Box>
        </Stack>
        {showDisclaimer &&
          <Box position='fixed' bottom='0' width='100%' sx={{ background: theme.palette.primary.main }}>
            <Typography textAlign='center' padding={1} width='100%' variant='body2' color={theme.palette.primary.contrastText}>
              This is a community created tool, and is in no way supported by <Link style={{ ...theme.typography.button, textDecoration: 'none', color: theme.palette.primary.contrastText }} color='inherit' to='https://para-bellum.com'>Para bellum games</Link>. 
              <IconButton color='inherit' onClick={() => setShowDisclaimer(false)}>
              <Close />
            </IconButton></Typography>
          </Box>
        }
      </Container>
    </ThemeProvider>
  )
}

export default App
