import React, { useState } from 'react'
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

interface ScoreInfo {
    Player: 'A' | 'B';
    Pts: number;
    Objective: number;
}

const Mission = () => {

    const theme = useTheme();

    const activeMission = useLoaderData() as IMission;
    const [round, setRound] = useState(1);
    const [disableMinusRound, setDisableMinusRound] = useState(false);
    const [missionLog, setMissionLog] = useState<ScoreInfo[][]>([]);
    const [playerApts, setPlayerApts] = useState(0);
    const [playerBpts, setPlayerBpts] = useState(0);

    return <Stack direction={'column'}>
        <Typography component={'div'} variant='h3' textAlign='center'>
            {activeMission.Name}
        </Typography>
        <Stack direction={'row'} spacing={2} alignContent={'start'} flexWrap='wrap-reverse' gap={3}>
            <Box maxWidth='500px' minWidth='300px'>
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
                        <Button variant='outlined' disabled={round >= activeMission.Length} onClick={() => { setRound(round + 1); setDisableMinusRound(false) }}>+</Button>
                        <Button variant='outlined' disabled={round >= activeMission.Length || disableMinusRound} onClick={() => { setRound(round - 1) }}>-</Button>
                    </Stack>
                </Stack>
                <Typography variant='h5'>
                    Score board
                </Typography>
                <Box>
                    <div>Player A: {playerApts}VPs</div>
                    <div>Player B: {playerBpts}VPs</div>
                    {activeMission.Scoring.filter(am => am.RoundBegin <= round && am.RoundEnd >= round).map(scoring => scoring.Objectives.map((objective, objectiveIndex) => <Objective key={objectiveIndex} ObjectiveNumber={objectiveIndex} objective={objective} scoremission={(player, mode) => {

                        const pts = (mode === '+' ? 1 : -1) * objective.VP
                        const objectiveResult: ScoreInfo = {
                            Player: player,
                            Objective: objectiveIndex,
                            Pts: (mode === '+' ? 1 : -1) * objective.VP,
                        };

                        let misLog = missionLog[round];
                        const currMissLog = missionLog;
                        if (!misLog)
                            misLog = [];
                        debugger;
                        // if (mode === '+')
                        misLog = misLog.concat(objectiveResult);
                        // else {
                        //     const index = misLog.map(log => log.Objective).indexOf(objectiveIndex);
                        //     if (index > -1)
                        //         misLog = misLog.slice(index, 1);
                        // }

                        currMissLog[round] = misLog;

                        setMissionLog(currMissLog);

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
                {missionLog.map((scores, mi) => scores.map((scoreItem) => (
                    <React.Fragment>
                        {scoreItem.Pts > 0 &&
                            <Typography color={theme.palette.info.main}>
                                {`${mi} - Player ${scoreItem.Player} scored ${scoreItem.Pts}VP by completing objective ${scoreItem.Objective}`}
                            </Typography>
                        }
                        {scoreItem.Pts < 0 &&
                            <Typography color={theme.palette.error.main}>
                                {`${mi} - removed ${scoreItem.Pts*-1}VP from player ${scoreItem.Player}`}
                            </Typography>
                        }
                    </React.Fragment>
                )))}
            </Typography>
            {/* <div></div> */}
        </Box>
    </Stack >
}

export default Mission;