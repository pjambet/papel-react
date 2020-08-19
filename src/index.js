import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    console.log(type);
    console.log(contentBlock);
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }

  render() {
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="What did you learn today?"
          blockStyleFn={this.myBlockStyleFn}
        />
      </div>
    );
  }
}

const styles = {
  editor: {
    padding: '10px',
    margin: '10px 0 0 0',
    // border: '1px solid gray',
    fontSize: '22px',
    // minHeight: '6em'
  }
};

ReactDOM.render(
  <MyEditor />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
