import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// 컴포넌트 -> 사용자 정의 태그
function Header(props){
  console.log("props:", props, "제목:", props.title);
  return (
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMod();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
  const list = []
  console.log("중간로그:",props.topics)
  props.topics.map(item => {
    list.push(<li key={item.id}>
      <a id={item.id} href={item.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMod(Number(event.target.id));
      }}>{item.title}</a>
    </li>)
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

const Create = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body)
      }}>
        <p><input type="text" name="title" id="" placeholder='title'/></p>
        <p><textarea name="body" placeholder='body'></textarea></p>
        <p><input type="submit" value='Create'/></p>
      </form>
    </article>
  )
}

const Update = (props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body)
      }}>
        <p><input type="text" name="title" id="" placeholder='title' value={title} onChange={event=>{
          setTitle(event.target.value)
        }}/></p>
        <p><textarea name="body" placeholder='body' value={body} onChange={event=>{
          setBody(event.target.value)
        }}></textarea></p>
        <p><input type="submit" value='Update'/></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id:1, title:'html', body:'html is ...' },
    { id:2, title:'css', body:'css is ...' },
    { id:3, title:'javascrip', body:'javascrip is ...' }
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"/>
  }else if(mode === 'READ'){
    let title, body = null;
    topics.map((item)=>{
      if(item.id === id){
       title =  item.title
       body =  item.body
      }
    })
    content = <Article title={title} body={body}/>
    contextControl = <>
      <li><a href={"/update/"+id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={()=>{
        const newTopics = []
        topics.map(item=>{
          if(item.id !== id){
            newTopics.push(item)
          }
        })
        setTopics(newTopics)
        setMode('WELCOME')
      }}/></li>
    </>
  }else if(mode === 'CREATE'){
    content = <Create title='Create' onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null;
    topics.map((item)=>{
      if(item.id === id){
       title =  item.title
       body =  item.body
      }
    })
    content = <Update title={title} body={body} onUpdate={(_title, _body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:_title, body:_body}
      newTopics.forEach((item, index) => {
        if(item.id === id){
          newTopics[index] = updatedTopic;
          return false;
        }
      })
      setTopics(newTopics);
    }}></Update>
  }

  return (
    <div>
      <Header title="WEB" onChangeMod={()=>{
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMod={(_id)=>{
        setMode('READ')
        setId(_id)
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
