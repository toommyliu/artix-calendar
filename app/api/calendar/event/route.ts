"use server";

export async function GET(request: Request) {
	const url = new URL(request.url).searchParams.get("url");
	if (!url) {
		return Response.json({ status: "error", message: "no url provided" });
	}

	try {
		const response = await fetch(url);
		const html = await response.text();
		return new Response(html, {
			status: response.status,
			headers: { "Content-Type": "text/html" },
		});
	} catch (error) {
		console.error("Error fetching HTML content:", error);
		return new Response(
			JSON.stringify({
				status: "error",
				message: "failed to fetch HTML content",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
