import './typing-box.css';
import { ChangeEvent, Component } from 'react';
import { type } from '@testing-library/user-event/dist/type';

class TypingBox extends Component {

  render() {
    return (
      <div className='wrapper'>
        <input id='box' className='typing-box'>
        </input>
      </div>
    );
  }
}
  
export default TypingBox;