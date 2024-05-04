"use client";

import Link from "next/link";

const DISCLAIMER = String.raw`
"AECalendar" is not
endorsed by Artix Entertainment and does not reflect the
views or opinions of Artix Entertainment or anyone
officially involved in producing or managing Artix
Entertainment properties. Artix Entertainment, and all
associated properties are trademarks or registered
trademarks of Artix Entertainment.
`;

export default function Footer() {
	return (
		<footer className="border-t-2">
			<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div>
						<p className="mr-5 h-6 sm:h-9 font-medium">Heads up!</p>
						<p className="max-w-xs mt-4 text-sm text-gray-600">
							{DISCLAIMER}
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
						<div>
							<p className="font-medium">Helpful Links</p>
							<nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
								<Link
									className="hover:opacity-75"
									href="https://www.aq.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									AQWorlds
								</Link>
								<Link
									className="hover:opacity-75"
									href="https://www.artix.com/calendar"
									target="_blank"
									rel="noopener noreferrer"
								>
									Artix Calendar
								</Link>
								<Link
									className="hover:opacity-75"
									href="https://github.com/toommyliu/artix-calendar"
									target="_blank"
									rel="noopener noreferrer"
								>
									View on Github
								</Link>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
