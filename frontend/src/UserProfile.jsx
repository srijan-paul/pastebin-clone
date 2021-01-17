import React from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import UserPfp from "./assets/user-pfp-default.png";

import "./App.css";

export default function UserProfile(props) {
	const userName = props.match.params.name;
	const [userData, setUserData] = React.useState(null);

	React.useEffect(() => {
		axios.get("/api/users/" + userName).then((res) => {
			if (res.data.success) {
				setUserData(res.data.data);
			}
		});
	}, []);

	return userData ? (
		<div
			style={{
				width: "100%",
				margin: "auto",
				textAlign: "center",
			}}
		>
			<UserCard userData={userData} />
		</div>
	) : (
		<div style={{ textAlign: "center" }}>
			<img
				src="https://prostart.me/wp-content/uploads/2018/03/Loading-screen-transparent-V2.gif"
				alt="loading..."
			/>
		</div>
	);
}

function UserCard({ userData }) {
	return (
		<Card style={{ width: "100%", minHeight: "100px" }}>
			<Card.Body>
				<div>
					<div style={{ flex: "0.2", textAlign: "center", marginBottom: "20px" }}>
						<img
							src={UserPfp}
							alt="Avatar"
							width="20%"
							style={{
								borderRadius: "50%",
							}}
						/>
					</div>
					<div>
						<h3>{userData.name}</h3>
						<hr />
						<div style={{ textAlign: "left", paddingLeft: "4%" }}>
							<h5>Pastes created by {userData.name}:</h5>
							{userData.pastes.map((paste) => (
								<PostLink paste={paste} />
							))}
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}

function PostLink({ paste }) {
	return (
		<div>
			<a href={"/paste/" + paste.id}>{paste.name}</a>
		</div>
	);
}
