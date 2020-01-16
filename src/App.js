import React from "react";
import "./App.css";
import kristy from "./kristy.png";

class App extends React.Component {
  state = { render: false, lazy: false, intersection: 0 };
  card = React.createRef();

  componentDidMount() {
    let option = {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    var io = new IntersectionObserver(entries => {
      this.setState({
        intersection: entries[0].intersectionRatio.toFixed(2)
      });
      if (this.state.lazy === false) {
        this.setState({ lazy: true });
        setTimeout(() => this.setState({ render: true }), 5e3);
      }
    }, option);
    io.observe(document.querySelector(".ui.card"));
  }
  render() {
    return (
      <div className="App">
        <div className="left-title">
          <div className="left">Lazy</div>
          <div className="right">Shimmer</div>
          <div>
            <span className="l">Intersection: </span>
            <span className="r">{this.state.intersection}</span>
          </div>
        </div>
        <div className="pusher"></div>
        <div className="ctn" ref={this.card}>
          <div className="main-ctn">
            <div
              className="ui card"
              style={{
                width: "250px",
                height: "400px",
                overflow: "hidden"
              }}
            >
              {this.state.lazy === false ? (
                <div className="lazyholder">
                  <div className="ui placeholder">
                    <div className="square image"></div>
                    <div className="square image"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="image">
                    {this.state.render === false ? (
                      <div className="ui placeholder">
                        <div className="square image"></div>
                      </div>
                    ) : (
                      <img src={kristy} alt="pic" />
                    )}
                  </div>
                  <div className="content">
                    {this.state.render === true ? (
                      <>
                        <a className="header">Kristy</a>
                        <div className="meta">
                          <span className="date">Joined in 2013</span>
                        </div>
                        <div className="description">
                          Kristy is an art director living in New York.
                        </div>
                      </>
                    ) : (
                      <div className="ui placeholder">
                        <div className="header">
                          <div className="very short line"></div>
                          <div className="medium line"></div>
                        </div>
                        <div className="paragraph">
                          <div className="short line"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="extra content">
                    {this.state.render === false ? (
                      <div className="ui placeholder">
                        <div className="very short line"></div>
                      </div>
                    ) : (
                      <a>
                        <i className="user icon"></i>
                        22 Friends
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
