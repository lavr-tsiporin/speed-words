import React from 'react';

export const Result = ({ stats }) => {
  return (
    <div class="flex result">
      <div class="result__top-icon">😓</div>
      <p class="result__phrase">
        Неплохо! За <b>{stats.sec} секунд</b>, ты ввел:
      </p>
      <div class="result__number-of-words">{stats.words} слова</div>
      <button class="button">🤔 Попробовать снова?</button>
    </div>
  );
};
