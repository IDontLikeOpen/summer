import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './comps/layouts/header';
import Todos from './comps/Todos';
import AddTodo from './comps/AddTodo';
import About from './comps/Pages/About';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class App extends Component{
  state = { 
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  //mark TODO
  markComplete = (id) =>{
    this.setState({ todos: this.state.todos.map((todo) => {
        if ( todo.id===id ) {
          todo.completed = !todo.completed
        }
        return todo;
      }) 
    })
  }
// DELETE TODO
  delTodo = (id) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: 
        [...this.state.todos.filter(todo => todo.id !== id)]}));
    //this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

//ADD TODO
  addTodo = (title) => {
    // const newTodo = {
    //   //
    //   id: uuidv4(),
    //   title,
    //   completed:false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed:false
    })
      .then(res => this.setState({ todos: 
        [...this.state.todos, res.data]}));
    //this.setState({ todos: [...this.state.todos, newTodo]});
  }

  render(){    
    return (
     <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}  />
              </React.Fragment>
            )} />
            <Route path='/About' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
