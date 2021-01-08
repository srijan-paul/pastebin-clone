import React from "react";

import "./Logo.css"
import logo from "../logo.svg";


export default function Logo(props) {
	return (
		<div className="logo" style={{textAlign: "center"}}>
			<h1
				className="heading"
				style={{
					fontSize: props.fontSize,
				}}
			>
				<img
					src={logo}
					alt="logo"
					width={props.logoSize}
					height="auto"
					style={{ verticalAlign: "middle" }}
				/>
				&nbsp;CLIP IT !
			</h1>
		</div>
	);
}
