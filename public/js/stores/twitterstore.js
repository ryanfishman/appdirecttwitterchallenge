import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher.js'
import {reactLocalStorage} from 'reactjs-localstorage';

import _ from 'underscore'

class TwitterStore extends EventEmitter {
	constructor() {
		super()

		this.customization = {
			columnsOrder: ['AppDirect', 'LaughingSquid', 'TechCrunch'],
			timeRange: {
				start: window.moment(new Date()).add(-1, 'M').format('YYYY-MM-DD'),
				end: window.moment(new Date()).format('YYYY-MM-DD')
			},
			numberOfTweets: 30,
			backgroundColor: '#FFF'
		}

		const temp_customization = reactLocalStorage.getObject('customization');
		if (!temp_customization || _.isEmpty(temp_customization)) {
			reactLocalStorage.setObject('customization', this.customization);
		} else {
			this.customization = temp_customization;
		}

		window.$('body').css('backgroundColor', this.customization.backgroundColor);

		this.twitterFeed = null;
		this.screenName =  null;

		this.twitterFeedStatus = 'idle';
		this.twitterFeedError = '';
	}
	
	handleActions(action) {
		switch(action.type) {
			//fetch twitter feed
			case "FETCHING_TWITTER_FEED": {
				this.screenName = action.screenName;
				this.twitterFeedStatus = 'fetching'
				this.emit('changedTwitterFeedStatus');
				break;
			}
			case "FETCHED_TWITTER_FEED": {
				let timeRange = this.customization.timeRange;

				// Should we really be filtering date like this?
				// this.twitterFeed = _.filter(action.data, function (feedItem) {
				// 	return window.moment(feedItem.created_at).isBetween(timeRange.start, timeRange.end); 
				// });

				this.twitterFeed = action.data;
				this.screenName = action.screenName;

				this.twitterFeedStatus = 'fetched'
				this.emit('changedTwitterFeedStatus');
				this.twitterFeedStatus = 'idle'
				this.emit('changedTwitterFeedStatus');
				break;
			}
			case "ERROR_FETCHING_TWITTER_FEED": {
				this.screenName = action.screenName;
				this.twitterFeedError = action.data;
				this.twitterFeedStatus = 'error'
				this.emit('changedTwitterFeedStatus');
				this.twitterFeedStatus = 'idle'
				this.emit('changedTwitterFeedStatus');
				break;
			}

			//changed columns order
			case "CHANGED_COLUMNS_ORDER": {
				this.customization.columnsOrder = action.columnsOrder;
				reactLocalStorage.setObject('customization', this.customization);
				this.emit('changedColumnsOrder');
				break;
			}

			//changed customization
			case "CHANGED_CUSTOMIZATION": {
				this.customization = action.customization;
				reactLocalStorage.setObject('customization', this.customization);	
				window.$('body').css('backgroundColor', this.customization.backgroundColor);
				this.emit('changedColumnsOrder');
				this.emit('changedCustomization');
				break;
			}
		}
	}
}

const twitterStore = new TwitterStore();
dispatcher.register(twitterStore.handleActions.bind(twitterStore));

export default twitterStore;