import React, { useState, useEffect, useRef } from 'react';
import _ from "lodash";
import axios from "axios";
import { Spin } from "../Spin/Spin";

export const Typing = ({ onFinish, status }) => {
  const wordsRef = useRef([]);
  const timerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [inputValue, setInputValue] = useState('')

  const [data, setData] = useState({
    status,
    sec: 20,
    wordsCount: 0,
    currentWord: '',
    isErrorTyping: false,
    isLoading: false
  })

  const randomText = (texts = []) => {
    const sentence = texts[Math.floor(Math.random() * texts.length)];
    return sentence.split(' ').map(el => el.toLowerCase())
  }

  useEffect(() => {
    setData(prev => ({ ...prev, isLoading: true }))
    axios.get('https://617cf7151eadc50017136369.mockapi.io/api/archakov/speedwords').then(response => {
      const { words, sentence } = response.data[0]
      const result = status === 'words' ? _.shuffle(words) : randomText(sentence)
      wordsRef.current = result
      setData(prev => ({ ...prev, isLoading: false, currentWord: result[0] }))
    }).catch(e => console.log(e))
  }, [status]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setData((prev) => {

        if (prev.isLoading) {
          return prev
        }

        const value = prev.sec - 1

        if (!value) {
          clearInterval(timerRef.current);
          onFinish(currentIndexRef.current, 20 - value);
        }

        return { ...prev, sec: value };
      })
    }, 1000);
  }, [onFinish])

  const onChangeInput = (e) => {
    const { value } = e.target;

    if (data.currentWord === value) {
      currentIndexRef.current += 1;

      if (currentIndexRef.current >= wordsRef.current.length - 1) {
        clearInterval(timerRef.current);
        onFinish(currentIndexRef.current, data.sec);
        return;
      }

      setData(prev => ({ ...prev, currentWord: wordsRef.current[currentIndexRef.current] }))
      setInputValue('');
      setData(prev => ({ ...prev, wordsCount: prev.wordsCount + 1 }))
      return;
    }

    !new RegExp(`^${value}`).test(data.currentWord)
      ? setData(prev => ({ ...prev, isErrorTyping: true }))
      : setData(prev => ({ ...prev, isErrorTyping: false }))

    setInputValue(value.trim().toLowerCase())
  };

  return (
    <>
      {data.isLoading && <Spin/>}
      <div className={data.isLoading ? "flex typing typing__blur" : "flex typing"}>
        <p className="typing__enter-word">Введите слово:</p>
        <h3 className="typing__word">{data.currentWord}</h3>
        <input
          value={inputValue}
          onChange={onChangeInput}
          className={`typing__input ${data.isErrorTyping ? 'error' : ''}`}
          type="text"
          autoFocus
        />
        <div className="typing__progress">
          <div className="typing__timer">
            <p>Осталось времени:</p>
            <b>{data.sec} сек.</b>
          </div>
          <div className="typing__counter">
            <p>Введено слов:</p>
            <b>{data.wordsCount}</b>
          </div>
        </div>
      </div>
    </>
  );


};
