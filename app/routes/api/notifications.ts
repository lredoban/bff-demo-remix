import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import data from '../../../data/notifications.json'

export const loader: LoaderFunction = ({request}) => {
	const url = new URL(request.url);
	const seen = url.searchParams.get("seen");
	const action = url.searchParams.get("action");

	if (action === 'seen') {
		const boolean_seen = seen === 'true' // because it's query params, so it's string
		const seen_messages = data.filter((item) => Boolean(item.seen) === boolean_seen)
		return json(seen_messages)
	} else if (action === 'get_latest') {
		const latest = data.reduce(function (prev, current) {
			return parseInt(prev.created_at) > parseInt(current.created_at) ? prev : current
		})
		return json(latest)
	} else {
		return json([])
	}
}
