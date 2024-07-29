// components/Collapsible.js
"use client";
import { useState } from "react";

export default function Collapsible({ label, children }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="py-2 w-full text-left text-lg font-semibold"
			>
				{label}
			</button>
			{isOpen && <div className="pl-4 pb-4">{children}</div>}
		</div>
	);
}
