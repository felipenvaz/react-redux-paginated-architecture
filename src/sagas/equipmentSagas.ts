import { call, put, all } from 'redux-saga/effects';
import { getAllEquipment } from '../api/equipmentApi';
import { EQUIPMENT } from '../constants/actionsTypes';
import { takeFirstIfSameAction } from '.';
import { IEquipmentAction } from '../reducers/equipmentReducer';

function* getAllEquipmentWatcher() {
    yield takeFirstIfSameAction(EQUIPMENT.GET_ALL.REQUEST, getAllEquipmentSaga);
}

function* getAllEquipmentSaga(action: IEquipmentAction) {
    const { response, error } = yield call(getAllEquipment, action.meta.filter);
    if (response)
        yield put<IEquipmentAction>({ type: EQUIPMENT.GET_ALL.DONE, payload: response, meta: action.meta });
    else
        yield put<IEquipmentAction>({ type: EQUIPMENT.GET_ALL.ERROR, error, meta: action.meta });
}

export default function*() {
    yield all([getAllEquipmentWatcher()]);
}