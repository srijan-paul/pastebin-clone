/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import "../../App.css";
import "./LogIn.css";


export default class Login extends Component {
	render() {
		return (
			<div className="login-container">
				<Form />
			</div>
		);
	}
}

export class Form extends Component {
	render() {
		return (
			<div class="wrapper" style={{backgroundColor : "#ffffff"}}>
				<form class="login">
					<p class="title">Log in</p>
					<input type="text" placeholder="Username" autofocus />
					<i class="fa fa-user"></i>
					<input type="password" placeholder="Password" />
					<i class="fa fa-key"></i>
					<a href="#">Forgot your password?</a>
					<button>
						<i class="spinner"></i>
						<span class="state">Log in</span>
					</button>
				</form>
				<footer>
					<a target="blank" href="http://boudra.me/">
						boudra.me
					</a>
				</footer>
			</div>
		);
	}
}
