import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';

export default function (colorMatrix: IColorMatrix.State, color: Color): void {
	for (let i = 0; i < colorMatrix.length; i++) {
		for (let j = 0; j < colorMatrix[i].length; j++) {
			colorMatrix[i][j].value = color;
		}
	}
}
