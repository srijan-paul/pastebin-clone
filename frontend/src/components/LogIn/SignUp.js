import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

// const passwordPattern = /\d+/;

export default function SignUp() {
	const nameRef = useRef();
	const pwRef = useRef();
	const pwconfRef = useRef();

	const onFormSubmit = () => {
		const password = pwRef.current.value;
		const username = nameRef.current.value;

		axios.post("/register", {
			username,
			password,
		}).then((res) => {
			console.log(res);
		});
	};

	return (
		<Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
			<div style={{ maxWidth: "400px", minWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4"> Sign Up </h2>
						<Form>
							<Form.Group id="username">
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" ref={nameRef} required />
								<Form.Control.Feedback type="invalid">You did it!</Form.Control.Feedback>
							</Form.Group>

							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={pwRef} required />
							</Form.Group>

							<Form.Group id="passwod-confirm">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control type="password" ref={pwconfRef} required />
							</Form.Group>

							<Button className="w-100 text-center mt-2" id="signUpBtn"  onClick={onFormSubmit}>
								Sign Up
							</Button>
						</Form>

						<div className="w-100 text-center mt-2">Already have an account? Log in.</div>
					</Card.Body>
				</Card>
			</div>
		</Container>
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
