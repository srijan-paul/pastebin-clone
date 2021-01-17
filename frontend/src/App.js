import React, { Component } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/LogIn/SignUp";
import ViewPaste from "./ViewPaste";
import { UserProvider } from "./components/LogIn/AuthContext";

import Logo from "./components/Logo";
import Titlebar from "./components/Titlebar/Titlebar";

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
import { Button } from "react-bootstrap";
import UserProfile from "./UserProfile";

axios.defaults.headers.common = {
	"Content-Type": "application/json",
};

export default function App() {
	let [currentUser, setUser] = React.useState({ name: "Guest", isGuest: true });
	const history = useHistory();

	function newPaste(data) {
		axios
			.post("/api/paste", {
				filename: data.filename,
				content: data.content,
				language: data.language,
				isGuestPost: currentUser.isGuest,
				username: currentUser.name,
				isPublic: true,
			})
			.then((res) => {
				history.push("/paste/" + res.data.id);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	React.useEffect(() => {
		const username = sessionStorage.getItem("username");
		const sessionId = sessionStorage.getItem("sessionId");
		if (!(username && sessionId)) return;
		axios
			.post("/api/users/authenticate", {
				username,
				sessionId,
			})
			.then((res) => {
				if (res.data.success) {
					setUser({ name: username, isGuest: false, sessionId: sessionId });
				}
			})
			.catch((e) => {
				console.log("Failed to authenticate user from local storage: " + e.message);
			});
	}, []);

	return (
		<div className="main">
			<UserProvider value={currentUser}>
				<Navbar />
				<div className="content">
					<Route path="/login" render={() => <SignUp onUserLogIn={setUser} />} />
					<Route path="/" exact render={() => <MainPage newPaste={newPaste} />} />
					<Route path="/home" exact render={() => <MainPage newPaste={newPaste} />} />
					<Route path="/paste/:pasteId" component={ViewPaste} />
					<Route path="/user/:name" component={UserProfile} />
				</div>
			</UserProvider>
		</div>
	);
}

function MainPage({ newPaste }) {
	return (
		<div>
			<Header />
			<Editor newPaste={newPaste} />
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
		this.state = { lang: "javascript", filename: "untitled" };
		this.codeRef = React.createRef();
		this.fileNameRef = React.createRef();
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		const content = this.codeRef.current.editor.getValue();
		if (content.length < 10) return;
		this.props.newPaste({
			content: content,
			language: this.state.lang,
			filename: this.fileNameRef.current.value,
		});
	}

	render() {
		return (
			<div className="editor-wrapper">
				<div className="editor">
					<Titlebar
						onLangChange={(langName) => {
							this.setState({ lang: langName });
						}}
						fileNameRef={this.fileNameRef}
					/>
					<div id="textarea-wrapper">
						<AceEditor
							mode={this.state.lang || "java"}
							theme="textmate"
							name="editor"
							fontSize={16}
							width="100%"
							height="500px"
							fontFamily="monospace"
							ref={this.codeRef}
						/>
					</div>
				</div>

				<Control onSubmit={this.onSubmit} />
			</div>
		);
	}
}

function Control(props) {
	let [active, setActive] = React.useState(true);

	return (
		<div className="control-wrapper">
			<Button
				variant="outline-info"
				onClick={() => {
					if (active) {
						props.onSubmit();
						setActive(false);
					}
				}}
			>
				Create paste
			</Button>
		</div>
	);
}
