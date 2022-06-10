import { json } from '@remix-run/node'
import data from '../../../data/user.json'

export function loader() {
  return json(data)
}
