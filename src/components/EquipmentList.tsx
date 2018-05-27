import * as React from 'react';
import { connect } from 'react-redux';
import { EQUIPMENT } from '../constants/actionsTypes';
import { IEquipmentReducerState } from '../reducers/equipmentReducer';
import { IReduxStore } from '../store';
const style = require('./EquipmentList.scss');

export interface IStateProps{
    equipmentState: IEquipmentReducerState;
}

export interface IDispatchProps{
    requestAllEquipment: () => void;
}

export interface IOwnProps {
}

const mapStateToProps = (state: IReduxStore) => ({
    equipmentState: state.equipment
});

const mapDispatchToProps = dispatch => ({
    requestAllEquipment: () => dispatch({ type: EQUIPMENT.GET_ALL.REQUEST })
});


class EquipmentList extends React.Component<IOwnProps & IStateProps & IDispatchProps> {
    componentDidMount() {
        this.props.requestAllEquipment();
    }

    render() {
        return <ul>
            {this.props.equipmentState.list.map(id => (
                <li key={id}>{this.props.equipmentState.byId[id].name}</li>
            ))}
        </ul>;
    }
}

export default connect<IStateProps, IDispatchProps, IOwnProps, IReduxStore>(mapStateToProps, mapDispatchToProps)(EquipmentList);