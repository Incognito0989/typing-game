import './expected-text.css';
import react, { Component } from 'react';

const ExpectedText = (props) => { 
  return (
    <div className='wrapper'>
      <span>
        { props.text }
      </span>
    </div>
  );
}

  
export default ExpectedText;