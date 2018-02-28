import dispatcher from '../dispatcher/dispatcher.js'
import axios from 'axios'


export function getTwitterFeed(screenName, count=30) {
	dispatcher.dispatch({type: 'FETCHING_TWITTER_FEED', screenName: screenName})

	axios.get(`/api/twitter/1.1/statuses/user_timeline.json?count=${count}&screen_name=${encodeURI(screenName)}`)
		.then(res => {
			dispatcher.dispatch({type: 'FETCHED_TWITTER_FEED', screenName: screenName, data: res.data})
		})
		.catch(function (error) {
			dispatcher.dispatch({type: 'ERROR_FETCHING_TWITTER_FEED', screenName: screenName, data: error.response.data})
		});	
}

export function changeColumnsOrder(columnsOrder) {
	dispatcher.dispatch({type: 'CHANGED_COLUMNS_ORDER', columnsOrder: columnsOrder})
}

export function changeCustomization(customization) {
	dispatcher.dispatch({
		type: 'CHANGED_CUSTOMIZATION',
		customization: customization
	});
}