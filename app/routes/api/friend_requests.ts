
import { json } from '@remix-run/node'
import data from '../../../data/friend_requests.json'

export function loader() {
	return json(data)
}
