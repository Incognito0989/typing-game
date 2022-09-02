import './typing-box.css';
import { ChangeEvent, Component } from 'react';
import { type } from '@testing-library/user-event/dist/type';

type Props = {
  onChange: any
}

class TypingBox extends Component<Props> {

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div className='wrapper'>
        <input onChange={ this.props.onChange } autoCorrect='off' autoCapitalize='off' autoComplete='off' id='box' className='typing-box'>
        </input>
      </div>
    );
  }
}
  
export default TypingBox;