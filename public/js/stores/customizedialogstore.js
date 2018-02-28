import { EventEmitter } from "events";
import dispatcher from '../dispatcher/dispatcher.js'

class CustomizeDialogStore extends EventEmitter {
	constructor() {
		super()
	}
	
	handleActions(action) {
		switch(action.type) {
			//open customize dialog
			case "OPEN_CUSTOMIZE_DIALOG": {
				this.emit('openDialog');
				break;
			}
		}
	}
}

const customizeDialogStore = new CustomizeDialogStore();
dispatcher.register(customizeDialogStore.handleActions.bind(customizeDialogStore));

export default customizeDialogStore;