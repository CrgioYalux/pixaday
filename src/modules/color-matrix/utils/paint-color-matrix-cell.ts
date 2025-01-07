import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type {
	SymmetryOption,
	Point,
	IColorMatrix,
} from '@/color-matrix/hooks/use-color-matrix/types';

export default function (
	colorMatrix: IColorMatrix.State,
	position: Point,
	color: Color,
	symmetryOption: SymmetryOption
): void {
	for (let i = 0; i < colorMatrix.length; i++) {
		for (let j = 0; j < colorMatrix[i].length; j++) {
			if (i === position.x && j === position.y) {
				colorMatrix[i][j].value = color;

				if (symmetryOption === 'none' || symmetryOption === 'custom')
					continue;

				if (symmetryOption === 'diagonal-decreasing') {
					const newI = position.y;
					const newJ = position.x;

					colorMatrix[newI][newJ].value = color;
					continue;
				}

				const size = colorMatrix.length;

				if (symmetryOption === 'diagonal-increasing') {
					const newI = size - 1 - position.y;
					const newJ = size - 1 - position.x;

					colorMatrix[newI][newJ].value = color;
					continue;
				}

				const halfSize = Math.floor(size / 2);
				const middle: [number, number] =
					size % 2 === 0
						? [halfSize - 1, halfSize]
						: [halfSize, halfSize];

				if (symmetryOption === 'vertical') {
					if (middle.includes(position.y)) {
						colorMatrix[i][middle[0]].value = color;
						colorMatrix[i][middle[1]].value = color;
						continue;
					}

					const distance =
						middle[0] > position.y
							? middle[0] - position.y
							: position.y - middle[1];
					const newJ =
						middle[0] > position.y
							? middle[1] + distance
							: middle[0] - distance;

					colorMatrix[i][newJ].value = color;

					continue;
				}

				if (symmetryOption === 'horizontal') {
					if (middle.includes(position.x)) {
						colorMatrix[middle[0]][j].value = color;
						colorMatrix[middle[1]][j].value = color;
						continue;
					}

					const distance =
						middle[0] > position.x
							? middle[0] - position.x
							: position.x - middle[1];

					const newI =
						middle[0] > position.x
							? middle[1] + distance
							: middle[0] - distance;

					colorMatrix[newI][j].value = color;

					continue;
				}
			}
		}
	}
}
