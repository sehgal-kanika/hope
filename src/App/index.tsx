import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Label } from 'semantic-ui-react';
import { IState } from '../types';
import slice from './duck';
import './index.css';

interface IAppDataProps {
  count: number;
}
interface IAppCbProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

const App: React.FC<IAppDataProps & IAppCbProps> = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className='counter-container'>
      <Button primary={true} onClick={onIncrement}>+</Button>
      <Label>{count}</Label>
      <Button secondary={true} onClick={onDecrement}>-</Button>
    </div>
  );
};

const mapStateToProps = (state: IState): IAppDataProps => ({
  count: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch): IAppCbProps => ({
  onDecrement: () => dispatch(slice.actions.decrement()),
  onIncrement: () => dispatch(slice.actions.increment()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
