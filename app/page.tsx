"use client";

import useSWR from "swr";
import dayjs from "dayjs";

import { columns, type Event } from "@/components/columns";
import { DataTable } from "@/components/data-table";

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

	return (
		<div className="container flex mt-10 space-x-4">
			<div className="flex-1 pr-4 border-2 space-x-2 rounded-lg">
				<h2 className="text-xl font-bold ml-4 mt-4">Upcoming</h2>
				<DataTable columns={columns} data={upcoming} />
			</div>
			<div className="flex-1 pr-4 border-2 space-x-2 rounded-lg">
				<h2 className="text-xl font-bold ml-4 mt-4">Past</h2>
				<DataTable columns={columns} data={past.reverse()} />
			</div>
		</div>
	);
}

type JSONResponse =
	| { status: "error"; reason: "no html" }
	| { status: "error"; reason: "no calendar script" }
	| { status: "ok"; events: Event[] };
