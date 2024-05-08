import type { ReactNode } from "react";

export const Center = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-row min-h-screen justify-center items-center">
		{children}
	</div>
);
