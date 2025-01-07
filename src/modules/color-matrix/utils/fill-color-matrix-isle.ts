import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type {
	Point,
	IColorMatrix,
} from '@/color-matrix/hooks/use-color-matrix/types';

function walk(
	colorMatrix: IColorMatrix.State,
	position: Point,
	color: Color,
	visited: IColorMatrix.Cell[],
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

export default function (
	colorMatrix: IColorMatrix.State,
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
