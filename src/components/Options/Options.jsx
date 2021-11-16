import React from 'react';
import './Options.css'

export const Options = React.memo(({ status, setStatus }) => {

  const onChangeValue = e => {
    const { value } = e.target
    setStatus(value)
  }

  return (
    <div className="options_container flex">
      <label>
        <input
          className="option-input radio"
          type="radio"
          value="sentence"
          checked={status === 'sentence'}
          onChange={onChangeValue}
        />
        Предложения
      </label>
      <label>
        <input
          className="option-input radio"
          type="radio"
          value="words"
          checked={status === 'words'}
          onChange={onChangeValue}
        />
        Слова
      </label>
    </div>
  );
});