import React from "react";
import ReactDom from "react-dom";

import Header from "./header/header.js"
import Footer from "./footer/footer.js"

import CustomizeDialog from '../dialogs/customize_dialog.js'

import Main from "../main/main.js"

export default class Layout extends React.Component {
	render() {
		return (
			<div id="wrap">
				<div id="wrap-main">
					<Header />
					<Main />
				</div>
				<Footer/>
				<CustomizeDialog />
			</div>
		);
	}
}