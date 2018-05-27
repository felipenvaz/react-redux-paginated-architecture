import { IFilteredState, IFilteredList } from "./IReducerState";
import { equals } from "../util";

export const getFilteredList = <Entity, Filter>(filteredState: IFilteredState<Entity, Filter>, filter: Filter) => {
    let filteredList = filteredState.filteredLists.find(f => equals(f.filter, filter));
    return filteredList && filteredList.idList;
}

export const setFilteredList = <Entity, Filter>(filteredLists: IFilteredList<Filter>[],
    newFilteredList: IFilteredList<Filter>): IFilteredList<Filter>[] => {
    let newFilteredLists = [...filteredLists];
    let filteredListIdx = newFilteredLists.findIndex(f => equals(f.filter, newFilteredList.filter));

    if (filteredListIdx >= 0) newFilteredLists.splice(filteredListIdx, 1);
    newFilteredLists.push(newFilteredList);
    return newFilteredLists;
}