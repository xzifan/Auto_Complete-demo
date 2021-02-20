import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Trie from './Trie'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trie:null,
      rest:'',
      suggestion:'',
      words:[],
      expressions:[]
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
    let timer = setTimeout(()=>this.completion(e),250)
    this.setState({
      suggestion:'',
      text:e.target.value,
      timer:timer,
      rest:''
    })
    
  }
  handleSubmit = ()=>{
    let newWords = this.state.text.split(' ')
    console.log(newWords)
    this.state.expTrie.add(newWords)
    newWords.map(word=>this.state.trie.add(word.toLowerCase()))  
    this.setState({
      expressions:[...this.state.expressions,this.state.text],
      words:[...this.state.words,...newWords],
      text:"",
      rest:"",
      suggestion:""
    })
  }
  getVocabulary = async()=>{
    const url = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt';
    const res = await fetch(url, {
      method: 'GET'
    });
    return await res.text();
  }

  completion = () => {
    let text = this.state.text
    if (text.trim() !== ''){   
      if (text.charAt(text.length-1)===' '){
        let words = text.slice(0,-1).split(' ')
        let suggestion = this.state.expTrie.find(words)
        if (suggestion && suggestion.length!==0){
          this.setState({suggestion:words.join(' ')+" "+Object.keys(suggestion.children)[0]})
        }
        this.state.expTrie.clear()
      }else{   
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
  }
  async componentDidMount(){
    let data = await this.getVocabulary()
    let words = data.split('\n')
    let trie = new Trie()
    let expTrie = new Trie()
    words.map(word=>trie.add(word.toLowerCase()))
    expTrie.add("what's the weather like today".split(' '))
    console.log(words)
    this.setState({
      words:words,
      trie:trie,
      expTrie:expTrie
    })
    console.log("initial",trie)
  }
  componentDidUpdate() {
    this._input.focus();
  }
  render(){
    return <div className="container">
      <span>Auto-complete</span>  
      <div className="search_bar">
        <input className="textfield" 
          type='text'
          autoFocus 
          ref={c => (this._input = c)}
          onChange={this.handleInput} 
          onKeyDown={(e)=>this.handleTab(e)}
          value={this.state.text }
        />
        <input className="textfield copy"
          value={this.state.rest+this.state.suggestion || ''}
          readOnly
        />
        <button className="btn_submit" onClick={this.handleSubmit}>submit</button>
      </div>
    </div>
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);