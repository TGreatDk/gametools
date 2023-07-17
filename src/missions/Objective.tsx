import { IObjective } from "./IMission";

const Objective = (props: {ObjectiveNumber: number; objective: IObjective; scoremission:(player:'A'|'B') => void}) => {
    return <div style={{margin: '10px 0'}}>
        <div>
            {props.ObjectiveNumber}: {props.objective.Description}
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <div>
                <button onClick={() => props.scoremission('A')}>Player A</button>
                {/* <button>-</button> */}
            </div>
            <div style={{width:'50px'}}></div>
            <div>
                <button onClick={() => props.scoremission('B')}>Player B</button>
                {/* <button>-</button> */}
            </div>
        </div>        
    </div>
}

export default Objective;