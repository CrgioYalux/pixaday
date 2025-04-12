export default function ({
	selected,
	onClick,
}: {
	selected: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className="text-black w-4 h-4 flex gap-0.5 flex-row items-center"
			onClick={onClick}
		>
			<div className="w-1 h-1 bg-current" />
			<div className="h-full w-1 bg-current" />
			<div className="w-1 h-1 bg-transparent border border-current" />
		</button>
	);
}
