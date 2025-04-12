import type { ColorMatrix } from '../types';

export default function ({ base }: { base: ColorMatrix }): ColorMatrix {
	const out: ColorMatrix = [];

	const height = base.length;
	const width = base[0].length;

	for (let i = 0; i < height; i++) {
		out.push([]);
		for (let j = 0; j < width; j++) {
			out[i].push({
				id: i * height + j,
				value: base[i][j].value,
				position: { x: j, y: i },
			});
		}
	}

	return out;
}
