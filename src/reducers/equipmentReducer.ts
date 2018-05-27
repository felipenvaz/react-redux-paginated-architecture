import { IAction, EQUIPMENT, IMeta } from "../constants/actionsTypes";
import { IReducerState, IFilteredState } from "./IReducerState";
import { IEquipment, IEquipmentFilter } from "../api/equipmentApi";
import { setFilteredList } from "./reducerAux";

export interface IEquipmentReducerState extends IFilteredState<IEquipment, IEquipmentFilter> {
}

export interface IEquipmentMeta extends IMeta {
    filter?: IEquipmentFilter;
}

export interface IEquipmentAction extends IAction {
    meta: IEquipmentMeta;
}

const defaultState: IEquipmentReducerState = { byId: {}, filteredLists: [] };

export default (state: IEquipmentReducerState = defaultState, action: IEquipmentAction) => {
    let newState = state;
    switch (action.type) {
        case EQUIPMENT.GET_ALL.REQUEST:
            //newState = { ...newState, fetching: true };
            break;
        case EQUIPMENT.GET_ALL.DONE:
            let byIdFiltered = (action.payload as IEquipment[]).reduce((acc, equip) => {
                acc[equip.id] = equip;
                return acc;
            }, {});

            let byId = { ...newState.byId, ...byIdFiltered };
            newState = {
                byId,
                filteredLists: setFilteredList(newState.filteredLists,
                    {
                        fetching: false,
                        filter: action.meta.filter,
                        idList: Object.keys(byIdFiltered)
                    })
            };
            break;
        case EQUIPMENT.GET_ALL.ERROR:
            //newState = { ...newState, fetching: false };
            break;
    }


    return newState;
}