import * as React from 'react';
import { connect } from 'react-redux';
import { EQUIPMENT } from '../constants/actionsTypes';
import { IEquipmentReducerState, IEquipmentAction } from '../reducers/equipmentReducer';
import { IReduxStore } from '../store';
import { Dispatch } from 'redux';
import { getFilteredList } from '../reducers/reducerAux';
const style = require('./EquipmentList.scss');

export interface IStateProps {
    equipmentState: IEquipmentReducerState;
}

export interface IDispatchProps {
    requestAllEquipment: (facilityId: number) => void;
}

export interface IOwnProps {
    facilityId: number;
}

const mapStateToProps = (state: IReduxStore) => ({
    equipmentState: state.equipment
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    requestAllEquipment: (facilityId) => dispatch<IEquipmentAction>({
        type: EQUIPMENT.GET_ALL.REQUEST,
        meta: { filter: { facilityId } }
    })
});


class EquipmentList extends React.Component<IOwnProps & IStateProps & IDispatchProps> {
    componentDidMount() {
        this.props.requestAllEquipment(this.props.facilityId);
    }

    getEquipment(){
        return getFilteredList(this.props.equipmentState, { facilityId: this.props.facilityId }) || [];
    }

    render() {
        return (<React.Fragment>
            <p>FacilityId: {this.props.facilityId}</p>
            <ul className={style.list}>
                {this.getEquipment().map(id => (
                    <li key={id}>{this.props.equipmentState.byId[id].name}</li>
                ))}
            </ul>
        </ React.Fragment>);
    }
}

export default connect<IStateProps, IDispatchProps, IOwnProps, IReduxStore>(mapStateToProps, mapDispatchToProps)(EquipmentList);