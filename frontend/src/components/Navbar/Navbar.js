/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";

import "../Logo.css";
import "./Navbar.css";

import { Link } from "react-router-dom";
import { UserContext } from "../LogIn/AuthContext";

import PlusIcon from "../../assets/new-paste.svg";
import GuestIcon from "../../assets/guest.svg";

export default function Navigation() {
	const user = useContext(UserContext);

	return (
		<div className="nav-bar">
			<Link to="/home" style={{ textDecoration: "none", paddingTop: "20px" }}>
				<h3 className="logo">CLIP IT</h3>
			</Link>
			<nav>
				<div className="nav-items">
					<NavItem>
						{user.isGuest ? <a href="/login">Sign In</a> : <UserInfo user={user} />}
					</NavItem>
					<NavBtn icon={GuestIcon} />
					<NavBtn icon={PlusIcon} to="/home" />
				</div>
			</nav>
		</div>
	);
}

function NavBtn(props) {
	return (
		<div className="nav-item">
			<Link className="nav-button" to={props.to}>
				<img src={props.icon} alt="icon" width="30px" />
			</Link>
		</div>
	);
}

function NavItem({ children }) {
	return <div className="nav-item">{children}</div>;
}

function UserInfo({ user }) {
	return <div className="userinfo-wrapper">{user.name}</div>;
}
