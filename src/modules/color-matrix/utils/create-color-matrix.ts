import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';
import type { TwoDimensionalMatrix } from '../types';

export default function (
	dimensions: TwoDimensionalMatrix,
	allColor?: Color
): IColorMatrix.State {
	const out: IColorMatrix.State = [];

	for (let i = 0; i < dimensions.columns; i++) {
		out.push([]);
		for (let j = 0; j < dimensions.rows; j++) {
			out[i].push({
				id: i * dimensions.columns + j,
				value: allColor ?? 'white',
				position: { x: i, y: j },
			});
		}
	}

	return out;
}
