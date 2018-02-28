import React from "react";
import ReactDom from "react-dom";

import TwitterColumnsContainer from './twitter_columns_container/twitter_columns_container.js'

export default class IndexPage extends React.Component {
	render() {
		return <div>
			<TwitterColumnsContainer />
		</div>
	}
}