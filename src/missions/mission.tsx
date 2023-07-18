import { useState } from 'react'
import Objective from "./Objective";
import MissionUtility from "./missionUtility";

const Mission = (props: { mission: number }) => {
    const activeMission = MissionUtility().GetMission(props.mission);
    const [round, setRound] = useState(1);
    const [missionLog, setMissionLog] = useState<string[]>([]);
    const [playerApts, setPlayerApts] = useState(0);
    const [playerBpts, setPlayerBpts] = useState(0);

    return <div>
        <h3>{activeMission.Name}</h3>
        <div style={{ display: "flex" }}>
            <div>
                <img src={activeMission.Map} />
                <div>
                    <h4>Setting up the battlefield</h4>
                    {activeMission.Setup}
                </div>
            </div>
            <div style={{ margin: '6px' }}>
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
            </div>
        </div>
        <div>
            <h5>Mission log</h5>
            <div>{missionLog.map(logItem => <div>{logItem}</div>)}</div>
        </div>
    </div>
}

export default Mission;