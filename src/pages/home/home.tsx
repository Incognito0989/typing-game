import words from 'random-words';
import React, { ChangeEvent, Component } from 'react';
import ExpectedText from '../../components/expected-text/expected-text';
import TypingBox from '../../components/typing-box/typing-box';
import './home.css';

interface State {
  testArr: string
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
      testArr: '',
      enteredText: '',
      correctCount: 0,
      startTime: null,
      started: false,
      wpm: 0
  }

  render() {
    this.state.words = randomWords(300)
    this.state.testArr = this.state.words.toString().split(',').join(' ')
    return (
      <div className="App">
        <header className="App-header">
            <div className='typing-wrapper'>         
                <ExpectedText text={this.state.testArr}></ExpectedText>
                <TypingBox state={this.state}/>
            </div>
        </header>
      </div>
    )
  }
}

export default Home;
