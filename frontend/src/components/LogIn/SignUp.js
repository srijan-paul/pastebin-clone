import React, { Component, useRef } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

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

	const minNameLength = 6;
	const maxNameLength = 14;

	let [isPwValid, setPwValid] = React.useState(true);
	let [isConfirmPwValid, setConfirmPwValid] = React.useState(true);
	let [isNameValid, setNameValid] = React.useState(true);

	function validateName() {
		const name = nameRef.current.value;
		if (name.length === 0) return true;
		setNameValid(name.length >= minNameLength && name.length <= maxNameLength);
	}

	const [pwMinLength, pwMaxLength] = [8, 20];
	function validatePassword() {
		const pwRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{8,21}$/;
		const pw = pwRef.current.value;
		setPwValid(pwRegex.test(pw));
	}

	function validateConfirmedPassword() {
		const confPw = pwconfRef.current.value;
		const pw = pwRef.current.value;
		setConfirmPwValid(confPw === pw && pw.length > 0);
	}

	const [isFormValid, setFormValid] = React.useState(true);

	function validateForm() {
		validateName();
		validatePassword();
		validateConfirmedPassword();
		setFormValid(
			isNameValid &&
				isPwValid &&
				isConfirmPwValid &&
				nameRef.current.value.length > 0 &&
				pwRef.current.value.length > 0
		);
	}

	const [formSubmitted, setFormSubmitted] = React.useState(false);

	function onFormSubmit() {
		if (formSubmitted) return;
		validateForm();
		if (!isFormValid) return;
		const password = pwRef.current.value;
		const username = nameRef.current.value;

		setFormSubmitted(true);
		axios
			.post("/api/register", {
				username,
				password,
			})
			.then((res) => {
				console.log("signed in successfully.");
			});
	}

	return (
		<Panel>
			<h2 className="text-center mb-4"> Sign Up </h2>
			<Form>
				<Form.Group id="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" ref={nameRef} onChange={validateName} required />
					<HelpLabel isVisible={!isNameValid}>
						Username must be between {minNameLength}-{maxNameLength} characters. Only alphanumerics
						and '_' , '-' allowed.`
					</HelpLabel>
				</Form.Group>

				<Form.Group id="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" ref={pwRef} onChange={validatePassword} required />
					<HelpLabel isVisible={!isPwValid}>
						Must have {pwMinLength} - {pwMaxLength} eight characters, at least one upper and lower
						case English letter, one number and one special character.
					</HelpLabel>
				</Form.Group>

				<Form.Group id="passwod-confirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						ref={pwconfRef}
						onChange={validateConfirmedPassword}
						required
					/>
					<HelpLabel isVisible={!isConfirmPwValid}>Passwords do not match.</HelpLabel>
				</Form.Group>

				<HelpLabel isVisible={!isFormValid}>Fields cannot be empty.</HelpLabel>
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

		axios
			.post("/api/login", req)
			.then((res) => {
				if (res.data.success) {
					props.updateUser({
						name: username,
						isGuest: false,
					});
					sessionStorage.setItem("username", username);
					sessionStorage.setItem("sessionId", res.data.sessionId);
				}
			})
			.catch((e) => {
				console.log("login failed: " + e.message);
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

function HelpLabel(props) {
	return (
		<div>
			{props.isVisible ? (
				<Form.Text id="passwordHelpBlock" muted>
					<span style={{ color: "#d63031", fontWeight: "500" }}>{props.children}</span>
				</Form.Text>
			) : (
				""
			)}
		</div>
	);
}
