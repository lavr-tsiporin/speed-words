import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Spin } from "../Spin/Spin";

export const Typing = ({ onFinish }) => {
  const words = useRef([]);
  const timerRef = useRef(null);
  const curIndexRef = useRef(0);
  const [inputValue, setInputValue] = useState('')

  const [data, setData] = useState({
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

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value
    })
  }

  useEffect(() => {
    async function getTexts() {
      try {
        setData(prev => ({ ...prev, isLoading: true }))
        const response = await axios.get('https://617cf7151eadc50017136369.mockapi.io/api/archakov/speedwords')
        const result = randomText(response.data[0]?.text)
        setData(prev => ({ ...prev, isLoading: false, currentWord: result[0] }))
        words.current = result
      } catch (e) {
        console.log(e)
      }
    }

    getTexts()
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setData((prev) => {

        if (prev.isLoading) {
          return prev
        }

        const value = prev.sec - 1

        if (!value) {
          clearInterval(timerRef.current);
          onFinish(curIndexRef.current, 20 - value);
        }

        return { ...prev, sec: value };
      })
    }, 1000);
  }, [onFinish])

  const onChangeInput = (e) => {
    const { value } = e.target;

    if (data.currentWord === value) {
      curIndexRef.current += 1;

      if (curIndexRef.current >= words.current.length - 1) {
        clearInterval(timerRef.current);
        onFinish(curIndexRef.current, data.sec);
        return;
      }

      updateData('currentWord', words.current[curIndexRef.current])
      setInputValue('');
      updateData('wordsCount', data.wordsCount + 1);
      return;
    }

    !new RegExp(`^${value}`).test(data.currentWord)
      ? updateData('isErrorTyping', true)
      : updateData('isErrorTyping', false)

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
