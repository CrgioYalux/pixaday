import type { ColorMatrix, Color, TwoDimensionalSize } from '../types';

export default function ({
	color,
	size,
	base,
}: {
	color: Color;
	size: TwoDimensionalSize;
	base?: ColorMatrix;
}): ColorMatrix {
	const out: ColorMatrix = [];

	for (let i = 0; i < size.height; i++) {
		out.push([]);

		for (let j = 0; j < size.width; j++) {
			out[i].push({
				id: i * size.height + j,
				value: base?.[i]?.[j].value ?? color,
				position: { x: j, y: i },
			});
		}
	}

	return out;
}
