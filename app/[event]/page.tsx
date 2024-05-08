"use client";

import ThemeToggle from "@/components/theme-toggle";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Center } from "@/components/center";

export default function Page() {
	const searchParams = useSearchParams();
	const url = searchParams.get("url");

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ["calendar", url],
		queryFn: async () => {
			return fetch(`/api/calendar/event?url=${url}`).then((res) =>
				res.json()
			) as Promise<EventPageJson>;
		},
		enabled: false,
	});

	useEffect(() => {
		async function load() {
			if (url) {
				await refetch();
			}
		}

		if (data) {
			console.log(data);
		}

		load();
	}, [url, refetch, data]);

	if (!url) {
		return notFound();
	}

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

	if (error) {
		return (
			<Center>
				<div className="flex flex-col text-center">
					An error occured while trying to fetch the event page.
				</div>
			</Center>
		);
	}

	return (
		<>
			<div className="flex flex-col items-end mx-8 my-4">
				<ThemeToggle />
			</div>
			<Center>
				<div className="flex flex-col min-h-screen justify-center items-center">
					<div className="min-w-1/3 min-h-1/3 rounded-md py-4">
						<NextImage
							src={data!.img_url}
							alt={data!.title}
							width={0}
							height={0}
							sizes="40vw"
							style={{ width: "100%" }}
						/>
					</div>
					<p className="font-bold text-2xl">{data!.title}</p>
					<div className="container overflow-auto">
						<pre className="text-lg whitespace-pre-line text-center">
							{data!.body}
						</pre>
					</div>
				</div>
			</Center>
		</>
	);
}

type EventPageJson = {
	title: string;
	body: string;
	img_url: string;
	source: string;
};
