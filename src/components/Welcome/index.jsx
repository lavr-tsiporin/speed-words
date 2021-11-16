import React from 'react';
import { Options } from "../Options/Options";

export const Welcome = ({ onClickStart, status, setStatus }) => {
  return (
    <>
      <div className="flex start">
        {/*<img*/}
        {/*  className="start__image"*/}
        {/*  width="50"*/}
        {/*  src="https://speed-words.vercel.app/static/media/flag.1fffd39b.png"*/}
        {/*  alt="Флаг"*/}
        {/*/>*/}
        <div className="start__image" style={{ width: '50px', height: '50px', fontSize: '50px' }}>🏁</div>
        <div className="start__text">
          <h3 className="start__header">speed words</h3>
          <p className="start__phrase">Игра на скорость ввода слов</p>
        </div>
        <Options status={status} setStatus={setStatus}/>
        <button className="button" onClick={onClickStart}>
          🔥 Начать
        </button>
      </div>
    </>
  );
};
