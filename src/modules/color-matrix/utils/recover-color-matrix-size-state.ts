import COLOR_MATRIX_SIZE_STATE_LS_KEY from '@/color-matrix/consts/color-matrix-size-state-ls-key';

export default function (): number | null {
	const persistedState = localStorage.getItem(COLOR_MATRIX_SIZE_STATE_LS_KEY);
	return !persistedState ? null : (JSON.parse(persistedState) as number);
}
