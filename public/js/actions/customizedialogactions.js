import dispatcher from '../dispatcher/dispatcher.js'
import axios from 'axios'


export function openDialog() {
	dispatcher.dispatch({type: 'OPEN_CUSTOMIZE_DIALOG'})
}