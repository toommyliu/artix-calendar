"use client";

import useSWR from "swr";

const fetcher = (url: string) =>
	// TODO: proper caching
	fetch(url, { next: { revalidate: 1_000 * 60 * 60 * 24 /* 1d */ } }).then(
		(res) => res.json()
	);

export default function Home() {
	const { data, error, isLoading } = useSWR("/api/calendar", fetcher);

	if (error || data?.status === "error") return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return <div>{JSON.stringify(data)}</div>;
}
