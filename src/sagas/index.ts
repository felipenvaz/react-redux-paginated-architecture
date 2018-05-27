import { call, take, all, fork } from 'redux-saga/effects';
import equipmentRootSaga from './equipmentSagas';
import { Task } from 'redux-saga';
import { equals } from '../util';

export function* takeFirst(pattern, saga) {
    while (true) {
        const action = yield take(pattern);
        yield call(saga, action);
    }
}

export function* takeFirstIfSameAction(pattern, saga) {
    let task: Task;
    let lastAction;
    while (true) {
        const action = yield take(pattern);
        if (!task || !task.isRunning() || !equals(action, lastAction))
            task = yield fork(saga, action);
        lastAction = action;
    }
}

export default function* () {
    yield all([equipmentRootSaga()]);
}