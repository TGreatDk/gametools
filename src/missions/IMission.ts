export default interface IMission {
    Name: string;
    Setup: string;
    Map: string;
    Objectives: IObjective[];
    Length: number;
}
export interface IObjective{
    Description: string;
    VP: number;
}