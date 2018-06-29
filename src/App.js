import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      list:[],
      user_list:[]
    };
    this.onChange=this.onChange.bind(this);
  }
  onChange = (event) => {
  if(event.key == 'Enter'){
    console.log(event.target.value)

    axios.get('https://api.github.com/search/users?q=' + event.target.value)
      .then(res => {
        console.log(res.data.items)
        this.setState({user_list:res.data.items});
      })
  }
}

  render() {
    return (
      <div className="">
        <h2 className="text-center">My app</h2>
        <div className="Todo-App">
        <div className="search-form">
        <input type="text" placeholder="Search for your favorite songs" className="search-songs" onKeyPress={this.onChange.bind(this)}/>
        </div>
        <div className="Todo-List">
          <ul>{this.state.user_list.map((list) =>
          <li key={list.id} className="list-unstyled">
          <div className="song-list d-flex">
          <img src={list.avatar_url} className="img-thumbnail"/>
            <h4>{list.login}</h4>
          <div className="description">

          <span>Repo url:<a href={list.html_url} target="_blank">{list.html_url}</a></span>
          <span>Score:{list.score}</span>
          </div>

          </div>
          </li>
        )}</ul>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
