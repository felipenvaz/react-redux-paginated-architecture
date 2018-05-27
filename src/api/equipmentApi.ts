import { get } from './agent';

export const getAllEquipment = (facilityId?: number) => {
    return get('../../fake_data/equipment.json')
        .then(response => ({ response }))
        .catch(error => ({ error }));
}