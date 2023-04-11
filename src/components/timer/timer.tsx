import React from 'react';
import './timer.css';
import { Component } from 'react';

interface State {
  time: number;
  seconds: number;
}

interface Props {
  time: number;
}

const Timer: React.FC<Props> = ({ time }) => {
  debugger;
  const [state, setState] = React.useState<State>({
    time,
    seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
  });

  React.useEffect(() => {
    setTimeout(() => {
      if(state.time === 0)
        return;

      setState({
        time: state.time - 1,
        seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
      });
    }, 1000);
  }, [state.time]);

  return (
    <div>
      <h2>{`${
        state.seconds < 10 ? `0${state.seconds}` : state.seconds
      }`}</h2>
    </div>
  );
}
  
export default Timer;