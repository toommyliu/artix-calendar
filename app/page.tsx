"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { columns, type Event } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import ThemeToggle from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/footer";
import type { ReactNode } from "react";

const Center = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-row min-h-screen justify-center items-center">
		{children}
	</div>
);

export default function Home() {
	const { data, error, isLoading } = useQuery<JSONResponse>({
		queryKey: ["calendar"],
		queryFn: async () => {
			return fetch("/api/calendar", {
				next: { revalidate: 1_000 * 60 * 60 * 24 /* 1 day */ },
			}).then((res) => res.json());
		},
	});

	if (isLoading) {
		return (
			<Center>
				<div className="flex flex-col items-center justify-center px-4 py-4 space-y-4">
					<div
						className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
						role="status"
						aria-label="loading"
					/>
					<span>Loading...</span>
				</div>
			</Center>
		);
	}

	if (error || data?.status === "error") {
		const data_ = data as Exclude<JSONResponse, { status: "ok" }>;
		return (
			<Center>
				<div className="flex flex-col text-center">
					An error occured while trying to fetch the calendar data.
					<br />
					Reason:{" "}
					{data_.reason === "no html"
						? "failed to get events data"
						: data_.reason === "no calendar script"
						? "Failed to find events data"
						: "unknown"}
				</div>
			</Center>
		);
	}

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
		<>
			<div className="flex flex-col items-end px-8 py-4">
				<ThemeToggle />
			</div>
			<div className="container flex flex-col px-4 py-4 space-y-4 mt-4">
				<Tabs defaultValue="upcoming">
					<TabsList>
						<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
						<TabsTrigger value="past">Past</TabsTrigger>
					</TabsList>
					<TabsContent value="upcoming">
						<DataTable
							columns={columns}
							data={upcoming}
							key="events-upcoming"
						/>
					</TabsContent>
					<TabsContent value="past">
						<DataTable
							columns={columns}
							data={past.reverse()}
							key="events-past"
						/>
					</TabsContent>
				</Tabs>
			</div>
			<Footer />
		</>
	);
}

type JSONResponse =
	| { status: "error"; reason: "no html" }
	| { status: "error"; reason: "no calendar script" }
	| { status: "ok"; events: Event[] };
