import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import List from './components/List/List';

class App extends Component {
  constructor() {
    super();

    this.state = {
      people: [],
      newName: '',
      didErr: false
    };

    this.addPerson = this.addPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }
  componentDidMount() {
    axios
      .get('/api/people')
      .then(response => this.setState({ people: response.data }));
  }
  addPerson() {
    axios
      .post('/api/people', { name: this.state.newName })
      .then(response => this.setState({ people: response.data, newName: '' }))
      .catch(err => this.setState({ didErr: true, newName: '' }));
  }

  deletePerson(id) {
    axios
      .delete(`/api/people/${id}`)
      .then(response => this.setState({ people: response.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {!this.state.people[0] ? (
          <h1>Loading</h1>
        ) : (
          <List list={this.state.people} deletePerson={this.deletePerson} />
        )}
        <div>
          <input
            type="text"
            onChange={e => this.setState({ newName: e.target.value })}
            value={this.state.newName}
          />
          <button onClick={this.addPerson}>Add Person</button>
        </div>
        {this.state.didErr && <h1>ERROR :(</h1>}
      </div>
    );
  }
}

export default App;
