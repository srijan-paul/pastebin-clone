import React, { Component } from "react";

// Maps the display names of languages to their
// Ace theme names.
const LanguageList = new Map([
	["Javascript", "javascript"],
	["Lua", "lua"],
	["C", "c_cpp"],
	["C++", "c_cpp"],
	["Python", "python"],
	["Java", "java"],
	["C#", "csharp"],
	["TSX", "tsx"],
	["Scheme", "scheme"],
	["Swift", "swift"],
]);

export default function Titlebar(props) {
	return (
		<div className="titlebar">
			<Dot color="#e74c3c" />
			<Dot color="#fbc531" />
			<Dot color="#2ecc71" />

			{!props.readOnly ? (
				<div style={{ display: "inline-block", float: "right", marginRight: "4px" }}>
					<LangSelect onSelect={props.onLangChange} />
					<input type="text" id="filename-input" placeholder="filename" ref={props.fileNameRef} />
				</div>
			) : (
				<div style={{ display: "inline-block", float: "right", paddingRight: "13px"}}>{props.filename}</div>
			)}
		</div>
	);
}

class LangSelect extends Component {
	constructor(props) {
		super(props);
		this.selector = document.getElementById("lang-sel");
	}

	componentDidMount() {
		this.selectEl = document.getElementById("lang-sel");
		LanguageList.forEach((themeName, displayName) => {
			this.selectEl.options[this.selectEl.options.length] = new Option(displayName, themeName);
		});
	}

	render() {
		return (
			<select
				name="language"
				id="lang-sel"
				onChange={() => this.props.onSelect(this.selectEl.value)}
			></select>
		);
	}
}

function Dot(props) {
	return (
		<div
			className="dot"
			style={{
				backgroundColor: props.color,
				marginLeft: "10px",
			}}
		></div>
	);
}
