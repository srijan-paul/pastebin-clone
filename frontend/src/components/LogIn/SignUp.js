import React, { Component, useRef, useContext } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

import { UserContext } from "./AuthContext";

import "../../App.css";

axios.defaults.headers.common = {
	"Content-Type": "application/json",
};

export default class SignPage extends Component {
	constructor(props) {
		super(props);
		this.switchToSignUp = this.switchToSignUp.bind(this);
		this.switchToLogIn = this.switchToLogIn.bind(this);

		this.state = {
			currentPanel: null,
			logInPanel: <LogInPanel onSwitch={this.switchToSignUp} updateUser={this.props.onUserLogIn} />,
			signUpPanel: <SignUpPanel onSwitch={this.switchToLogIn} />,
		};
	}

	switchStateTo(panel) {
		this.setState({ currentPanel: panel });
	}

	switchToSignUp() {
		this.setState({ currentPanel: this.state.signUpPanel });
	}

	switchToLogIn() {
		this.setState({ currentPanel: this.state.logInPanel });
	}

	componentDidMount() {
		this.setState({ currentPanel: this.state.signUpPanel });
	}

	render() {
		return <div>{this.state.currentPanel}</div>;
	}
}

function SignUpPanel(props) {
	// const passwordPattern = /\d+/;

	const nameRef = useRef();
	const pwRef = useRef();
	const pwconfRef = useRef();

	const onFormSubmit = () => {
		const password = pwRef.current.value;
		const username = nameRef.current.value;

		axios
			.post("/register", {
				username,
				password,
			})
			.then((res) => {
				console.log(res);
			});
	};

	return (
		<Panel>
			<h2 className="text-center mb-4"> Sign Up </h2>
			<Form>
				<Form.Group id="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" ref={nameRef} required />
				</Form.Group>

				<Form.Group id="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" ref={pwRef} required />
				</Form.Group>

				<Form.Group id="passwod-confirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" ref={pwconfRef} required />
				</Form.Group>

				<Button className="w-100 text-center mt-2" id="sign-up-btn" onClick={onFormSubmit}>
					Sign Up
				</Button>
			</Form>

			<div className="w-100 text-center mt-2">
				Already have an account?
				<Btn onClick={props.onSwitch} text="Log in" />.
			</div>
		</Panel>
	);
}

function LogInPanel(props) {
	const nameRef = React.createRef();
	const passwordRef = React.createRef();

	const onSubmit = () => {
		const username = nameRef.current.value;
		const password = passwordRef.current.value;

		const req = { username, password };

		axios.post("/login", req).then((res) => {
			props.updateUser({
				name: username,
				isGuest: false,
			});
		});
	};

	return (
		<Panel>
			<h2 className="text-center mb-4"> Log in </h2>
			<Form.Group id="username">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" ref={nameRef} required />
			</Form.Group>

			<Form.Group id="passwod-confirm">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" ref={passwordRef} required />
			</Form.Group>

			<Button className="w-100 text-center mt-2" id="log-in-btn" onClick={onSubmit}>
				Log in
			</Button>
			<div className="w-100 text-center mt-2">
				Don't have an account? <Btn onClick={props.onSwitch} text="Sign up" />.
			</div>
		</Panel>
	);
}

function Panel(props) {
	return (
		<Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
			<div style={{ maxWidth: "400px", minWidth: "400px" }}>
				<Card>
					<Card.Body>{props.children}</Card.Body>
				</Card>
			</div>
		</Container>
	);
}

function Btn(props) {
	return (
		<div onClick={props.onClick} style={{ cursor: "pointer" }} className="btn-link">
			{props.text}
		</div>
	);
}

// function HelpLabel(props) {
// 	return (
// 		<div>
// 			{props.isVisible ? (
// 				<Form.Text id="passwordHelpBlock" muted>
// 					<span style={{ color: "#d63031", fontWeight: "500" }}>{props.message}</span>
// 				</Form.Text>
// 			) : (
// 				""
// 			)}
// 		</div>
// 	);
// }
