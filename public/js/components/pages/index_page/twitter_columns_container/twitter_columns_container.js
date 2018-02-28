import React from "react";
import ReactDom from "react-dom";

import TwitterColumn from './twitter_column/twitter_column.js'

import TwitterStore from '../../../../stores/twitterstore.js'
import * as TwitterActions from '../../../../actions/twitteractions.js'

import _ from 'underscore'

export default class TwitterColumnsContainer extends React.Component {

	componentWillMount() {
		TwitterStore.on('changedColumnsOrder', this._forceUpdate)
	}

	componentDidMount() {
		window.$('#twitter-column-container').sortable({
			handle: '.card-header',
			connectWith: ".column",
			start: function(e, ui){
				ui.placeholder.height(ui.item.height());
			},
			update: function (e, ui) {
				let sortList = []

				window.$('#twitter-column-container > .twitter-column').each(function () {
					sortList.push(window.$(this).attr('screen-name'));
				})

				TwitterActions.changeColumnsOrder(sortList);
			}
		});
	}

	componentWillUnmount() {
		TwitterStore.removeListener('changedColumnsOrder', this._forceUpdate)
	}

	_forceUpdate = () => {
		this.forceUpdate();
	}

	render() {
		const columns = _.map(TwitterStore.customization.columnsOrder, function (username) {
			return <TwitterColumn key={username} screenName={username} />
		});

		return (
			<div class="container-fluid">
				<div id="twitter-column-container" class="row">
					{columns}
				</div>
			</div>
		)
	}
}