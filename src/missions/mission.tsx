import IMission from "./IMission";
import { useState } from 'react'
import Objective from "./Objective";

const Mission = (props: { mission: IMission }) => {
    const [round, setRound] = useState(1);
    const [missionLog, setMissionLog] = useState<string[]>([]);
    const [playerApts,setPlayerApts] = useState(0);
    const [playerBpts,setPlayerBpts] = useState(0);

    return <div>
        <h3>{props.mission.Name}</h3>
        <div style={{display:"flex"}}>
            <div>
            <img src={props.mission.Map} />
            <div>
                <h4>Setting up the battlefield</h4>
                {props.mission.Setup}
            </div>
            </div>
            <div style={{margin:'6px'}}>
                <div>
                    <div onClick={() => {setRound(round+1)}}>
                    Rounds: {round} / {props.mission.Length}
                    </div>
                    <div>
                    <button>+</button>
                    </div>
                    </div>
                <div>Player A: {playerApts}</div>
                <div>Player B: {playerBpts}</div>
                {props.mission.Objectives.map((objective,i) => <Objective key={i} ObjectiveNumber={i+1} objective={objective} scoremission={(player) => {
                    const objectiveResult = `${round}: Player ${player} scored ${objective.VP} by completing objective ${i+1}`;
                    setMissionLog(missionLog.concat(objectiveResult))
                    if(player === 'A')
                        setPlayerApts(playerApts+objective.VP);
                    else if (player === 'B')
                        setPlayerBpts(playerBpts +objective.VP);
                } }/>)}
            </div>
        </div>
        <div>
            <h5>Mission log</h5>
            <div>{missionLog.map(logItem => <div>{logItem}</div>)}</div>
        </div>
    </div>
}

export default Mission;