"use client";

import useSWR from "swr";

const fetcher = (url: string): Promise<JSONResponse> =>
	fetch(url, { next: { revalidate: 1_000 * 60 * 60 * 24 /* 1d */ } }).then(
		(res) => res.json()
	);

export default function Home() {
	const { data, error, isLoading } = useSWR<JSONResponse>(
		"/api/calendar",
		fetcher
	);

	if (error || data?.status === "error")
		return (
			<div>
				an error occured while trying to fetch the latest calendar data.
				{/* @ts-expect-error */}
				reason: {data?.error}
			</div>
		);
	if (isLoading) return <div>loading...</div>;

	const { status, events } = data as { status: "ok"; events: Event[] };

	return (
		<div>
			status: {status}
			<div id="events">
				{events.map((ev, idx) => (
					<ul key={idx}>
						<li>{ev.title}</li>
						<li>date: {ev.start}</li>
					</ul>
				))}
			</div>
		</div>
	);
}

type JSONResponse =
	| { status: "error"; reason: "no html" }
	| { status: "error"; reason: "no calendar script" }
	| { status: "ok"; events: Event[] };

type Event = {
	title: string;
	url: string;
	start: string;
};
