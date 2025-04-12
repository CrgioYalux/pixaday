const Vertical = ({
	selected,
	onClick,
}: {
	selected: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			className={`
                box-content border-2 border-current p-0.5 rounded
                w-4 h-4 flex gap-0.5 flex-row items-center
                ${selected ? 'text-indigo-500' : 'text-black'}
            `}
			onClick={onClick}
		>
			<div className="w-1 h-1 bg-current" />
			<div className="h-full w-1 bg-current" />
			<div className="w-1 h-1 bg-transparent border border-current" />
		</button>
	);
};

const Horizontal = ({
	selected,
	onClick,
}: {
	selected: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			className={`
                box-content border-2 border-current p-0.5 rounded
                w-4 h-4 flex gap-0.5 flex-col items-center
                ${selected ? 'text-indigo-500' : 'text-black'}
            `}
			onClick={onClick}
		>
			<div className="w-1 h-1 bg-current" />
			<div className="w-full h-1 bg-current" />
			<div className="w-1 h-1 bg-transparent border border-current" />
		</button>
	);
};

const DiagonalIncreasing = ({
	selected,
	onClick,
}: {
	selected: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			className={`
                box-content border-2 border-current p-0.5 rounded
                ${selected ? 'text-indigo-500' : 'text-black'}
            `}
			onClick={onClick}
		>
			<div className="rotate-45 w-4 h-4 flex gap-0.5 flex-row items-center">
				<div className="w-1 h-1 bg-current" />
				<div className="h-full w-1 bg-current" />
				<div className="w-1 h-1 bg-transparent border border-current" />
			</div>
		</button>
	);
};

const DiagonalDecreasing = ({
	selected,
	onClick,
}: {
	selected: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			className={`
                box-content border-2 border-current p-0.5 rounded
                ${selected ? 'text-indigo-500' : 'text-black'}
            `}
			onClick={onClick}
		>
			<div className="rotate-45 w-4 h-4 flex gap-0.5 flex-col items-center">
				<div className="w-1 h-1 bg-current" />
				<div className="w-full h-1 bg-current" />
				<div className="w-1 h-1 bg-transparent border border-current" />
			</div>
		</button>
	);
};

export default {
	Vertical,
	Horizontal,
	DiagonalIncreasing,
	DiagonalDecreasing,
};
