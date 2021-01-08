import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/LogIn/Login";

import Logo from "./components/Logo";

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
import "brace/theme/textmate";

// Maps the display names of languages to their
// Ace theme names.
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

export default class App extends Component {
	// constructor(props) {
	//   super(props);
	// }

	componentDidMount() {
		axios.get("/api").then((res) => {
			const data = res.data;
			console.log(data);
		});
	}

	render() {
		return (
			<div className="main">
				<Navbar />
				<div className="content">
					<Router>
						<Route path="/login" component={Login} />
						<Route path="/"  exact component={MainPage} />
					</Router>
				</div>
			</div>
		);
	}
}

function MainPage() {
	return (
		<div>
			<Header />
			<Editor />
		</div>
	);
}

function Header() {
	return (
		<div className="d8">
			<Logo fontSize="3rem" logoSize="7%" />
			<p className="info">Share text and code snippets with the click of a button!</p>
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
						theme="textmate"
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

			<div style={{ display: "inline-block", float: "right", marginRight: "4px" }}>
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
			this.selectEl.options[this.selectEl.options.length] = new Option(displayName, themeName);
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
