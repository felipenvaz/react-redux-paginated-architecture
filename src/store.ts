import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { IEquipmentReducerState } from './reducers/equipmentReducer';
import { IAction } from './constants/actionsTypes';

export interface IReduxStore{
    equipment: IEquipmentReducerState
}

const sagaMiddleware = createSagaMiddleware();
export default createStore<IReduxStore, IAction, {}, {}>(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);