import type { TwoDimensionalPoint, ColorMatrix, Color } from '../types';

export default function ({
	base,
	position,
}: {
	base: ColorMatrix;
	position: TwoDimensionalPoint;
}): Color {
	let out: Color = '';

	const height = base.length;
	const width = base[0].length;

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (i === position.y && j === position.x) {
				out = base[i][j].value;
			}
		}
	}

	return out;
}
