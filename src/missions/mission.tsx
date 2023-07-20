import { useState } from 'react'
import Objective from "./Objective";
import MissionUtility from "./missionUtility";
import { Box, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import IMission from './IMission';

export function loader({ params }: any) {
    const mission = MissionUtility().GetMission(params.missionId);
    return mission;
}

const Mission = () => {
    debugger;
    const activeMission = useLoaderData() as IMission;
    const [round, setRound] = useState(1);
    const [missionLog, setMissionLog] = useState<string[]>([]);
    const [playerApts, setPlayerApts] = useState(0);
    const [playerBpts, setPlayerBpts] = useState(0);

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
                <Typography variant='h5'>
                    Score board
                </Typography>
                <div style={{ width: '300px', height: '20px', backgroundColor: 'red' }} />
                <Box>
                    <div>
                        <div>
                            Rounds: {round} / {activeMission.Length}
                        </div>
                        <div>
                            <button onClick={() => { setRound(round + 1); setMissionLog(missionLog.concat(`--- ROUND ${round + 1} BEGINS ---`)) }}>+</button>
                        </div>
                    </div>
                    <div>Player A: {playerApts}</div>
                    <div>Player B: {playerBpts}</div>
                    {activeMission.Objectives.map((objective, i) => <Objective key={i} ObjectiveNumber={i + 1} objective={objective} scoremission={(player) => {
                        const objectiveResult = `${round}: Player ${player} scored ${objective.VP} by completing objective ${i + 1}`;
                        setMissionLog(missionLog.concat(objectiveResult))
                        if (player === 'A')
                            setPlayerApts(playerApts + objective.VP);
                        else if (player === 'B')
                            setPlayerBpts(playerBpts + objective.VP);
                    }} />)}
                </Box>
            </Box>
        </Stack>
        <Box>
            <Typography variant='h5' component='div'>
                Mission log
            </Typography>
            <div>{missionLog.map(logItem => <div>{logItem}</div>)}</div>
        </Box>
    </Stack >

    // return <div>
    //     <h3>{activeMission.Name}</h3>
    //     <div style={{ display: "flex" }}>    
    //         <div style={{ margin: '6px' }}>
    //             <div>
    //                 <div>
    //                     Rounds: {round} / {activeMission.Length}
    //                 </div>
    //                 <div>
    //                     <button onClick={() => { setRound(round + 1); setMissionLog(missionLog.concat(`--- ROUND ${round + 1} BEGINS ---`)) }}>+</button>
    //                 </div>
    //             </div>
    //             <div>Player A: {playerApts}</div>
    //             <div>Player B: {playerBpts}</div>
    //             {activeMission.Objectives.map((objective, i) => <Objective key={i} ObjectiveNumber={i + 1} objective={objective} scoremission={(player) => {
    //                 const objectiveResult = `${round}: Player ${player} scored ${objective.VP} by completing objective ${i + 1}`;
    //                 setMissionLog(missionLog.concat(objectiveResult))
    //                 if (player === 'A')
    //                     setPlayerApts(playerApts + objective.VP);
    //                 else if (player === 'B')
    //                     setPlayerBpts(playerBpts + objective.VP);
    //             }} />)}
    //         </div>
    //     </div>
    //     <div>
    //         <h5>Mission log</h5>
    //         <div>{missionLog.map(logItem => <div>{logItem}</div>)}</div>
    //     </div>
    // </div>
}

export default Mission;