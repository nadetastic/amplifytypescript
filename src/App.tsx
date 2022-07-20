// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { API } from "aws-amplify";
import { listTodos } from './graphql/queries';
import { ListTodosQuery } from './API';

function App(): JSX.Element {

  const [todos,set_todos] = useState<ListTodosQuery| null>(null);

  useEffect(()=> {
    fetchTodos();
  },[]);

  const fetchTodos = async () => {
    try {
      const resp = (await API.graphql({ query: listTodos})) as { data: ListTodosQuery} 
      set_todos(resp.data);
    } catch (e) { console.log(e) }
  }

  return (
    <div className="App">
      <h1>My Todos (TypeScript React)</h1>
      {todos?.listTodos?.items.map((t,i) => (
        <div key={i}>{t.name}</div>
      ))}
    </div>
  );
}

export default App;
