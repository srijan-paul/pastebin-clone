/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Logo.css"
import "./Navbar.css";

// function makeMenuItem(name, url, cname) {
// 	return {
// 		title: name,
// 		url: url,
// 		cname: cname,
// 	};
// }

// const MenuItems = [
// 	makeMenuItem("Home", "#", "nav-links"),
// 	makeMenuItem("FAQ", "#", "nav-links"),
// 	makeMenuItem("New Paste", "#", "nav-links"),
// 	makeMenuItem("Sign up", "#", "nav-links"),
// 	// makeMenuItem("Home", "#", "nav-links"),
// ];

export default class Navigation extends Component {
	render() {
		return (
			<div className="navbar">
				<h4 className="logo">CLIP IT!</h4>

				<nav>
					<ul className="nav-link">
						<li>
							<a href="#">FAQ</a>
						</li>
						<li>
							<a href="#">Log in</a>
						</li>
						<li>
							<button className="login-btn">New Paste</button>
						</li>
					</ul>
				</nav>
	
			</div>
		);
	}
}
