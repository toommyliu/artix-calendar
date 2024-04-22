import Link from "next/link";

const DISCLAIMER = String.raw`
"Artix Games Calendar Viewer" is not
endorsed by Artix Entertainment and does not reflect the
views or opinions of Artix Entertainment or anyone
officially involved in producing or managing Artix
Entertainment properties. Artix Entertainment, and all
associated properties are trademarks or registered
trademarks of Artix Entertainment.
`;

export default function Footer() {
	return (
		<footer className="fixed bottom-0 w-full border-t-2">
			<div className="container p-6">
				<div className="grid gap-4 lg:grid-cols-2">
					<div className="mb-6 md:mb-0">
						<p className="mb-4 text-sm">{DISCLAIMER}</p>
					</div>

					<div className="mb-6 md:mb-0 flex flex-col items-end">
						<Link
							href="https://artix.com/"
							rel="noopener noreferrer"
							target="_blank"
							className="text-blue-600 hover:text-blue-800"
						>
							Artix Entertainment
						</Link>
						<Link
							href="https://www.aq.com/"
							rel="noopener noreferrer"
							target="_blank"
							className="text-blue-600 hover:text-blue-800"
						>
							AdventureQuest Worlds
						</Link>
						<Link
							href="https://www.artix.com/calendar"
							rel="noopener noreferrer"
							target="_blank"
							className="text-blue-600 hover:text-blue-800"
						>
							Calendar Data Source
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
