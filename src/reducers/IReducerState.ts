export interface IReducerState<T> {
    byId: { [id: string]: T };
    list: any[];
    fetching: boolean;
}