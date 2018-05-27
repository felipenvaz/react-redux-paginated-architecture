export interface IIdList {
    idList: any[];
    fetching: boolean;
}

export interface IReducerState<T> {
    byId: { [id: string]: T };
}

export interface ISimpleState<Entity> extends IReducerState<Entity>, IIdList{
}

export interface IFilteredList<Filter> extends IIdList {
    filter: Filter;
}

export interface IFilteredState<Entity, Filter> extends IReducerState<Entity> {
    filteredLists: IFilteredList<Filter>[]
}