import type { Color } from '@/color-palette/hooks/use-color-palette/types';
import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';
import type { TwoDimensionalMatrix } from '../types';

import createColorMatrix from './create-color-matrix';

import COLOR_MATRIX_STATE_LS_KEY from '@/color-matrix/consts/color-matrix-state-ls-key';

export default function (
	dimensions: TwoDimensionalMatrix,
	allColor?: Color
): IColorMatrix.State {
	const persistedState = localStorage.getItem(COLOR_MATRIX_STATE_LS_KEY);

	return !persistedState
		? createColorMatrix(dimensions, allColor)
		: (JSON.parse(persistedState) as IColorMatrix.State);
}
