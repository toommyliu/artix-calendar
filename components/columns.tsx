"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
					className="hover:text-blue-500"
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

			const date_ = dayjs(date);

			return (
				<p>
					{date} ({date_.fromNow()})
				</p>
			);
		},
	},
	{
		accessorKey: "action",
		header: "",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								window.open(
									row.original.url,
									undefined,
									"noopener noreferrer"
								)
							}
						>
							Open in new tab
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export type Event = {
	title: string;
	url: string;
	start: string;
};
