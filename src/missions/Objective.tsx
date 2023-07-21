import { Button, Stack } from "@mui/material";
import { IObjective } from "./IMission";

const Objective = (props: {ObjectiveNumber: number; objective: IObjective; scoremission:(player:'A'|'B') => void}) => {
    return <div style={{margin: '10px 0'}}>
        <div>
            {props.ObjectiveNumber}: {props.objective.Description}
        </div>
        <Stack direction='row' justifyContent='center'>
            <div>
                <Button onClick={() => props.scoremission('A')}>Player A</Button>
                {/* <button>-</button> */}
            </div>
            <div style={{width:'50px'}}></div>
            <div>
                <Button onClick={() => props.scoremission('B')}>Player B</Button>                
            </div>
        </Stack>
    </div>
}

export default Objective;