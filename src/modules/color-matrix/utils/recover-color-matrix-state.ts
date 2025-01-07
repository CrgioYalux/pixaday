import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';

import createColorMatrix from './create-color-matrix';

import COLOR_MATRIX_STATE_LS_KEY from '@/color-matrix/consts/color-matrix-state-ls-key';

export default function (
	width: number,
	height: number,
	allColor?: Color
): IColorMatrix.State {
	const persistedState = localStorage.getItem(COLOR_MATRIX_STATE_LS_KEY);

	return !persistedState
		? createColorMatrix(width, height, allColor)
		: (JSON.parse(persistedState) as IColorMatrix.State);
}
