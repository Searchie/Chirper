import React, { Component } from "react";
import User from "./User";
import Comment from "./EditableComment";

class Chirp extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.state = {
      chirpText: '',
      chirpUser: ''
    };
  }

  componentWillMount() {
    fetch(`http://localhost:3000/api/chirps/${this.id}`)
      .then(res => res.json())
      .then(obj => {
        this.setState({
          chirpText: obj.text,
          chirpUser: obj.name
        });
      })
      .catch(err => console.log("Error:", err));
  }

  render() {
    return (
      <div id="editableChirp" className="border border-info bg-white chirp row">
        <User avatarUrl={this.props.avatarUrl} username={this.state.chirpUser} />
        <div className="border border-dark">
          <p>{this.state.chirpText}</p>
        </div> 
      </div>
    );
  }
}

export default Chirp;
