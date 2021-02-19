import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Trie from './Trie'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words:null,
      trie:null,
      rest:'',
      suggestion:''
    };
    
  }
  handleTab=(e)=>{
    e = e || window.event;
    if(e.keyCode === 9){
      e.preventDefault();
      console.log('catch tab')
      this.setState({
        text:this.state.rest+this.state.suggestion,
        suggestion:''
      })
    }
  }
  handleInput=(e)=>{
    //debounce
    clearTimeout(this.state.timer)
    let timer = setTimeout(()=>this.completion(e),500)
    this.setState({
      suggestion:'',
      text:e.target.value,
      timer:timer
    })
    
  }

  getVocabulary = async()=>{
    const url = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt';
    const res = await fetch(url, {
      method: 'GET'
    });
    return await res.text();
  }

  completion = (e) => {
    let text = this.state.text
    if (text.trim() !== ''){
      const start_time = new Date().getTime()
      let words = text.split(' ')
      const last_word = words.pop()
      let rest = words.join(' ')+' '
      this.setState({rest:words.length===0?'':rest})
      if( last_word !== '' && this.state.trie){
        let suggestions = this.state.trie.complete(last_word)
        if (suggestions&&suggestions.length>0){
          this.setState({suggestion:suggestions[0]})
          this.state.trie.clear()
        }
      }
    }
  }
  async componentDidMount(){
    let data = await this.getVocabulary()
    let words = data.split('\n')
    let trie = new Trie()
    words.map(word=>trie.add(word.toLowerCase()))
    console.log(words)
    this.setState({
      words:words,
      trie:trie
    })
    console.log("initial",trie)
  }
  componentDidUpdate() {
    this._input.focus();
  }
  render(){
    return <div className="container">
      <input className="textfield" 
        type='text'
        autoFocus 
        ref={c => (this._input = c)}
        onChange={this.handleInput} 
        onKeyDown={(e)=>this.handleTab(e)}
        value={this.state.text}
      />
      <input className="textfield copy"
        value={this.state.rest+this.state.suggestion}
      />
      <button className="btn_submit">submit</button>
    </div>
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);