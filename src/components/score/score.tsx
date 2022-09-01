import './score.css';
import { ChangeEvent, Component } from 'react';

type ScoreProps = {
    score: number
    wpm: number
}

class Score extends Component<ScoreProps> {

    constructor(props: ScoreProps) {
        super(props)
    }

    render() {
        return (
        <div className='score-wrapper'>
            <h1>Correct Words: { this.props.score }</h1>
            <h2>Words/min: { this.props.wpm }</h2>
        </div>
        );
    }
}
  
export default Score;