
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import data from '../../../data/messages.json'

export const loader: LoaderFunction = ({ request }) => {
	const url = new URL(request.url)
	const read = url.searchParams.get("read")
	const action = url.searchParams.get("action")

	

    if (action === 'read') {
        const boolean_read = read === 'true' // because it's query params, so it's string
		const read_messages = data.filter(item => item.read === boolean_read)
        return json(read_messages)
    } else if (action === 'get_latest') {
		const latest = data.reduce(function (prev, current) {
			return parseInt(prev.created_at) > parseInt(current.created_at) ? prev : current
		})
		return json(latest)
	} else {
		return json([])
	}

}
