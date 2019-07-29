import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Hero from "./components/Hero";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matches.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a card to get started!";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    matches,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const matches = this.state.matches
    const clickedMatch = matches.filter(match => match.id === id);
    if (clickedMatch[0].clicked){
      correctGuesses = 0;
      clickMessage = "You already clicked this card!"
      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
      this.setState({clickMessage});
      this.setState({correctGuesses});
      this.setState({matches});
    } else if (correctGuesses < 10) {
      clickedMatch[0].clicked = true;
      correctGuesses++;
      clickMessage = "Keep going! You haven't clicked on that one yet!";
      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({bestScore});
      }
      matches.sort(function(a, b){return 0.5 - Math.random()});
      this.setState({matches});
      this.setState({correctGuesses});
      this.setState({clickMessage});
    } else {
      clickedMatch[0].clicked = true;
      correctGuesses = 0;
      clickMessage = "You won!";
      bestScore = 11;
      this.setState({bestScore});
      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
      matches.sort(function(a, b){return 0.5 - Math.random()});
      this.setState({matches});
      this.setState({correctGuesses});
      this.setState({clickMessage});
    }
    // Set this.state.friends equal to the new friends array
    this.setState({ matches });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
      <Hero backgroundImage="https://images.pexels.com/photos/1842623/pexels-photo-1842623.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260">
        <h1>Clicky Game</h1>
        <h4>Keep clicking the cards below until you have clicked them all, but make sure to not click the same card twice!</h4>
      </Hero>
      <Wrapper>
        <Title>Score Board</Title>
        <h4 className="scoreBoard">
          {this.state.clickMessage}
        </h4>
        <h4 className="scoreBoard card-header">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          Best Score: {this.state.bestScore}
        </h4>
        <div className="container">
          <div className="row">
            {this.state.matches.map(match => (
              <FriendCard
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
                />
            ))}
          </div>
        </div>
        </Wrapper>
        </div>
    );
  }
}

export default App;
