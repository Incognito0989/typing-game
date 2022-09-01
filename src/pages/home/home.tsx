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

class Home extends Component {
  state: State = {
      testArr: 'a single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed',
      words: [],
      enteredText: '',
      correctCount: 0,
      startTime: null,
      started: false,
      wpm: 0
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div className='typing-wrapper'>         
                <ExpectedText text='a single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed'></ExpectedText>
                <TypingBox state={this.state}/>
            </div>

        </header>
      </div>
    )
  }
}

export default Home;
