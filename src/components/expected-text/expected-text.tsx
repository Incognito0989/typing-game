import './expected-text.css';
import react, { Component } from 'react';

type TextProps = {
  text: string
}

function addWrappers(word, tag, classes) {
  // Split into individual characters.
  const chars = word.split('');
  
  // The array the newly wrapped 
  // characters will be added to.
  const wrappedChars: string[] = [];
  
  // The loop
  chars.forEach(function(char) {
    // Check if any classes were passed.
    // If so add them, else just use a basic tag.
    const openTag = classes ? `${tag} class="${classes}"` : tag;
    wrappedChars.push(`<${openTag}>${char}</${tag}>`);
  });
  return wrappedChars.join('');
}

class ExpectedText extends Component<TextProps> {
  
  constructor(props: TextProps) {
    super(props);
  }

  render() {
    const text = this.props.text;
    const words = text.split(' ')
    let newContent = ''

    words.forEach(function(word) {
      let line = `<span class='word'>${addWrappers(word, 'span', 'word_inner')}</span><span class='incorrect-overflow'></span><span class='space'></span>`
      newContent = newContent.concat(line.toString())
    })

    return (
      <div className='test-wrapper' dangerouslySetInnerHTML={{ __html: newContent}}></div>
    );
  }
}

  
export default ExpectedText;