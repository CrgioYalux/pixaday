export default function ({
	selected,
	onClick,
}: {
	selected: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className="w-4 h-4 flex gap-0.5 flex-col items-center"
			onClick={onClick}
		>
			<div className="w-1 h-1 bg-current" />
			<div className="w-full h-1 bg-current" />
			<div className="w-1 h-1 bg-transparent border border-current" />
		</button>
	);
}
