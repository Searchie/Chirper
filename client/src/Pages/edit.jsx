import React, { Component } from "react";
import User from "../components/User";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chirpUser: "",
      chirpText: ""
    };
    this.id = this.props.match.params.id;
    this.uri = `http://localhost:3000/api/chirps/${this.id}`;
  }

  handleInputChange = val => {
    this.setState({ chirpText: val });
  };

  delete() {
    fetch(this.uri, {
      method: "DELETE"
    }).then(console.log("The chirp has been deleted"));
  }

  update(text, user) {
    fetch(this.uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        name: user
      })
    });
  }

  getChirp() {
    fetch(this.uri)
      .then(res => res.json())
      .then(obj => obj[0])
      .then(obj => {
        this.setState({
          chirpText: obj[0].text,
          chirpUser: obj[0].name
        });
      });
  }

  componentDidMount() {
    this.getChirp();
  }

  render() {
    return (
      <div
        id="editContainer"
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div id="editableChirp" className="row border border-dark">
          <User
            avatarUrl={this.props.avatarUrl}
            username={this.state.chirpUser}
          />
          <textArea
            onChange={input => this.handleInputChange(input.target.value)}
          >
            {this.state.chirpText}
          </textArea>
        </div>
        <div>
          <a
            className="btn btn-sm btn-dark text-white"
            onClick={() => this.props.history.goBack()}
          >
            Back
          </a>
          <a
            className="btn btn-sm btn-danger text-white"
            onClick={() => {
              window.confirm("Are you sure you wish to delete this chirp?") &&
                this.delete();
              this.props.history.goBack();
            }}
          >
            Delete
          </a>
          <a
            className="btn btn-sm btn-primary text-white"
            onClick={() => {
              this.update(this.state.chirpText, this.state.chirpUser);
              this.props.history.goBack();
            }}
          >
            Save
          </a>
        </div>
      </div>
    );
  }
}

export default Edit;
