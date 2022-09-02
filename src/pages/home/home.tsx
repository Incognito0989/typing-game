import words from 'random-words';
import React, { ChangeEvent, Component } from 'react';
import ExpectedText from '../../components/expected-text/expected-text';
import Score from '../../components/score/score';
import TypingBox from '../../components/typing-box/typing-box';
import './home.css';

interface State {
  test: string
  words: Array<string>
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
      test: '',
      enteredText: '',
      correctCount: 0,
      startTime: null,
      started: false,
      wpm: 0
  }

  checkChar = (e: ChangeEvent<HTMLInputElement>): void => {
    this.state.enteredText = e.currentTarget.value
    const text = this.state.enteredText.split(' ').join('')
    const elements = document.getElementsByClassName('word_inner')
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

  render() {
    this.state.words = randomWords(300)
    this.state.test= this.state.words.toString().split(',').join(' ')
    return (
      <div className="App">
        <header className="App-header">
          <Score wpm={ this.state.wpm } score={this.state.correctCount}></Score>
          <div className='typing-wrapper'>
            <ExpectedText text={ this.state.test }></ExpectedText>
            <TypingBox onChange={ this.checkChar }/>
          </div>
        </header>
      </div>
    )
  }
}

export default Home;
