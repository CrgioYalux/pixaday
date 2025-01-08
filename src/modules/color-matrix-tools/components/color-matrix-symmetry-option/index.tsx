import type { ColorMatrixSymmetryOptionProps } from './types';

export default function ({
	children,
	htmlFor,
	...inputProps
}: ColorMatrixSymmetryOptionProps) {
	return (
		<label
			className="grid border-2 p-0.5 place-items-center rounded cursor-pointer select-none has-[:checked]:bg-gray-100 has-[:checked]:text-gray-900"
			htmlFor={htmlFor}
		>
			<input
				{...inputProps}
				className="hidden"
				type="checkbox"
				id={htmlFor}
				name="symmetry"
			/>
			{children}
		</label>
	);
}
