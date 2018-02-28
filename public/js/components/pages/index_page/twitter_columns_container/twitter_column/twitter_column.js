import React from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';

import TwitterStore from '../../../../../stores/twitterstore.js'
import * as TwitterActions from '../../../../../actions/twitteractions.js'

import _ from "underscore"
import Linkify from 'react-linkify'

export default class TwitterColumn extends React.Component {
	static propTypes = {
		screenName: PropTypes.string.isRequired
	}

	constructor() {
		super();

		this.state = {
			status: "fetching",
			feed: null

		}
	}

	componentWillMount() {
		TwitterStore.on('changedTwitterFeedStatus', this.changedTwitterFeedStatus);
		TwitterStore.on('changedCustomization', this.changedCustomization);


		TwitterActions.getTwitterFeed(this.props.screenName, TwitterStore.customization.numberOfTweets);
	}

	componentWillUnmount() {
		TwitterStore.removeListener('changedTwitterFeedStatus', this.changedTwitterFeedStatus);		
		TwitterStore.removeListener('changedCustomization', this.changedCustomization);
	}

	changedTwitterFeedStatus = () => {
		if (TwitterStore.screenName === this.props.screenName) {
			if (TwitterStore.twitterFeedStatus === 'fetching') {
				this.setState({
					status: 'fetching',
					feed: null
				});
			} else if (TwitterStore.twitterFeedStatus === 'fetched') {
				this.setState({
					status: 'fetched',
					feed: TwitterStore.twitterFeed
				});
			} else if (TwitterStore.twitterFeedStatus === 'error') {
				this.setState({
					status: 'error',
					feed: null
				});
			}
		}
	}

	changedCustomization = () => {
		setTimeout(() => {
			TwitterActions.getTwitterFeed(this.props.screenName, TwitterStore.customization.numberOfTweets);
		}, 0);
	}

	render() {
		let body = <span>"fetching....."</span>;

		if (this.state.status === 'fetched') {
			body = _.map(this.state.feed, function (feedItem, i) {
				const userLink = feedItem.retweeted_status ? <a target="_blank" href={`https://twitter.com/${feedItem.retweeted_status.user.screen_name}`}>{feedItem.retweeted_status.user.screen_name}</a> : null;
				return (
					<li key={i} class="list-group-item">
						<div>
							<a target="_blank" class="pull-right" href={`https://twitter.com/${feedItem.user.screen_name}/status/${feedItem.id_str}`}><i class="fa fa-link"></i></a>
							{userLink}
						</div>
						<div>
							<b><Linkify>{feedItem.text}</Linkify></b>
						</div>
						<div class="text-right">
							<em>{window.moment(feedItem.created_at).fromNow()}</em>
						</div>
					</li>
				)
			});

			body = <ul class="list-group">{body}</ul>
		} else if (this.status === 'error') {
			body = <span>"fetching....."</span>;
		}


		return (
			<div class="twitter-column col-md-4 mb-3" screen-name={this.props.screenName}>
				<div class="card card-form">
					<div class="card-header">
						<h2><a target="_blank" href={`https://twitter.com/${this.props.screenName}`}>{'@' + this.props.screenName}</a></h2>
					</div>
					<div class="card-body">
						{body}
					</div>
				</div>
			</div>
		);
	}
}