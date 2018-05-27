import { call, fork, take, all } from 'redux-saga/effects';
import equipmentRootSaga from './equipmentSagas';

export function* takeFirst(pattern, saga, ...args) {
    while (true) {
        const action = yield take(pattern);
        yield call(saga, args.concat(action));
    }
}

export default function* () {
    yield all([equipmentRootSaga()]);
}