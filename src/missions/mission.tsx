import { useState } from 'react'
import Objective from "./Objective";
import MissionUtility from "./missionUtility";
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import IMission from './IMission';
import { useTheme } from '@mui/material';

export function loader({ params }: any) {
    const mission = MissionUtility().GetMission(params.missionId);
    return mission;
}

interface ScoreInfo{
    Player: 'A'|'B';
    Round: number;
    Pts: number;
    Objective: number;
}

const Mission = () => {
    
    const theme = useTheme();

    const activeMission = useLoaderData() as IMission;
    const [round, setRound] = useState(1);
    const [missionLog, setMissionLog] = useState<ScoreInfo>([]);
    const [playerApts, setPlayerApts] = useState(0);
    const [playerBpts, setPlayerBpts] = useState(0);
    debugger;
    return <Stack direction={'column'}>
        <Typography component={'div'} variant='h3' textAlign='center'>
            {activeMission.Name}
        </Typography>
        <Stack direction={'row'} spacing={2} alignContent={'start'}>
            <Box maxWidth='500px'>
                <img src={activeMission.Map} width={'100%'} />
                <Typography variant='body1' component={'div'}>
                    {activeMission.Setup}
                </Typography>
            </Box>
            <Box maxWidth={'800px'}>
                <Stack direction='column' gap={1}>
                    <Box>
                        Rounds: {round} / {activeMission.Length}
                        <LinearProgress variant='determinate' value={100 * (round / activeMission.Length)} />
                    </Box>
                    <Stack direction='row' gap={1}>
                    <Button variant='outlined' disabled={round >= activeMission.Length} onClick={() => { setRound(round + 1); setMissionLog(missionLog.concat(`--- ROUND ${round + 1} BEGINS ---`)) }}>+</Button>
                    <Button variant='outlined' disabled={round >= activeMission.Length} onClick={() => { setRound(round - 1); setMissionLog(missionLog.concat(`--- ROUND ${round - 1} AGAIN? ---`)) }}>-</Button>
                    </Stack>
                </Stack>
                <Typography variant='h5'>
                    Score board
                </Typography>
                <Box>
                    <div>Player A: {playerApts}</div>
                    <div>Player B: {playerBpts}</div>
                    {activeMission.Scoring.filter(am => am.RoundBegin <= round && am.RoundEnd >= round).map(scoring => scoring.Objectives.map((objective, i) => <Objective key={i} ObjectiveNumber={i + 1} objective={objective} scoremission={(player, mode) => {
                        
                        const pts = (mode==='+'?1:-1) * objective.VP
                        const objectiveResult = <Typography></Typography> //${round}: Player ${player} scored ${pts} for objective ${i + 1}`;
                        setMissionLog(missionLog.concat(objectiveResult))

                         if (player === 'A')
                             setPlayerApts(playerApts + pts);
                         else if (player === 'B')
                             setPlayerBpts(playerBpts + pts);
                    }} />))}
                </Box>
            </Box>
        </Stack>
        <Box>
            <Typography variant='h5' component='div'>
                Mission log
            </Typography>
            <Typography variant='body1'>
                {missionLog.map(logItem => <Typography color={theme.palette.info.main}>{logItem}</Typography>)}
            </Typography>
            {/* <div></div> */}
        </Box>
    </Stack >
}

export default Mission;