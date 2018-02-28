import React from "react";
import ReactDom from "react-dom";

import TwitterStore from '../../stores/twitterstore.js'
import * as TwitterActions from '../../actions/twitteractions.js'

import CustomizeDialogStore from '../../stores/customizedialogstore.js'
import { SketchPicker } from 'react-color';

import _ from "underscore"

export default class ConfirmDialog extends React.Component {
	constructor() {
		super()

		this.state = {
			backgroundColor: TwitterStore.customization.backgroundColor,
			numberOfTweets: TwitterStore.customization.numberOfTweets
		}
	}

	componentWillMount() {
		CustomizeDialogStore.on('openDialog', this.showDialog);
	}

	initializeCustomizeTimerange = () => {
		window.$('#customize-timerange').daterangepicker({
			locale: {
				format: 'YYYY-MM-DD'
			},
			startDate: TwitterStore.customization.timeRange.start,
			endDate: TwitterStore.customization.timeRange.end
		});
	}

	componentDidMount() {
		window.$('#customize_columns').sortable({
			connectWith: ".list-group-item",
			start: function(e, ui){
				ui.placeholder.height(ui.item.height());
			}
		});

		this.refs.form.addEventListener('submit', (event) => {
			if (this.refs.form.checkValidity() !== false) {
				this.Save();
			}
			this.refs.form.classList.add('was-validated');
			event.preventDefault();
			event.stopPropagation();
		})

		this._showDialogHelper(false);
	}

	componentWillUnmount() {
		CustomizeDialogStore.removeListener('openDialog', this.showDialog);
	}

	showDialog = () => {
		this.refs.form.classList.remove('was-validated');
		this.initializeCustomizeTimerange();
		this._showDialogHelper(true);
		this.setState({
			backgroundColor: TwitterStore.customization.backgroundColor,
			numberOfTweets: TwitterStore.customization.numberOfTweets
		})
		this.forceUpdate();
	}

	_showDialogHelper = (show) => {
		window.$(this.refs.modal).modal({
			backdrop: 'static',
			show: show
		});
	}

	Save = () => {
		let columnsOrder = []
		let $timeRange = window.$('#customize-timerange');

		window.$('#customize_columns > .list-group-item').each(function () {
			columnsOrder.push(window.$(this).attr('screen-name'));
		})

		TwitterActions.changeCustomization({
			columnsOrder: columnsOrder,
			timeRange: {
				start: moment($timeRange.data('daterangepicker').startDate).format('YYYY-MM-DD'),
				end: moment($timeRange.data('daterangepicker').endDate).format('YYYY-MM-DD')
			},
			numberOfTweets: this.refs.numberOfTweets.value,
			backgroundColor: this.state.backgroundColor
		})

		window.$(this.refs.modal).modal('hide');
	}

	Cancel = () => {
		window.$(this.refs.modal).modal('hide');
	}

	onNumberOfTweetsChanged = (e) => {
		this.setState({
			numberOfTweets: e.target.value
		})
	}

	handleColorChange = (color, event) => {
		this.state.backgroundColor = color.hex;
	}


	render() {
		const columns = _.map(TwitterStore.customization.columnsOrder, function (username) {
			return <li key={username} screen-name={username} class="list-group-item">{username}</li>
		});

		return (
			<div id="customizemodal" class="modal fade" tabIndex="-1" role="dialog" ref="modal" aria-hidden="true">
				<form id="customizeform" class="needs-validation" noValidate={true} ref="form">
			 		<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Customize</h5>
								<button type="button" class="close" onClick={this.Cancel}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body ml-3 mr-3">
								<div class="form-group row">
									<label><b>Column Order: </b></label>
									<div class="w-100">
										<ul id="customize_columns" class="list-group">
											{columns}
										</ul>
									</div>
								</div>
								<div class="form-group row">
									<label><b>Time Range: </b></label>
									<input type="text" id="customize-timerange" class="form-control" />
								</div>
								<div class="form-group row">
									<label><b>Number Of Tweets: </b></label>
									<input ref="numberOfTweets" type="number" value={this.state.numberOfTweets} class="form-control" id="number-of-tweets" required={true} min="1" step="1" onChange={this.onNumberOfTweetsChanged}/>
									<div class="invalid-feedback">
										Please enter a positive integer larger than 1.
									</div>
								</div>
								<div class="form-group row">
									<label><b>Background Color: </b></label>
									<div class="w-100">
										<SketchPicker color={this.state.backgroundColor} onChangeComplete={ this.handleColorChange } />
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="submit" class="btn btn-primary">Save</button>
								<button type="button" class="btn btn-default" onClick={this.Cancel}>Cancel</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}