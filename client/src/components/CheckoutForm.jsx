import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import { postCharge } from '../services/stripeService';

import CardSection from './CardSection';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: ''
    }
    this.style = {
      height: '400px',
      width: '600px',
      display: 'flex',
      flexDirection: 'column',
      margin: '30vh auto 0px auto',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.stripe.createToken({name: this.state.customerName})
    .then(({token}) => {
      postCharge({ id: token.id, amount: 10 });
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleNameInput = (e) => {
    this.setState({customerName: e.target.value});
  }

  render() {
    return(
      <form onSubmit={(e) => this.handleSubmit(e)} style={this.style}>
        <input onChange={(e) => this.handleNameInput(e)} placeholder='Name' htmlFor="name" id="name"/>
        <CardSection />
        <button className="btn btn-primary">SUBMIT</button>
      </form>
    );
  }
};

export default injectStripe(CheckoutForm);