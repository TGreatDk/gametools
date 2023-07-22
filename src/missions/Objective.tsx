import { Box, Button, Stack, Typography } from "@mui/material";
import { IObjective } from "./IMission";

const Objective = (props: { ObjectiveNumber: number; objective: IObjective; scoremission: (player: 'A' | 'B', mode: '+' | '-') => void }) => {
    return <div style={{ margin: '10px 0' }}>
        <div>
            {props.ObjectiveNumber}: {props.objective.Description}
        </div>
        <Stack direction='row' justifyContent='center' gap={5}>
            <Stack direction='column' justifyContent={'center'}>
                <Typography variant='h6' sx={{textAlign:'center'}}>Player A</Typography>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' onClick={() => props.scoremission('A', '+')}>+</Button>
                    <Button variant='contained' onClick={() => props.scoremission('A', '-')}>-</Button>
                </Stack>
            </Stack>
            <Stack direction='column' justifyContent={'center'}>
                <Typography variant='h6' sx={{textAlign:'center'}}>Player B</Typography>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' onClick={() => props.scoremission('B', '+')}>+</Button>
                    <Button variant='contained' onClick={() => props.scoremission('B', '-')}>-</Button>
                </Stack>
            </Stack>            
        </Stack>
    </div>
}

export default Objective;