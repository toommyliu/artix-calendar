"use client";

import useSWR from "swr";
import dayjs from "dayjs";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";

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

	const { events } = data as { status: "ok"; events: Event[] };

	const past: Event[] = [];
	const upcoming: Event[] = [];

	events.map((ev) => {
		const date = dayjs(ev.start);

		if (date.isBefore()) {
			past.push(ev);
		}

		if (date.isAfter()) {
			upcoming.push(ev);
		}
	});

	const map = (events: Event[]) => {
		return events.map((ev, idx) => {
			return (
				<ul key={idx}>
					<Link
						href={ev.url}
						rel="noopener noreferrer"
						target="_blank"
					>
						{/* remove date from title*/}
						{ev.title.substring(0, ev.title.lastIndexOf(" "))}
					</Link>
					<li>date: {dayjs(ev.start).toString()}</li>
				</ul>
			);
		});
	};

	// TODO: use Data Table ?
	return (
		<div className="container flex mt-10">
			<div className="flex-1 pr-4">
				<h2 className="text-xl font-bold mb-4">Upcoming</h2>
				<ScrollArea className="max-h-[512px] overflow-y-auto rounded-md border">
					<div id="events-upcoming">{map(upcoming)}</div>
				</ScrollArea>
			</div>
			<div className="flex-1 pl-4">
				<h2 className="text-xl font-bold mb-4">Previous</h2>
				<ScrollArea className="max-h-[512px] overflow-y-auto rounded-md border">
					<div id="events-past">{map(past)}</div>
				</ScrollArea>
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
