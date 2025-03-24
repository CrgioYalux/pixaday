import type {
	Color,
	TwoDimensionalPoint,
	ColorMatrixCell,
	ColorMatrix,
} from '../types';

import cloneColorMatrix from './clone-color-matrix';

function walk({
	base,
	position,
	color,
	visited,
	fill,
}: {
	base: ColorMatrix;
	position: TwoDimensionalPoint;
	color: Color;
	visited: ColorMatrixCell[];
	fill: Color;
}) {
	const height = base.length;
	const width = base[0].length;

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (i === position.y && j === position.x) {
				if (base[i][j].value === color) {
					if (visited.find((v) => v.id === base[i][j].id)) return;

					visited.push(base[i][j]);
					base[i][j].value = fill;

					if (base[i][j + 1]) {
						walk({
							base,
							position: base[i][j + 1].position,
							color,
							visited,
							fill,
						});
					}
					if (base[i][j - 1]) {
						walk({
							base,
							position: base[i][j - 1].position,
							color,
							visited,
							fill,
						});
					}
					if (base[i - 1] && base[i - 1][j]) {
						walk({
							base,
							position: base[i - 1][j].position,
							color,
							visited,
							fill,
						});
					}
					if (base[i + 1] && base[i + 1][j]) {
						walk({
							base,
							position: base[i + 1][j].position,
							color,
							visited,
							fill,
						});
					}
				}
			}
		}
	}
}

export default function ({
	base,
	position,
	color,
}: {
	base: ColorMatrix;
	position: TwoDimensionalPoint;
	color: Color;
}): ColorMatrix {
	const out: ColorMatrix = cloneColorMatrix({ base });

	walk({
		base: out,
		position,
		color: base[position.y][position.x].value,
		visited: [],
		fill: color,
	});

	return out;
}
