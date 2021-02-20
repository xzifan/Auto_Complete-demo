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
      expressions:[],
      text:''
    };
    
  }
  handleTab=(e)=>{
    e = e || window.event;
    if(e.keyCode === 9){
      e.preventDefault();
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
    if (this.state.text.trim()!==''){
      let newWords = this.state.text.split(' ')
      // console.log(newWords)
      // add new expression to the expression prefix tree as an array of words
      this.state.expTrie.add(newWords)
      // add new words to the word prefix tree
      newWords.map(word=>this.state.trie.add(word.toLowerCase()))  
      this.setState({
        expressions:[...this.state.expressions,this.state.text],
        words:[...this.state.words,...newWords],
        text:"",
        rest:"",
        suggestion:""
      })
    }
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
        // the last char is ' ', check completion for expressions 
        let words = text.toLowerCase().slice(0,-1).split(' ')
        let suggestion = this.state.expTrie.find(words)
        if (suggestion && suggestion.length!==0){
          this.setState({suggestion:text+Object.keys(suggestion.children)[0]})
        }
        this.state.expTrie.clear()
      }else{   
        // the last char is 'a-z', possibly an uncomplete word
        let words = text.split(' ')
        const uncomplete = words.pop()
        let rest = words.join(' ')+' '
        this.setState({rest:words.length===0?'':rest})
        if( uncomplete !== '' && this.state.trie){
          let suggestions = this.state.trie.complete(uncomplete.toLowerCase())
          if (suggestions&&suggestions.length>0){
            // slice the suggestion to avoid replacing uppercase
            this.setState({suggestion:uncomplete+suggestions[0].slice(uncomplete.length)})
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
    expTrie.add("what's the weather like today".split(' ')) // for testing
    this.setState({
      words:words,
      trie:trie,
      expTrie:expTrie
    })
  }
  render(){
    return <div className="container">
      <span onClick={()=>{if(window.confirm("Are you sure to clear the existing vocabulary?"))this.setState({trie:new Trie(),expTrie:new Trie(),words:[],text:"",rest:"",suggestion:""})}}>Auto-complete</span>  
      <div className="search_bar">
        <input className="textfield" 
          type='text'
          autoFocus 
          onChange={this.handleInput} 
          onKeyDown={this.handleTab}
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