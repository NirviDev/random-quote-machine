import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: null,
      author: "",
      text: "",
      isLoaded: false,
      newColor: "#000000",
      clickCount: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.shareOnTwitter = this.shareOnTwitter.bind(this);
  }

  handleClick() {
    this.generateQuote();
    this.changeColor();
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          apiResult: responseData.quotes,
          isLoaded: true,
          author: responseData.quotes[0].author,
          text: responseData.quotes[0].quote,
          quotesArrayLength: responseData.quotes.length
        });
      });
  }

  generateQuote = () => {
    const chosenQuote = [];
    const quotes = this.state.apiResult;
    let randomNumber = Math.floor(
      Math.random() * this.state.apiResult.length + 1
    );
    quotes.forEach(function(element, index) {
      if (index === randomNumber) {
        chosenQuote.push(element);
      }
    });
    this.setState({
      text: chosenQuote[0].quote,
      author: chosenQuote[0].author
    });
  };

  changeColor = () => {
    const color = ["#385a7c", "#f97171", "#f99192", "#8ad6cc", "#b2eee6"];
    let i = this.state.clickCount;

    this.setState({
      clickCount: this.state.clickCount + 1,
    });
    if (i < 4) {
      this.setState({
        newColor: color[i],
        clickCount: this.state.clickCount + 1,
      });
    } else if (i >= 4) {
      this.setState({
        newColor: 0,
        clickCount: 0,
      });
    } else if (i === 0) {
      this.setState({
        clickCount: this.state.clickCount + 1,
        newColor: color[i]
      });
    }
  };

  shareOnTwitter = () => {
    // found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
    var url = "twitter.com";
    let text = `${this.state.author} - ${this.state.text}`;
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  render() {
    return (
      <div id="wrapper">
        <div className="panandinkwell"></div>
        <div className="book">
          <div className="title-footer">
            <div className="title">Random Quote Machine</div>
            <div className="footer">
              by
              <a href="https://codepen.io/Nirvi/" target="_blank">
                Nirvi
              </a>
            </div>
          </div>
          <div id="quote-box">
            <div id="text">{this.state.text}</div>
            <div id="author">- {this.state.author}</div>
            <div className="buttons">
              <div className="button tweet-button">
                <a
                  title="Tweet this quote!"
                  id="tweet-quote" href="twitter.com/intent/tweet"
                  target="_blank" onClick={this.shareOnTwitter}
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </div>
              <div>
                <button
                  className="button"
                  id="new-quote"
                  onClick={this.handleClick}
                >
                  <span>New qoute</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
