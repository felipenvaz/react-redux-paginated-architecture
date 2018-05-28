import { IFilteredState, IFilteredList } from "./IReducerState";
import { equals } from "../util";

export const getFilteredList = <Entity, Filter>(filteredState: IFilteredState<Entity, Filter>, filter: Filter) => {
    let filteredList = filteredState.filteredLists.find(f => equals(f.filter, filter));
    return filteredList && filteredList.idList;
}

const applyToFilteredList = <Entity, Filter>(filteredLists: IFilteredList<Filter>[],
    newFilteredList: IFilteredList<Filter>,
    applyTo: (newFilteredLists: IFilteredList<Filter>[],
        newFilteredList: IFilteredList<Filter>,
        oldFilteredList: IFilteredList<Filter>) => void):
    IFilteredList<Filter>[] => {

    let newFilteredLists = [...filteredLists];
    let filteredListIdx = newFilteredLists.findIndex(f => equals(f.filter, newFilteredList.filter));

    let filteredList = {} as IFilteredList<Filter>;
    if (filteredListIdx >= 0) filteredList = newFilteredLists.splice(filteredListIdx, 1)[0];
    applyTo(newFilteredLists, newFilteredList, filteredList);
    return newFilteredLists;
};

export const setFilteredList = <Entity, Filter>(allFilteredLists: IFilteredList<Filter>[],
    newFilteredList: IFilteredList<Filter>):
    IFilteredList<Filter>[] => {

    return applyToFilteredList(allFilteredLists, newFilteredList,
        (newFilteredLists: IFilteredList<Filter>[],
            newFilteredList: IFilteredList<Filter>,
            oldFilteredList: IFilteredList<Filter>) => {
            newFilteredLists.push(newFilteredList);
        });
};

export const mergeFilteredList = <Entity, Filter>(allFilteredLists: IFilteredList<Filter>[],
    newFilteredList: IFilteredList<Filter>):
    IFilteredList<Filter>[] => {

    return applyToFilteredList(allFilteredLists, newFilteredList,
        (newFilteredLists: IFilteredList<Filter>[],
            newFilteredList: IFilteredList<Filter>,
            oldFilteredList: IFilteredList<Filter>) => {
            newFilteredLists.push({ ...oldFilteredList, ...newFilteredList });
        });
};