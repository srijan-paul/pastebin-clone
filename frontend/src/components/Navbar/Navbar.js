/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../Logo.css";
import "./Navbar.css";

import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

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
			<div className="nav-bar">
				<Link to="/home" style={{textDecoration: "none"}}>
					<h4 className="logo">CLIP IT</h4>
				</Link>
				<nav>
					<ul className="nav-link">
						<li>
							<a href="#">FAQ</a>
						</li>
						<li>
							<a href="/login">Sign In</a>
						</li>
						<li>
							<button className="login-btn">
								<Link to="/login">New Paste</Link>
							</button>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}
