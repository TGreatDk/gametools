import IMission from "./IMission";
import Missions from './missions.json'

const MissionUtility = () => {
    return {
        GetMissions: ():IMission[] => {
            return Missions;
        },
        GetMission: (index:number):IMission => {
            return Missions[index];
        }
    }
}

export default MissionUtility;