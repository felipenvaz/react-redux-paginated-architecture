import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import EquipmentList from './components/EquipmentList';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <EquipmentList facilityId={1} />
          <EquipmentList facilityId={2} />
        </ React.Fragment>
      </Provider>
    );
  }
}

export default App;
