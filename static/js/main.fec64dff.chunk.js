(this["webpackJsonpauto-completion"]=this["webpackJsonpauto-completion"]||[]).push([[0],{19:function(t,e,n){},21:function(t,e,n){"use strict";n.r(e);var s=n(2),r=n.n(s),i=n(9),a=n(7),o=n(5),c=n(6),u=n(13),l=n(12),h=n(3),d=n.n(h),f=n(11),g=n.n(f),p=(n(19),n(10)),v=function(){function t(){Object(o.a)(this,t),this.trie=null,this.suggestions=[]}return Object(c.a)(t,[{key:"newNode",value:function(){return{isLeaf:!1,children:{}}}},{key:"add",value:function(t){this.trie||(this.trie=this.newNode());var e,n=this.trie,s=Object(p.a)(t);try{for(s.s();!(e=s.n()).done;){var r=e.value;r in n.children||(n.children[r]=this.newNode()),n=n.children[r]}}catch(i){s.e(i)}finally{s.f()}n.isLeaf=!0}},{key:"find",value:function(t){var e=this.trie;if(e){var n,s=Object(p.a)(t);try{for(s.s();!(n=s.n()).done;){var r=n.value;if(!(r in e.children))return null;e=e.children[r]}}catch(i){s.e(i)}finally{s.f()}}return e}},{key:"traverse",value:function(t,e){if(t.isLeaf)this.suggestions.push(e);else for(var n in t.children)this.traverse(t.children[n],e+n)}},{key:"complete",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=this.find(t);if(!n)return this.suggestions;var s=n.children,r=0;for(var i in s)if(this.traverse(s[i],t+i),r++,e&&r===e)break;return console.log(this.suggestions),this.suggestions}},{key:"clear",value:function(){this.suggestions=[]}},{key:"print",value:function(){console.log(this.trie)}}]),t}(),b=n(0),m=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var s;return Object(o.a)(this,n),(s=e.call(this,t)).handleTab=function(t){9===(t=t||window.event).keyCode&&(t.preventDefault(),s.setState({text:s.state.rest+s.state.suggestion,suggestion:""}))},s.handleInput=function(t){clearTimeout(s.state.timer);var e=setTimeout((function(){return s.completion(t)}),250);s.setState({suggestion:"",text:t.target.value,timer:e,rest:""})},s.handleSubmit=function(){if(""!==s.state.text.trim()){var t=s.state.text.split(" ");console.log(t),s.state.expTrie.add(t),t.map((function(t){return s.state.trie.add(t.toLowerCase())})),s.setState({expressions:[].concat(Object(a.a)(s.state.expressions),[s.state.text]),words:[].concat(Object(a.a)(s.state.words),Object(a.a)(t)),text:"",rest:"",suggestion:""})}},s.getVocabulary=Object(i.a)(r.a.mark((function t(){var e;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt",t.next=3,fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt",{method:"GET"});case 3:return e=t.sent,t.next=6,e.text();case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t)}))),s.completion=function(){var t=s.state.text;if(""!==t.trim())if(" "===t.charAt(t.length-1)){var e=t.toLowerCase().slice(0,-1).split(" "),n=s.state.expTrie.find(e);n&&0!==n.length&&s.setState({suggestion:t+Object.keys(n.children)[0]}),s.state.expTrie.clear()}else{var r=t.split(" "),i=r.pop(),a=r.join(" ")+" ";if(s.setState({rest:0===r.length?"":a}),""!==i&&s.state.trie){var o=s.state.trie.complete(i.toLowerCase());o&&o.length>0&&(s.setState({suggestion:i+o[0].slice(i.length)}),s.state.trie.clear())}}},s.state={trie:null,rest:"",suggestion:"",words:[],expressions:[],text:""},s}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var t=Object(i.a)(r.a.mark((function t(){var e,n,s,i;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getVocabulary();case 2:e=t.sent,n=e.split("\n"),s=new v,i=new v,n.map((function(t){return s.add(t.toLowerCase())})),i.add("what's the weather like today".split(" ")),this.setState({words:n,trie:s,expTrie:i});case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("span",{children:"Auto-complete"}),Object(b.jsxs)("div",{className:"search_bar",children:[Object(b.jsx)("input",{className:"textfield",type:"text",autoFocus:!0,onChange:this.handleInput,onKeyDown:this.handleTab,value:this.state.text}),Object(b.jsx)("input",{className:"textfield copy",value:this.state.rest+this.state.suggestion||"",readOnly:!0}),Object(b.jsx)("button",{className:"btn_submit",onClick:this.handleSubmit,children:"submit"})]})]})}}]),n}(d.a.Component);g.a.render(Object(b.jsx)(m,{}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.fec64dff.chunk.js.map