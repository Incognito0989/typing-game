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

  componentDidMount() {
    this.setState({words: this.state.testArr.split(' ')})
  }

  wordsPerMinute(charsTyped: number, millis: number): number {
    return Math.floor((charsTyped / 5) / (millis / 60000))
  }

  checkFinished = (): void => {
    if(!this.state.words.length) {
        if(this.state.startTime) {
            const timeM: number = new Date().getTime() - this.state.startTime.getTime()
            const wpm = this.wordsPerMinute(this.state.testArr.length, timeM)
        }
    }
  }

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value)
    const enteredText = e.currentTarget.value.trim()
    this.setState({enteredText})
    if(enteredText === this.state.words[0]) {
        console.log('RIGHT')
        this.setState({correctCount: this.state.correctCount + 1})
        this.setState({enteredText: ''})
        this.setState({words: this.state.words.slice(1)},
            (): void => this.checkFinished())
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div className='typing-wrapper'>            
                <ExpectedText text='a single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed'></ExpectedText>
                <TypingBox/>
            </div>

        </header>
      </div>
    )
  }
}

export default Home;
