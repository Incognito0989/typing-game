import './typing-box.css';
import { ChangeEvent, Component } from 'react';
import { type } from '@testing-library/user-event/dist/type';

type UpperCaseCharacter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

interface State {
  testArr: string
  words: Array<string>
  enteredText: string
  correctCount: number
  startTime: Date | null
  started: boolean
  wpm: number
}

type Prop = {
  state: State
}

class TypingBox extends Component<Prop> {

  state: State = {
    testArr: '',
    words: [],
    enteredText: '',
    correctCount: 0,
    startTime: null,
    started: false,
    wpm: 0
  }
  
  constructor(props: Prop) {
    super(props)
    this.state = {...this.props.state}
  }

  componentDidMount() {
    this.setState({words: this.props.state.testArr.split(' ')})
  }

  wordsPerMinute(charsTyped: number, millis: number): number {
    return Math.floor((charsTyped / 5) / (millis / 60000))
  }

  checkFinished = (): void => {
    if(!this.props.state.words.length) {
        if(this.props.state.startTime) {
            const timeM: number = new Date().getTime() - this.props.state.startTime.getTime()
            const wpm = this.wordsPerMinute(this.props.state.testArr.length, timeM)
            this.setState({wpm: wpm})
        }
    }
  }

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if(!this.props.state.started) {
      this.setState({started: true, startTime: new Date()})
    }
    
    console.log(e.currentTarget.value)
    const enteredText = e.currentTarget.value.trim()
    this.setState({enteredText})
    if(enteredText === this.props.state.words[0]) {
        console.log('RIGHT')
        this.setState({correctCount: this.props.state.correctCount + 1})
        this.setState({enteredText: ''})
        this.setState({words: this.props.state.words.slice(1)},
            (): void => this.checkFinished())
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <input onChange={this.onWordChange} value={this.props.state.enteredText} id='box' className='typing-box'>
        </input>
        <h1>{this.props.state.correctCount}</h1>
      </div>
    );
  }
}
  
export default TypingBox;