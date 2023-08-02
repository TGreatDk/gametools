import { Button, Stack, Typography } from "@mui/material";
import { IObjective } from "./IMission";
import { useState } from "react";

const Objective = (props: { ObjectiveNumber: number; objective: IObjective; scoremission: (player: '1' | '2', mode: '+' | '-') => void }) => {

    const [aScored, setAscored] = useState(0);
    const [bScored, setBscored] = useState(0);

    const scoreObjective = (player: '1' | '2', mode: '+' | '-') => {
        props.scoremission(player, mode);
        if (player === '1')
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
                <Typography variant='h6' sx={{ textAlign: 'center' }}>Player 1</Typography>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' onClick={() => scoreObjective('1', '+')}>+</Button>
                    <Button variant='contained' disabled={aScored <= 0} onClick={() => scoreObjective('1', '-')}>-</Button>
                </Stack>
            </Stack>
            <Stack direction='column' justifyContent={'center'}>
                <Typography variant='h6' sx={{ textAlign: 'center' }}>Player 2</Typography>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' onClick={() => scoreObjective('2', '+')}>+</Button>
                    <Button variant='contained' disabled={bScored <= 0} onClick={() => scoreObjective('2', '-')}>-</Button>
                </Stack>
            </Stack>
        </Stack>
    </div>
}

export default Objective;