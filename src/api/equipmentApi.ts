import { get } from './agent';

export interface IEquipmentFilter {
    facilityId?: number;
}

export interface IEquipment {
    id: number;
    name: string;
    facilityId: number;
}

function delayMyPromise(myPromise, myDelay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve(myPromise);
        }, myDelay);
    });
}

export const getAllEquipment = (filter: IEquipmentFilter = {}) => {
    let promise = get('../../fake_data/equipment.json')
        //response should be returned the same way as error, but we are simulating the backend filtering work here
        .then((response: IEquipment[]) => {
            return { response: response.filter((equip) => filter.facilityId === undefined || equip.facilityId == filter.facilityId) };
        })
        .catch(error => ({ error }));

    return delayMyPromise(promise, 2000);
}