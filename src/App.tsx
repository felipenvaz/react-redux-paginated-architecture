import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import EquipmentList from './components/EquipmentList';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <EquipmentList />
          <EquipmentList />
        </ React.Fragment>
      </Provider>
    );
  }
}

export default App;
