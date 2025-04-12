import type {
	Color,
	TwoDimensionalPoint,
	SymmetryOption,
	ColorMatrix,
} from '../types';

import cloneColorMatrix from './clone-color-matrix';

export default function ({
	base,
	position,
	color,
	symmetryOption,
}: {
	base: ColorMatrix;
	position: TwoDimensionalPoint;
	color: Color;
	symmetryOption: SymmetryOption;
}): ColorMatrix {
	const out: ColorMatrix = cloneColorMatrix({ base });

	const height = base.length;
	const width = base[0].length;

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (i === position.y && j === position.x) {
				out[i][j].value = color;

				if (symmetryOption === 'none' || symmetryOption === 'custom')
					continue;

				if (symmetryOption === 'diagonal-decreasing') {
					out[position.x][position.y].value = color;
					continue;
				}

				if (symmetryOption === 'diagonal-increasing') {
					out[height - 1 - position.x][width - 1 - position.y].value =
						color;
					continue;
				}

				if (symmetryOption === 'vertical') {
					const halfWidth = Math.floor(width / 2);

					const middleAxis: [number, number] =
						width % 2 === 0
							? [halfWidth - 1, halfWidth]
							: [halfWidth, halfWidth];

					if (middleAxis.includes(position.x)) {
						// the painted cell is in the symmetry axis
						out[i][middleAxis[0]].value = color;
						out[i][middleAxis[1]].value = color;
						continue;
					}

					const distance =
						middleAxis[0] > position.x
							? middleAxis[0] - position.x
							: position.x - middleAxis[1];
					const newJ =
						middleAxis[0] > position.x
							? middleAxis[1] + distance
							: middleAxis[0] - distance;

					out[i][newJ].value = color;

					continue;
				}

				if (symmetryOption === 'horizontal') {
					const halfHeight = Math.floor(height / 2);

					const middleAxis: [number, number] =
						height % 2 === 0
							? [halfHeight - 1, halfHeight]
							: [halfHeight, halfHeight];

					if (middleAxis.includes(position.y)) {
						// the painted cell is in the symmetry axis
						out[middleAxis[0]][j].value = color;
						out[middleAxis[1]][j].value = color;
						continue;
					}

					const distance =
						middleAxis[0] > position.y
							? middleAxis[0] - position.y
							: position.y - middleAxis[1];

					const newI =
						middleAxis[0] > position.y
							? middleAxis[1] + distance
							: middleAxis[0] - distance;

					out[newI][j].value = color;

					continue;
				}
			}
		}
	}

	return out;
}
