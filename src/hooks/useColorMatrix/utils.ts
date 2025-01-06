import { SymmetryOption } from '../../providers/ColorMatrix/types';
import type { Color } from '../useColorPalette/types';
import type { Point, ColorMatrix } from './types';

function createColorMatrix(
	width: number,
	height: number,
	allColor?: Color
): ColorMatrix.State {
	const out: ColorMatrix.State = [];

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

function changeColorMatrixSize(
	colorMatrix: ColorMatrix.State,
	width: number,
	height: number,
	allColor?: Color
): ColorMatrix.State {
	const out: ColorMatrix.State = [];

	for (let i = 0; i < width; i++) {
		out.push([]);

		for (let j = 0; j < height; j++) {
			let color: Color | undefined;

			if (colorMatrix[i] && colorMatrix[i][j]) {
				color = colorMatrix[i][j].value;
			}

			out[i].push({
				id: i * width + j,
				value: color ?? allColor ?? 'white',
				position: { x: i, y: j },
			});
		}
	}

	return out;
}

function paint(
	colorMatrix: ColorMatrix.State,
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

function paintAll(colorMatrix: ColorMatrix.State, color: Color): void {
	for (let i = 0; i < colorMatrix.length; i++) {
		for (let j = 0; j < colorMatrix[i].length; j++) {
			colorMatrix[i][j].value = color;
		}
	}
}

function walk(
	colorMatrix: ColorMatrix.State,
	position: Point,
	color: Color,
	visited: ColorMatrix.Cell[],
	fill: Color
) {
	for (let i = 0; i < colorMatrix.length; i++) {
		for (let j = 0; j < colorMatrix[i].length; j++) {
			if (i === position.x && j === position.y) {
				if (colorMatrix[i][j].value === color) {
					if (visited.find((v) => v.id === colorMatrix[i][j].id))
						return;

					visited.push(colorMatrix[i][j]);
					colorMatrix[i][j].value = fill;

					if (colorMatrix[i][j + 1]) {
						walk(
							colorMatrix,
							colorMatrix[i][j + 1].position,
							color,
							visited,
							fill
						);
					}
					if (colorMatrix[i][j - 1]) {
						walk(
							colorMatrix,
							colorMatrix[i][j - 1].position,
							color,
							visited,
							fill
						);
					}
					if (colorMatrix[i - 1] && colorMatrix[i - 1][j]) {
						walk(
							colorMatrix,
							colorMatrix[i - 1][j].position,
							color,
							visited,
							fill
						);
					}
					if (colorMatrix[i + 1] && colorMatrix[i + 1][j]) {
						walk(
							colorMatrix,
							colorMatrix[i + 1][j].position,
							color,
							visited,
							fill
						);
					}
				}
			}
		}
	}
}

function fill(
	colorMatrix: ColorMatrix.State,
	position: Point,
	color: Color
): void {
	walk(
		colorMatrix,
		position,
		colorMatrix[position.x][position.y].value,
		[],
		color
	);
}

const LS_COLOR_MATRIX_KEY = 'COLOR_MATRIX_STATE';

function persistState(colorMatrix: ColorMatrix.State): void {
	localStorage.setItem(LS_COLOR_MATRIX_KEY, JSON.stringify(colorMatrix));
}

function recoverPersitedState(
	width: number,
	height: number,
	allColor?: Color
): ColorMatrix.State {
	const persistedState = localStorage.getItem(LS_COLOR_MATRIX_KEY);

	return !persistedState
		? createColorMatrix(width, height, allColor)
		: (JSON.parse(persistedState) as ColorMatrix.State);
}

export {
	createColorMatrix,
	changeColorMatrixSize,
	paint,
	paintAll,
	fill,
	persistState,
	recoverPersitedState,
};
