import COLOR_MATRIX_SIZE_STATE_LS_KEY from '@/color-matrix/consts/color-matrix-size-state-ls-key';

export default function (colorMatrixSize: number): void {
	localStorage.setItem(
		COLOR_MATRIX_SIZE_STATE_LS_KEY,
		JSON.stringify(colorMatrixSize)
	);
}
