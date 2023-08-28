import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// 컴포넌트 -> 사용자 정의 태그
function Header(props){
  console.log("props:", props, "제목:", props.title);
  return (
    <header>
      <h1><a href="/" onClick={(e)=>{
        e.preventDefault();
        props.onChange();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
  const list = []
  console.log("중간로그:",props.topics)
  props.topics.map(item => {
    list.push(<li key={item.id}><a href={item.id}>{item.title}</a></li>)
  })
  return (
    <nav>
      <ol>
        {list}
      </ol>
    </nav>
  )
}

const Article = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}



function App() {
  const topics = [
    { id:1, title:'html', body:'html is ...' },
    { id:2, title:'css', body:'css is ...' },
    { id:3, title:'javascrip', body:'javascrip is ...' },
  ];
  return (
    <div>
      <Header title="WEB" onChange={()=>{
        alert('Header')
      }}></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"/>
    </div>
  );
}

export default App;
