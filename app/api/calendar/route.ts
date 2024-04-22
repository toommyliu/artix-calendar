import { parse } from "node-html-parser";

export async function GET() {
	const html = await fetch("https://artix.com/calendar", {
		next: { revalidate: 1_000 * 60 * 60 * 24 /* 1d */ },
	})
		.then((res) => {
			if (!res.ok) return null;
			return res.text();
		})
		.catch(() => null);

	if (!html) {
		return Response.json({ status: "error", reason: "no html" });
	}

	const document = parse(html);
	const calendar_script = document.querySelector(
		"body > script:nth-child(21)"
	);

	if (!calendar_script?.rawText) {
		return Response.json({ status: "error", reason: "no calendar script" });
	}

	const calendar_script_body = calendar_script.rawText;

	// start
	const str_1 = calendar_script_body.slice(
		calendar_script_body.indexOf("[") + 1
	);
	// end
	const str_2 = str_1.slice(0, str_1.lastIndexOf("]"));
	const json = str_2;

	return Response.json({ status: "ok", json });
}
