import type { TwoDimensionalMatrix } from '../types';

import COLOR_MATRIX_SIZE_STATE_LS_KEY from '@/color-matrix/consts/color-matrix-size-state-ls-key';

export default function (dimensions: TwoDimensionalMatrix): void {
	localStorage.setItem(
		COLOR_MATRIX_SIZE_STATE_LS_KEY,
		JSON.stringify(dimensions)
	);
}
