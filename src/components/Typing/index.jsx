import React from 'react';

const texts = [
  'Наверное, вы еще не готовы к такой музыке, но вашим детям она понравится',
  'Тото, у меня такое ощущение, что мы больше не в Канзасе',
  'Не судите меня за прошлое, я не живу там больше.',
  'Все делай тихо и о тебе заговорят громко',
];

const sentence = texts[Math.floor(Math.random() * texts.length)];
const words = sentence.split(' ');

export const Typing = ({ onFinish }) => {
  const curIndexRef = React.useRef(0);
  const timerRef = React.useRef(null);
  const [sec, setSec] = React.useState(20);
  const [wordsCount, setWordsCount] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [currentWord, setCurrentWord] = React.useState(words[0]);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setSec((prev) => {
        const value = prev - 1;

        if (!value) {
          clearInterval(timerRef.current);
          onFinish(curIndexRef.current, 20 - value);
        }

        return value;
      });
    }, 1000);
  }, []);

  const onChangeInput = (e) => {
    const { value } = e.target;

    if (currentWord === value) {
      curIndexRef.current += 1;

      if (curIndexRef.current >= words.length - 1) {
        clearInterval(timerRef.current);
        onFinish(curIndexRef.current, sec);
        return;
      }

      setCurrentWord(words[curIndexRef.current]);
      setInputValue('');
      setWordsCount((prev) => prev + 1);
      return;
    }

    if (!new RegExp(`^${value}`).test(currentWord)) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    setInputValue(e.target.value.trim());
  };

  return (
    <div class="flex typing">
      <p class="typing__enter-word">Введите слово:</p>
      <h3 class="typing__word">{currentWord}</h3>
      <input
        value={inputValue}
        onChange={onChangeInput}
        class={`typing__input ${isError ? 'error' : ''}`}
        type="text"
      />
      <div class="typing__progress">
        <div class="typing__timer">
          <p>Осталось времени:</p>
          <b>{sec} сек.</b>
        </div>
        <div class="typing__counter">
          <p>Введено слов:</p>
          <b>{wordsCount}</b>
        </div>
      </div>
    </div>
  );
};
