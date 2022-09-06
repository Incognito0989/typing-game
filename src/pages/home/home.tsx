import { keyboardKey } from '@testing-library/user-event';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import words from 'random-words';
import React, { ChangeEvent, Component, Key } from 'react';
import ExpectedText from '../../components/expected-text/expected-text';
import Score from '../../components/score/score';
import TypingBox from '../../components/typing-box/typing-box';
import './home.css';

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

  enteredWords: string[] = []

  checkChar = (e: ChangeEvent<HTMLInputElement>): void => {
    const elements = document.getElementsByClassName('word_inner')

    if(this.state.enteredText.length > e.currentTarget.value.length) {
      elements[this.state.enteredText.length - 1].setAttribute('style', 'color: white')
    }

    this.state.enteredText = e.currentTarget.value
    const text = this.state.enteredText.split(' ').join('')
    console.log(text)
    console.log(text.length - 1)
    if(text.charAt(text.length - 1) === this.state.test.split(' ').join('').charAt(text.length - 1)) {
      console.log('green')
      elements[text.length - 1].setAttribute('style', 'color: green')
    } else {
      console.log('red')
      elements[text.length - 1].setAttribute('style', 'color: red')
    }
  }

  checkCharacter(word: string, e: ChangeEvent<HTMLInputElement>) {
    const elements = document.getElementsByClassName('word_inner')
    const text = e.currentTarget.value
    const expected = this.state.words[this.state.currWord]
    if(expected.length >= word.length) {
      if(expected.charAt(word.length - 1) === word.charAt(word.length - 1)) {
        elements[text.length - 1].setAttribute('style', 'color: green')
      } else {
        elements[text.length - 1].setAttribute('style', 'color: red')
      }
    }
  }

  addToWord(char: string, e: ChangeEvent<HTMLInputElement>) {
    // console.log("3:  " + this.enteredWords)
    if(char === ' ') {
      this.state.currWord++
      this.enteredWords.push('')
    } else {
      if(this.enteredWords.length <= this.state.currWord) {
        this.enteredWords.push('')
      }
      // console.log("2:  " + this.enteredWords[this.state.currWord] + "  :  " + this.state.currWord + "  :  " + char)
      this.enteredWords[this.state.currWord] = this.enteredWords[this.state.currWord].concat(char)
      this.checkCharacter(this.enteredWords[this.state.currWord], e)
    }
    // console.log("1:  " + this.enteredWords)
    console.log("after ADD: " + this.enteredWords)
  }

  checkWord = (e: ChangeEvent<HTMLInputElement>): void => {
    const elements = document.getElementsByClassName('word_inner')
    console.log(this.state.currWord)
    //backspaces
    if(this.state.enteredText.length > e.currentTarget.value.length) {
      
      //go back to prev word
      console.log(this.state.enteredText.charCodeAt(this.state.enteredText.length - 1) === 32)
      if(this.state.enteredText.charCodeAt(this.state.enteredText.length - 1) === 32) {
        console.log("deleteing one: " + (this.state.currWord - 1))
        this.state.currWord = this.state.currWord - 1
      } else {
        console.log('DELETE AT: ' + this.state.currWord)
        let word = this.enteredWords[this.state.currWord]
        console.log("before DEL: " +  word)
        this.enteredWords[this.state.currWord] = word.substring(0, word.length - 1)
        console.log("after DEL: " + this.enteredWords)
      }

      elements[this.state.enteredText.length - 1].setAttribute('style', 'color: white')
    } else {
      
    //comparison by word
    console.log("before ADD: " + this.enteredWords)
    this.state.enteredText = e.currentTarget.value
    const text = this.state.enteredText
    this.addToWord(text.charAt(text.length - 1), e)
    }

  }

  render() {
    this.state.words = randomWords(300)
    this.state.test= this.state.words.toString().split(',').join(' ')
    return (
      <div className="App">
        <header className="App-header">
          <Score wpm={ this.state.wpm } score={this.state.correctCount}></Score>
          <div className='typing-wrapper'>
            <ExpectedText text={ this.state.test }></ExpectedText>
            <TypingBox onChange={ this.checkWord }/>
          </div>
        </header>
      </div>
    )
  }
}

export default Home;
