import React, { Component } from "react";

import "./App.css";

import logo from "./logo.svg";

// import brace from "brace";
import AceEditor from "react-ace";

// Syntax modes
import "brace/mode/javascript";
import "brace/mode/java";
import "brace/mode/lua";
import "brace/mode/c_cpp";
import "brace/mode/python";
import "brace/mode/scheme";
import "brace/mode/sql";
import "brace/mode/swift";
import "brace/mode/tsx";

// themes
import "brace/theme/monokai";
import "brace/theme/dawn";
import "brace/theme/merbivore";

const LangaugeList = new Map([
  ["Javascript", "javascript"],
  ["Lua", "lua"],
  ["C", "c_cpp"],
  ["C++", "c_cpp"],
  ["Python", "python"],
  ["Java", "java"],
  ["C#", "csharp"],
  ["TSX", "tsx"],
  ["Scheme", "scheme"],
  ["Swift", "swift"],
]);

class App extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {}

  render() {
    return (
      <div className="main">
        <div className="content">
          <Header />
          <Editor />
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div className="d8">
      <h1 className="heading">
        <img
          src={logo}
          alt="logo"
          width="40px"
          height="auto"
          style={{ verticalAlign: "middle" }}
        />
        &nbsp;CLIP IT !
      </h1>

      <p className="info">
        Share text and code snippets with the click of a button!
      </p>
    </div>
  );
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { lang: "javascript" };
  }

  render() {
    return (
      <div className="editor">
        <Titlebar
          onLangChange={(langName) => {
            this.setState({ lang: langName });
          }}
        />
        <div id="textarea-wrapper">
          <AceEditor
            mode={this.state.lang || "java"}
            theme="dawn"
            name="editor"
            fontSize={18}
            width="100%"
            height="400px"
            fontFamily="monospace"
          />
        </div>
      </div>
    );
  }
}

function Titlebar(props) {
  return (
    <div className="titlebar">
      <Dot color="#e74c3c" />
      <Dot color="#fbc531" />
      <Dot color="#2ecc71" />

      <div
        style={{ display: "inline-block", float: "right", marginRight: "4px" }}
      >
        <LangSelect onSelect={props.onLangChange} />
        <input type="text" id="filename-input" placeholder="filename" />
      </div>
    </div>
  );
}

class LangSelect extends Component {
  constructor(props) {
    super(props);
    this.selector = document.getElementById("lang-sel");
  }

  componentDidMount() {
    this.selectEl = document.getElementById("lang-sel");
    LangaugeList.forEach((themeName, displayName) => {
      this.selectEl.options[this.selectEl.options.length] = new Option(
        displayName,
        themeName
      );
    });
  }

  render() {
    return (
      <select
        name="language"
        id="lang-sel"
        onChange={() => this.props.onSelect(this.selectEl.value)}
      ></select>
    );
  }
}

function Dot(props) {
  return (
    <div
      className="dot"
      style={{
        backgroundColor: props.color,
        marginLeft: "10px",
      }}
    ></div>
  );
}

export default App;
