import { IAction, EQUIPMENT } from "../constants/actionsTypes";
import { IReducerState } from "./IReducerState";

export interface IEquipment {
    id: number;
    name: string;
    facilityId: number;
}

export interface IEquipmentReducerState extends IReducerState<IEquipment> {
    byFacilityId?: { [id: number]: number[] }
}

const defaultState = { byId: {}, byFacilityId: {}, list: [], fetching: false };

export default (state: IEquipmentReducerState = defaultState, action: IAction) => {
    let newState = state;
    switch (action.type) {
        case EQUIPMENT.GET_ALL.REQUEST:
            newState = { ...newState, fetching: true };
            break;
        case EQUIPMENT.GET_ALL.DONE:
            let byId = (action.payload as IEquipment[]).reduce((acc, equip) => {
                acc[equip.id] = equip;
                return acc;
            }, {});

            newState = {
                ...newState,
                byId,
                list: Object.keys(byId),
                fetching: false
            };
            break;
        case EQUIPMENT.GET_ALL.ERROR:
            newState = { ...newState, fetching: false };
            break;
    }


    return newState;
}