import { keyboardKey } from '@testing-library/user-event';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import words from 'random-words';
import React, { ChangeEvent, Component, Key, useState, useRef, useEffect } from 'react';
import ExpectedText from '../../components/expected-text/expected-text';
import Score from '../../components/score/score';
import TypingBox from '../../components/typing-box/typing-box';
import './home.css';
import Timer from '../../components/timer/timer';

interface State {
  test: string
  words: Array<string>
  currWord: number
  enteredText: string
  correctCount: number
  startTime: Date | null
  started: boolean
  wpm: number
}

var randomWords = require('random-words');

class Home extends Component {
  state: State = {
      words: [],
      currWord: 0,
      test: '',
      enteredText: '',
      correctCount: 0,
      startTime: null,
      started: false,
      wpm: 0
  }

  currCharSpan: number = 0
  enteredWords: string[] = []

  checkCharacter(word: string, e: ChangeEvent<HTMLInputElement>) {
    const elements = document.getElementsByClassName('word_inner')
    const text = e.currentTarget.value
    const expected = this.state.words[this.state.currWord]

    if(expected.length >= word.length) {
      if(expected.charAt(word.length - 1) === word.charAt(word.length - 1)) {
        elements[this.currCharSpan].setAttribute('style', 'color: green')
      } else {
        elements[this.currCharSpan].setAttribute('style', 'color: red')
      }
      this.currCharSpan++
    } else {
      const overflow = document.getElementsByClassName('incorrect-overflow')[this.state.currWord]
      if(overflow.textContent != null)
        overflow.textContent = overflow.textContent.concat(word.charAt(word.length - 1))
    }
  }

  addToWord(char: string, e: ChangeEvent<HTMLInputElement>) {
    if(char === ' ') {
      this.state.currWord++
      this.enteredWords.push('')
      this.setMargin('space', true)
    } else {
      if(this.enteredWords.length <= this.state.currWord) {
        this.enteredWords.push('')
      }
      this.enteredWords[this.state.currWord] = this.enteredWords[this.state.currWord].concat(char)
      this.checkCharacter(this.enteredWords[this.state.currWord], e)
      this.setMargin('word_inner', true)
    }
  }

  updateBackspace(elements: HTMLCollectionOf<Element>, e: ChangeEvent<HTMLInputElement>) {
    if(this.state.enteredText.charCodeAt(this.state.enteredText.length - 1) === 32) {
      //go back to prev word
      this.state.currWord = this.state.currWord - 1
      this.setMargin('space', false)
    } else {
      const expected = this.state.words[this.state.currWord]
      if(expected.length >= this.enteredWords[this.state.currWord].length) {
        this.currCharSpan--
        elements[this.currCharSpan].setAttribute('style', 'color: white')
        this.setMargin('word_inner', false)
      } else {
        const overflow = document.getElementsByClassName('incorrect-overflow')[this.state.currWord]
        if(overflow.textContent) {
          overflow.textContent = overflow.textContent.substring(0, overflow.textContent.length - 1)
        }
      }
      let word = this.enteredWords[this.state.currWord]
      this.enteredWords[this.state.currWord] = word.substring(0, word.length - 1)
    }
    this.state.enteredText = e.currentTarget.value
  }

  checkWord = (e: ChangeEvent<HTMLInputElement>): void => {
    const elements = document.getElementsByClassName('word_inner')
    //backspaces
    if(this.state.enteredText.length > e.currentTarget.value.length) {
      this.updateBackspace(elements, e)
    } else {   
    //comparison by word
    this.state.enteredText = e.currentTarget.value
    const text = this.state.enteredText
    this.addToWord(text.charAt(text.length - 1), e)
    }

  }
  margin = 0

  setMargin(className: string, forward: boolean) {
    const element = document.getElementsByClassName('test-wrapper')[0]
    const letterW = document.getElementsByClassName(className)[0].getBoundingClientRect().width
    if(this.state.enteredText.length > document.getElementsByClassName('typing-box')[0].getBoundingClientRect().width / (2 * letterW)) {
      console.log(letterW)
      console.log(this.margin)
      forward? this.margin -= letterW : this.margin += letterW
      console.log(this.margin)
      element.setAttribute('style', 'margin-left: ' + (this.margin) + 'px')
    }
  }

  render() {
    this.state.words = randomWords(300)
    this.state.test= this.state.words.toString().split(',').join(' ')

    return (
      <div className="App">
        <header className="App-header">
          <Timer time={60}></Timer>
          <div className='typing-wrapper'>
            <ExpectedText text={ this.state.test }></ExpectedText>
          </div>
          <TypingBox onChange={ this.checkWord }/>
        </header>
      </div>
    )
  }
}

export default Home;
