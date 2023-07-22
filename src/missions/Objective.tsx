import { Box, Button, Stack, Typography } from "@mui/material";
import { IObjective } from "./IMission";
import { useState } from "react";

const Objective = (props: { ObjectiveNumber: number; objective: IObjective; scoremission: (player: 'A' | 'B', mode: '+' | '-') => void }) => {

    const [aScored, setAscored] = useState(0);
    const [bScored, setBscored] = useState(0);

    const scoreObjective = (player: 'A' | 'B', mode: '+' | '-') => {
        props.scoremission(player, mode);
        if (player === 'A')
            setAscored(aScored + (mode === '+' ? 1 : -1));
        else
            setBscored(bScored + (mode === '+' ? 1 : -1));
    }

    return <div style={{ margin: '10px 0' }}>
        <div>
            {props.ObjectiveNumber+1}: {props.objective.Description}
        </div>
        <Stack direction='row' justifyContent='center' gap={5}>
            <Stack direction='column' justifyContent={'center'}>
                <Typography variant='h6' sx={{ textAlign: 'center' }}>Player A</Typography>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' onClick={() => scoreObjective('A', '+')}>+</Button>
                    <Button variant='contained' disabled={aScored <= 0} onClick={() => scoreObjective('A', '-')}>-</Button>
                </Stack>
            </Stack>
            <Stack direction='column' justifyContent={'center'}>
                <Typography variant='h6' sx={{ textAlign: 'center' }}>Player B</Typography>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' onClick={() => scoreObjective('B', '+')}>+</Button>
                    <Button variant='contained' disabled={bScored <= 0} onClick={() => scoreObjective('B', '-')}>-</Button>
                </Stack>
            </Stack>
        </Stack>
    </div>
}

export default Objective;