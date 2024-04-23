"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
			const date = row.getValue<string>("start");
			return (
				<p>
					{date} ({dayjs(date).fromNow()})
				</p>
			);
		},
	},
	// {
	// 	accessorKey: "action",
	// 	header: "",
	// 	cell: ({ row }) => {
	// 		return (
	// 			<DropdownMenu>
	// 				<DropdownMenuTrigger asChild>
	// 					<Button variant="ghost" className="h-8 w-8 p-0">
	// 						<span className="sr-only">Open menu</span>
	// 						<MoreHorizontal className="h-4 w-4" />
	// 					</Button>
	// 				</DropdownMenuTrigger>
	// 				<DropdownMenuContent align="end">
	// 					<DropdownMenuLabel>Actions</DropdownMenuLabel>
	// 					<DropdownMenuItem
	// 						onClick={() =>
	// 							window.open(
	// 								row.original.url,
	// 								undefined,
	// 								"noopener noreferrer"
	// 							)
	// 						}
	// 					>
	// 						Open in new tab
	// 					</DropdownMenuItem>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		);
	// 	},
	// },
];

export type Event = {
	title: string;
	url: string;
	start: string;
};
