import React, { Component } from "react";

import axios from "axios";
import AceEditor from "react-ace";

import "./App.css";

import Titlebar from "./components/Titlebar/Titlebar";

export default class ViewPaste extends Component {
	constructor(props) {
		super(props);
		this.pasteId = props.match.params.pasteId;
		this.state = {
			paste: null,
		};
	}

	componentDidMount() {
		axios.get(`/api/pastes/${this.pasteId}`).then((res) => {
			if (res.data.success) {
				this.setState({ paste: res.data.paste });
			} else {
			}
		});
	}

	render() {
		return this.state.paste ? (
			<Paste pasteData={this.state.paste} />
		) : (
			<div
				style={{
					width: "100%",
					margin: "auto",
					textAlign: "center"
				}}
			>
				<img
					src="https://prostart.me/wp-content/uploads/2018/03/Loading-screen-transparent-V2.gif"
					alt="loading..."
				/>
			</div>
		);
	}
}

function Paste({ pasteData }) {
	return (
		<div className="editor">
			<Titlebar readOnly={true} filename={pasteData.filename} />
			<AceEditor
				mode={pasteData.language}
				theme="textmate"
				name="editor-view"
				fontSize={16}
				width="100%"
				height="500px"
				fontFamily="monospace"
				readOnly={true}
				value={pasteData.content}
			/>
		</div>
	);
}
