import React, { useCallback, useState } from 'react';
import { Result } from './components/Result';
import { Typing } from './components/Typing';
import { Welcome } from './components/Welcome';

function App() {
  const [step, setStep] = React.useState('welcome');
  const [status, setStatus] = useState('sentence')
  const [stats, setStats] = React.useState({
    words: 0,
    sec: 0,
  });

  const startGame = useCallback(() => {
    setStep('typing');
  }, []);

  const finishGame = useCallback((words, sec) => {
    setStep('result');
    setStats({
      words,
      sec,
    });
  }, []);

  const retryGame = useCallback(() => {
    setStep('welcome')
  }, [])

  const steps = {
    welcome: <Welcome onClickStart={startGame} setStatus={setStatus} status={status}/>,
    typing: <Typing onFinish={finishGame} status={status}/>,
    result: <Result stats={stats} onClickRetry={retryGame}/>,
  };

  return (
    <div className="App">
      <div className="common-rect">{steps[step]}</div>
    </div>
  );
}

export default App;
