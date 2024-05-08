"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import pluginUtc from "dayjs/plugin/utc";
import pluginTimezone from "dayjs/plugin/timezone";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

dayjs.extend(relativeTime);
dayjs.extend(pluginUtc);
dayjs.extend(pluginTimezone);

export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: "title",
		header: "Event",
		cell: ({ row }) => {
			const title = row.getValue<string>("title");
			return (
				<Link
					href={row.original.url}
					rel="noopener noreferrer"
					target="_blank"
					className="hover:underline"
				>
					{title.substring(0, title.lastIndexOf(" "))}
				</Link>
			);
		},
	},
	{
		accessorKey: "start",
		header: "Date",
		cell: ({ row }) => {
			const { url } = row.original;
			const url_ = new URL(decodeURIComponent(url));
			const dateAndTime = url_.searchParams.get("d")!;

			const d = dayjs(dateAndTime);
			d.tz("America/New_York");

			return (
				<p>
					{d.format("YYYY-MM-DD hh:mm A")} ({d.fromNow(false)})
				</p>
			);
		},
	},
	{
		accessorKey: "action",
		header: "",
		cell: ({ row }) => {
			return (
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost" className="size-8 p-0">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<DialogTrigger>Preview</DialogTrigger>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent className="min-w-[75%] min-h-[75%]">
						<iframe
							title={row.original.title}
							src={`/event?url=${row.original.url}`}
							width="100%"
							height="100%"
						/>
					</DialogContent>
				</Dialog>
			);
		},
	},
];

export type Event = {
	title: string;
	url: string;
	start: string;
};
