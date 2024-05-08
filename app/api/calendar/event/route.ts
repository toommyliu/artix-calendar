"use server";

import { parse } from "node-html-parser";

export async function GET(request: Request) {
	const url = new URL(request.url).searchParams.get("url");
	if (!url) {
		return Response.json({ status: "error", message: "no url provided" });
	}

	try {
		const response = await fetch(url);
		const html = await response.text();

		const document = parse(html);

		const title = document.querySelector(
			"body > div.container.newsPost.full > div > div > h1"
		)!.rawText;

		const img_url =
			document.querySelector("#__mcenew")?.rawAttributes["src"];

		const container = document.querySelector(
			"body > div.container.newsPost.full > div > div"
		);

		// nodes before the actual content
		const nodes = container?.childNodes.slice(3);
		const body = nodes?.map((n) => {
			if (n.rawTagName === "p" && !n.rawText) return;
			return n.rawText;
		});

		return Response.json({
			status: "ok",
			title,
			img_url: `https://artix.com${img_url}`,
			source: url,
			body,
		});
	} catch (error) {
		return Response.json({
			status: "error",
		});
	}
}
