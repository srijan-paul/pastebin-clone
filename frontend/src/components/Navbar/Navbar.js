/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";

import "../Logo.css";
import "./Navbar.css";

import { Link, useHistory } from "react-router-dom";
import UserContext from "../LogIn/AuthContext";

import PlusIcon from "../../assets/new-paste.svg";
import GuestIcon from "../../assets/guest.svg";
import MemberIcon from "../../assets/member.svg";

export default function Navigation() {
	const user = useContext(UserContext);
	const history = useHistory();

	return (
		<div className="nav-bar">
			<Link to="/home" style={{ textDecoration: "none", paddingTop: "20px" }}>
				<h3 className="logo">CLIP IT</h3>
			</Link>
			<nav>
				<div className="nav-items">
					<NavItem>
						{user.isGuest ? (
							<a className="nv-link" href="/login">
								Sign In
							</a>
						) : (
							<UserInfo user={user} />
						)}
					</NavItem>
					<NavBtn
						icon={user.isGuest ? GuestIcon : MemberIcon}
						onClick={
							!user.isGuest
								? () => {
										history.push("/user/" + user.name);
								  }
								: null
						}
					/>
					<NavBtn icon={PlusIcon} to="/home" />
				</div>
			</nav>
		</div>
	);
}

function NavBtn(props) {
	return (
		<div className="nav-item" onClick={props.onClick}>
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
	return (
		<a className="nv-link" href={"/user/" + user.name}>
			{user.name}
		</a>
	);
}
