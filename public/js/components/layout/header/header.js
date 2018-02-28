import React from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";

import * as CustomizeDialogActions from "../../../actions/customizedialogactions.js"

export default class Header extends React.Component {

	openCustomizeDialog = () => {
		CustomizeDialogActions.openDialog();
	}

	render() {
		return (
			<nav id="header" class="navbar navbar-expand-sm navbar-dark bg-dark">
				<Link class="navbar-brand" to={'/'} >
					<img src="/images/Twitter_Bird.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
					Twitter Search Demo
				</Link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#header-content" aria-controls="header-content" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
			 	<div class="collapse navbar-collapse" id="header-content">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item">
							<a class="nav-link" href="#" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.openCustomizeDialog}>
								Customize
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}