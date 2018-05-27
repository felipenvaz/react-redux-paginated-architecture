import { call, put, all } from 'redux-saga/effects';
import { getAllEquipment } from '../api/equipmentApi';
import { IAction, EQUIPMENT } from '../constants/actionsTypes';
import { takeFirst } from '.';

function* getAllEquipmentWatcher() {
    yield takeFirst(EQUIPMENT.GET_ALL.REQUEST, getAllEquipmentSaga);
}

function* getAllEquipmentSaga(action: IAction) {
    const { response, error } = yield call(getAllEquipment, action.meta && action.meta.id);
    if (response)
        yield put<IAction>({ type: EQUIPMENT.GET_ALL.DONE, payload: response });
    else
        yield put<IAction>({ type: EQUIPMENT.GET_ALL.ERROR, error });
}

export default function*() {
    yield all([getAllEquipmentWatcher()]);
}