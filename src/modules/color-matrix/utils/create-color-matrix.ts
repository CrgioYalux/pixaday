import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';

export default function (
	width: number,
	height: number,
	allColor?: Color
): IColorMatrix.State {
	const out: IColorMatrix.State = [];

	for (let i = 0; i < width; i++) {
		out.push([]);
		for (let j = 0; j < height; j++) {
			out[i].push({
				id: i * width + j,
				value: allColor ?? 'white',
				position: { x: i, y: j },
			});
		}
	}

	return out;
}
