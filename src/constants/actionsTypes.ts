export interface IAction {
    error?: boolean;
    payload?: any;
    meta?: IMeta;
    type: string;
};

export interface IMeta {
    fetching?: boolean;
}

const createActionType = (root: string) => ({
    REQUEST: `${root}.REQUEST`,
    ERROR: `${root}.ERROR`,
    DONE: `${root}.DONE`
});

export const EQUIPMENT = {
    GET_ALL: createActionType('EQUIPMENT.GET_ALL')
}