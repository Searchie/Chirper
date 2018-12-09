import React, { Component } from "react";
import ChirpList from "./ChirpList";
import NavigationBar from "./Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chirpInputText: "",
      user: "",
      userAvatar: "",
      chirpArr: []
    };
  }

  componentDidMount() {
    this.APIGet();
  }

  handleInputChange = val => {
    this.setState({ chirpInputText: val });
  };

  handleClick(id) {
    this.setState({
      chirpArr: this.state.chirpArr.concat({
        key: id,
        id: id,
        userName: this.state.user,
        avatarUrl: this.state.userAvatar,
        text: this.state.chirpInputText
      }),
      chirpInputText: ""
    });
  }

  APIPost = (name, text) => {
    if (localStorage.authtoken)
    fetch(`http://localhost:3000/api/chirps/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": localStorage.authtoken
      },
      body: JSON.stringify({
        name: name,
        text: text
      })
    })
      .then(res => res.json())
      .then(obj => obj[0])
      .then(query => Object.values(query[0]))
      .then(id => this.handleClick(id));
  };

  APIGet = () => {
    if (localStorage.authtoken)
    fetch(`http://localhost:3000/api/chirps/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": localStorage.authtoken
      }})
      .then(res => res.json())
      .then(obj => obj[0])
      .then(arr => {
        this.setState({
          chirpArr: arr
        });
      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.APIPost();
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <div className="container-fluid row justify-content-center">
          <div className="col*-12">
            <div>
              <textarea
                cols="67"
                maxLength="280"
                value={this.state.chirpInputText}
                onChange={input => this.handleInputChange(input.target.value)}
                onKeyPress={this.handleKeyPress}
              />
              <br />
              <button
                className="btn btn-info"
                onClick={() => {
                  this.APIPost(this.state.user, this.state.chirpInputText);
                }}
              >
                Chirp Chirp!
              </button>
            </div>
            <ChirpList items={this.state.chirpArr} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
