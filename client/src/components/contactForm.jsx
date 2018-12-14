import React, { Component } from 'react';
import {sendContactEmail } from '../services/contact';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleName = (name) => {
    this.setState({ name });
  }

  handleMessage = (message) => {
    this.setState({ message });
  }

  handleEmail = (email) => {
    this.setState({ email });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    sendContactEmail(this.state.name, this.state.email, this.state.message)
      .then(() => {
        //redirect to the homepage
        this.props.history.push('/')
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div className="container bg-light">
        <form onSubmit={e => this.handleSubmit(e)} >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input onChange={e => this.handleName(e.target.value)} type="text" id="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={e => this.handleEmail(e.target.value)} type="email" id="email" className="form-control" />
          </div>
          <div className="form-group">
            <textarea onChange={e => this.handleMessage(e.target.value)} cols="30" rows="10" className="form-control"></textarea>
          </div>
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

export default Contact;