import React from "react";
import ReactDom from "react-dom";

export default class Footer extends React.Component {
	render() {
		return (
			<footer id="footer" class="py-5 bg-dark">
				<div class="container">
					<p class="m-0 text-center text-white">
						Copyright © Twitter Search Demo 2018
					</p>
				</div>
			</footer>
		);
	}
}