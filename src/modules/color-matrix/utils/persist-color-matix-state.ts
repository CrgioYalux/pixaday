import type { IColorMatrix } from '@/color-matrix/hooks/use-color-matrix/types';

import COLOR_MATRIX_STATE_LS_KEY from '@/color-matrix/consts/color-matrix-state-ls-key';

export default function (colorMatrix: IColorMatrix.State): void {
	localStorage.setItem(
		COLOR_MATRIX_STATE_LS_KEY,
		JSON.stringify(colorMatrix)
	);
}
