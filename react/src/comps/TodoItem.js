import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        // if(this.props.todo.completed){
        //     return{
        //         textDecoration: 'line-through'
        //     }
        // } else{
        //     return{
        //         textDecoration: 'none'
        //     }
        // }
        return{
            background: '#f4f4f4',
            padding:'10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed? 'line-through' : 'none'
        }
    }
    
    markComplete = (e) => {
        console.log(this.props)
    }

    render(){
        const { id,title } = this.props.todo;
      return(
          <div style={this.getStyle()}>
          <p>
              <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/> {' '}
              { title }
              <button onClick={this.props.delTodo.bind(this, id)} style={ btnStyle }>X</button>
              </p>
          </div>
      )
    }
}

//propTypes 
TodoItem.propTypes ={
    todos: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: 'none',
    padding: '5px 9px',
    cursor: 'pointer',
    float: 'right',
    borderRadius: '50%'
}

export default TodoItem;
