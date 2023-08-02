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
    Player: '1' | '2';
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

    const addScore = (scoreItem: ScoreInfo) => {
        let misLog = missionLog[round];
        const currMissLog = missionLog;
        if (!misLog)
            misLog = [];
        misLog = misLog.concat(scoreItem);

        currMissLog[round] = misLog;

        setMissionLog(currMissLog);
    }

    return <Stack direction={'column'}>
        <Typography component={'div'} variant='h3' textAlign='center'>
            {activeMission.Name}
        </Typography>
        <Stack direction={'row'} spacing={2} alignContent={'start'} flexWrap='wrap-reverse' gap={3}>
            <Box width='30%' minWidth='300px'>
                <img src={activeMission.Map} width={'100%'} style={{ maxWidth: '450px' }} />
                <Typography variant='body1' component={'div'} maxWidth={'450px'}>
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
                        <Button variant='outlined' disabled={round >= activeMission.Length} onClick={() => { setRound(round + 1); setDisableMinusRound(false); addScore({Pts: 0, Objective:-1, Player:'1'}) }}>+</Button>
                        <Button variant='outlined' disabled={round > activeMission.Length || disableMinusRound || round === 1} onClick={() => { setRound(round - 1); }}>-</Button>
                    </Stack>
                </Stack>
                <Typography variant='h5'>
                    Score board
                </Typography>
                <Box>
                    <div>Player 1: {playerApts}VPs</div>
                    <div>Player 2: {playerBpts}VPs</div>
                    {activeMission.Scoring.filter(am => am.RoundBegin <= round && am.RoundEnd >= round).map(scoring => scoring.Objectives.map((objective, objectiveIndex) => <Objective key={objectiveIndex} ObjectiveNumber={objectiveIndex} objective={objective} scoremission={(player, mode) => {

                        const pts = (mode === '+' ? 1 : -1) * objective.VP
                        const objectiveResult: ScoreInfo = {
                            Player: player,
                            Objective: objectiveIndex,
                            Pts: (mode === '+' ? 1 : -1) * objective.VP,
                        };
                        addScore(objectiveResult);

                        if (player === '1')
                            setPlayerApts(playerApts + pts);
                        else if (player === '2')
                            setPlayerBpts(playerBpts + pts);
                    }} />))}
                </Box>
            </Box>
        </Stack>
        <Box>
            <Typography variant='h5' component='div'>
                Mission log
            </Typography>
            <Typography variant='body1' component='div'>
                {missionLog.map((scores, mi) => scores.map((scoreItem) => (
                    <React.Fragment>
                        {scoreItem.Pts > 0 &&
                            <Typography color={theme.palette.success.main}>
                                {`Round ${mi} - Player ${scoreItem.Player} scored ${scoreItem.Pts}VP by completing objective ${scoreItem.Objective + 1}`}
                            </Typography>
                        }
                        {scoreItem.Pts === 0 &&
                            <Typography color={theme.palette.info.main}>
                                {`--- [ROOUND ${mi+1} BEGINS] ---`}
                            </Typography>
                        }
                        {scoreItem.Pts < 0 &&
                            <Typography color={theme.palette.error.main}>
                                {`Round ${mi} - removed ${scoreItem.Pts * -1}VP from player ${scoreItem.Player} (objective ${scoreItem.Objective + 1})`}
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