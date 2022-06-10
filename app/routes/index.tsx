import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import globalStyle from "../../styles/globals.css"
import homeStyle from '../../styles/Home.css'
import dayjs from 'dayjs'

export function links() {
  return [{ rel: "stylesheet", href: globalStyle }, { rel: "stylesheet", href: homeStyle }];
}
export const loader: LoaderFunction = async ({request}) => {
	const url = new URL(request.url)
  const apiPath = `${url.protocol}//${url.host}/api`
  const data = await fetch(`${apiPath}/bff`)
  const profile = await data.json()

  return json({profile})
}

export default function Index() {
  const { profile } = useLoaderData()
  const fetcher = useFetcher()
  
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">{profile.name}</h1>
          <p className="description">
            <strong>Birthdate:</strong> {profile.birthdate}
          </p>
          <p className="description">
            <strong>Address:</strong> {profile.address}
          </p>
          <p className="description">
            <strong>Joined:</strong> {dayjs(profile.joined).format('YYYY-MM-DD')}
          </p>
          <p className="description">
            <strong>Last Seen (Last Recieved Message):</strong> {dayjs(profile.last_seen).format('YYYY-MM-DD')}
          </p>
          <p className="description">
            <strong>New Notifications:</strong> {profile.new_notifications}
          </p>
          <p className="description">
            <strong>New Messages:</strong> {profile.new_messages}
          </p>
          <p className="description">
            <strong>New Friend Requests:</strong> {profile.new_friend_requests}
          </p>
        <div className="buttons">
            <fetcher.Form action="/api/bff">
              <button  className="button" type="submit">
                View BFF Response
              </button>
            </fetcher.Form>
            <fetcher.Form action="/api/user">
              <button  className="button" type="submit">
                View User Response
              </button>
            </fetcher.Form>
            <fetcher.Form action="/api/messages?action=read&read=false">
              <button  className="button" type="submit">
                View Messages Service Response
              </button>
              </fetcher.Form>
            <fetcher.Form action="/api/notifications?action=seen&seen=false">
              <button  className="button" type="submit">
                View Notifications Service Response
              </button>
            </fetcher.Form>
            <fetcher.Form action="/api/friend_requests">
              <button  className="button" type="submit">
                View Friends Service Response
              </button>
            </fetcher.Form>
          </div>
          {fetcher.type !== 'init' && (
					<div className="grid">
						<div className="card">
							<h2>Response &darr;</h2>
							<pre className="pre">
								<code className="code">{fetcher.state === 'submitting' ? 'loading...' : JSON.stringify(fetcher.data, null, 4)}</code>
							</pre>
						</div>
					</div>
				)}
      </main>
      <footer className="footer">
				<a href="https://twitter.com/remix_run" target="_blank" rel="noopener noreferrer">
					@remix_run
				</a>
			</footer>
    </div>
  );
}
