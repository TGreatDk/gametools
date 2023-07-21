export default interface IMission {
    Name: string;
    Setup: string;
    Map: string;
    Scoring: IScoring[];    
    Length: number;
}

export interface IScoring{
    RoundBegin: number;
    RoundEnd:number;
    Objectives: IObjective[];
}
export interface IObjective{
    Description: string;
    VP: number;
}