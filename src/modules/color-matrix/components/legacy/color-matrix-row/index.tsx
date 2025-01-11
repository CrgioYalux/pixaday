import type { ColorMatrixRowProps } from './types';

import ColorMatrixCell from '@/color-matrix/components/color-matrix-cell';

import './styles.css';

export default function ({
	row,
	usingPencil,
	setUsingPencil,
}: ColorMatrixRowProps) {
	return (
		<div className="ColorMatrixRow" draggable={false}>
			{row.map((cell) => (
				<ColorMatrixCell
					key={cell.id}
					usingPencil={usingPencil}
					setUsingPencil={setUsingPencil}
					{...cell}
				/>
			))}
		</div>
	);
}
