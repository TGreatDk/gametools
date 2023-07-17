import IMission from "./IMission";
import Maps from "./missionMaps";

const MissionGenerator = () => {
    return {
        GetMission: ():IMission => {
            return {
                Name: 'Divide and conquer',
                Setup: `Place six 6" Objective Zones and two Objective
                Markers as shown in the diagram. Objective Marker
                “A” is considered to be friendly to Player 1, whereas
                Objective Marker “B” is considered to be friendly
                to Player 2`,
                Map: Maps.DiviceAndConqourMap,
                Objectives: [
                    {Description: 'Players gain 3 VPs for every Enemy Objetive Marker they have destroyed during the Round', VP: 3},
                    {Description: 'Players gain 2 VPs for each objective zone they are Seizing', VP: 2},
                    {Description: 'Players gain 2 VPs if they have slain the Enemy Warlord this Round', VP: 2},
                ],
                Length: 10
            }
        }
    }
}

export default MissionGenerator;